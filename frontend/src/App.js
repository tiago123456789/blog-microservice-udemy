import React, { useEffect, useState } from "react"
import axios from "axios"
import ListPost from "./components/ListPost";
import CreatePost from "./components/CreatePost";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([])

  const save = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:4000/posts", { title })
    setPosts([...posts, response.data])
    setTitle("")
  }

  const getPosts = async () => {
    const response = await axios.get("http://localhost:4002/posts")
    const posts = (Object.keys(response.data).map(key => response.data[key]))
    setPosts(posts);
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="container">
      <CreatePost save={save} title={title} setTitle={setTitle} />
      <ListPost posts={posts} />
    </div>
  );
}

export default App;
