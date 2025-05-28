import {useAuth} from "../../hooks/use-auth.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {UpdateUserData, User} from "../../types/user.ts";
import {toast} from "sonner";
import {getUserProfile, updateUserProfile} from "../../services/api.ts";
import {validateBio, validateEmail, validateUsername} from "../../validators/forms.ts";
import {LoaderSpinner} from "../loader-spinner.tsx";

export const SettingsForm = () => {
  const {user, updateUser} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UpdateUserData>(
    {username: '', email: '', bio: ''}
  );
  const [errors, setErrors] = useState<{
    username?: string; email?: string, bio?: string
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile(Number(user?.id));
        setFormData({
          username: profile.username,
          email: profile.email,
          bio: profile.bio || ''
        });
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to load profile');
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [navigate, user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const bioError = validateBio(formData.bio || '');

    if (usernameError || emailError || bioError) {
      setErrors({
        username: usernameError,
        email: emailError,
        bio: bioError,
      });
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const updates: Partial<User> = {};
      if (formData.username !== user?.username) updates.username = formData.username;
      if (formData.email !== user?.email) updates.email = formData.email;
      if (formData.bio !== (user?.bio || '')) updates.bio = formData.bio || null;

      if (Object.keys(updates).length === 0) {
        toast.info('No changes to save');
        return;
      }

      const updatedUser = await updateUserProfile(updates);
      updateUser(updatedUser);
      toast.success('User updated successfully!');
      setErrors({});
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Failed to update profile';
      const fieldErrors = err.response?.data?.errors || {};
      setErrors(fieldErrors);
      toast.error(errorMsg);
    }
  }

  if (isLoading) {
    return (
      <LoaderSpinner isVisible />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg w-full mx-auto">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-400">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => {
            setFormData({...formData, username: e.target.value});
            setErrors({...errors, username: validateUsername(e.target.value)});
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({...formData, email: e.target.value});
            setErrors({...errors, email: validateEmail(e.target.value)});
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-400">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio || ''}
          onChange={(e) => {
            setFormData({...formData, bio: e.target.value});
            setErrors({...errors, bio: validateBio(e.target.value)});
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.bio ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          rows={4}
          placeholder="Tell something about yourself..."
        />
        <p className="mt-1 text-sm text-gray-500">{formData.bio?.length}/500 characters</p>
        {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Changes
      </button>
    </form>
  );
};