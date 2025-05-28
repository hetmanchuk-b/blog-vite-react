import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {PostDetail} from "./components/post-detail.tsx";
import {Toaster} from "sonner";
import {RegisterPage} from "./pages/register-page.tsx";
import {LoginPage} from "./pages/login-page.tsx";
import {ForgotPasswordPage} from "./pages/forgot-password-page.tsx";
import {ResetPasswordPage} from "./pages/reset-password-page.tsx";
import {AuthProvider} from "./context/auth-context.tsx";
import {ProtectedRoute} from "./components/protected-route.tsx";
import {CreatePostPage} from "./pages/create-post-page.tsx";
import {DashboardPage} from "./pages/admin/dashboard-page.tsx";
import {HomePage} from "./pages/home-page.tsx";
import {UsersPage} from "./pages/admin/users-page.tsx";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Client pages */}
          <Route path='/' element={<HomePage/>}/>
          <Route path='/posts/:id' element={<PostDetail/>}/>

          {/* Auth */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute requireAdmin />}>
            {/* Posts */}
            <Route path="/create-post" element={<CreatePostPage />} />

            {/* Admin Dashboard */}
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  )
}

export default App
