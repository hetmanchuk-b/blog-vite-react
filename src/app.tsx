import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PostList from "./components/post-list.tsx";
import {PostDetail} from "./components/post-detail.tsx";
import PostForm from "./components/post-form.tsx";
import {Header} from "./components/layout/header.tsx";
import {Sidebar} from "./components/layout/sidebar.tsx";
import {Toaster} from "sonner";
import {RegisterPage} from "./pages/register-page.tsx";
import {LoginPage} from "./pages/login-page.tsx";
import {ForgotPasswordPage} from "./pages/forgot-password-page.tsx";
import {ResetPasswordPage} from "./pages/reset-password-page.tsx";
import {AuthProvider} from "./context/auth-context.tsx";

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="flex h-full overflow-hidden pt-15">
          <Header />
          <Sidebar />
          <main className="grow overflow-auto relative z-10 blog-scrollbar">
            <div className="container mx-auto px-2.5">
              <Routes>
                <Route path='/' element={<PostList/>}/>
                <Route path='/posts/:id' element={<PostDetail/>}/>
                <Route path='/create' element={<PostForm/>}/>

                {/* Auth */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

              </Routes>
            </div>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
