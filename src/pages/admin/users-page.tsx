import {useEffect, useState} from "react";
import type {User} from "../../types/user.ts";
import {deleteUser, getAllUsers, updateUserRole} from "../../services/api.ts";
import {toast} from "sonner";
import {AdminLayout} from "../../components/layout/admin-layout.tsx";
import {useAuth} from "../../hooks/use-auth.ts";

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const {user: actualUser} = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      toast.success(response.message || 'User deleted successfully.');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to delete user');
    }
  }

  const handleRoleChange = async (userId: number, newRole: 'admin' | 'user') => {
    try {
      const updatedUser = await updateUserRole(userId, newRole);
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
      toast.success('Role updated successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update role');
    }
  }

  if (loading) {
    return (
      <div className="p-4">Loading...</div>
    )
  }
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <table className="w-full border border-gray-300">
        <thead>
        <tr className="bg-gray-800">
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Username</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Role</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-950">
            <td className="py-2 px-4 border-b">{user.id}</td>
            <td className="py-2 px-4 border-b">{user.username}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.role}</td>
            <td className="py-2 px-4 border-b flex items-center flex-col gap-2">
              {actualUser?.id !== user.id ? (
                <>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'user')}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    className="secondary-button"
                    onClick={() => handleDeleteUser(user.id)}
                  >Delete user
                  </button>
                </>
              ) : (
                <p>This is you</p>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};