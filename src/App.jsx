import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import Front from "./components/Front";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Posts from "./components/Blog/Posts";
import BlogPost from "./components/Blog/BlogPost";
import CreatePost from "./components/Blog/CreatePost";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/login" element={<Admin />} />
          <Route path="/blog" element={<Posts />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/createpost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
