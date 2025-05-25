import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import PostList from "./components/post-list.tsx";
import {PostDetail} from "./components/post-detail.tsx";
import PostForm from "./components/post-form.tsx";

function App() {

  return (
    <Router>
      <div className="flex h-full overflow-hidden">
        <aside className="w-[15%] bg-neutral-800 p-2 relative z-20">
          <div className="flex flex-col gap-1 items-center">
            <Link to='/' className="flex p-2 text-lg font-bold hover:text-blue-300">Home</Link>
            <Link to='/create' className="flex p-2 text-lg font-bold hover:text-blue-300">Create post</Link>
          </div>
        </aside>
        <div className="grow overflow-auto relative z-10">
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
