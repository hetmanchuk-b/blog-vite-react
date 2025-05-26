import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PostList from "./components/post-list.tsx";
import {PostDetail} from "./components/post-detail.tsx";
import PostForm from "./components/post-form.tsx";
import {Header} from "./components/layout/header.tsx";
import {Sidebar} from "./components/layout/sidebar.tsx";

function App() {

  return (
    <Router>
      <div className="flex h-full overflow-hidden pt-15">
        <Header />
        <Sidebar />
        <div className="grow overflow-auto relative z-10 blog-scrollbar">
          <div className="container mx-auto px-2.5">
            <Routes>
              <Route path='/' element={<PostList/>}/>
              <Route path='/posts/:id' element={<PostDetail/>}/>
              <Route path='/create' element={<PostForm/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
