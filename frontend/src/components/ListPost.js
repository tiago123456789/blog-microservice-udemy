import React, { useEffect, useState } from "react"
import axios from "axios"

function ListPost(props) {
  const [comments, setComments] = useState({})
  const [comment, setComment] = useState("");

  const getAllCommentsAllPosts = async () => {
    const response = await axios.get("http://comment.com/posts/comments")
    setComments(response.data);
  }

  const saveComment = async (event, postId) => {
    event.preventDefault();
    const response = await axios.post(
      `http://comment.com/posts/${postId}/comments`,
      { text: comment }
    )

    const register = comments;

    if (!register[postId]) {
      register[postId] = [response.data]

    } else {
      register[postId].push(response.data)
    }
    
    setComments({...register})
    setComment("")
  }

  useEffect(() => {
    getAllCommentsAllPosts()
  }, [])

  return (
    <>
      <section className="row">
        <h2>List posts</h2>
        {
          props.posts.map(item => {
            return (
              <div className="card card-default mb-1 col-md-3" key={item.id} >
                <h3 className="text-capitalize" style={{ marginLeft: "10px"   }}>{item.title}</h3>
                <div style={{ "margin": "0px 0px 0px 10px" }}>
                  <form onSubmit={(event) => saveComment(event, item.id)}>
                    <label>Comment:</label><br />
                    <input
                    className="form-control"
                    value={comment} onChange={(event) => setComment(event.target.value)} />
                    <br />
                    <button type="submit" className="btn btn-primary">Save</button>
                  </form>
                </div>
                <div>
                  <ul>
                    { 
                      (comments[item.id] || []).map(item => {
                        if (item.status === "reproved") {
                          return <li>Comment reproved</li>
                        }

                        if (item.status === "pendent") {
                          return <li>Comment waiting moderate</li>
                        }
                        
                        return <li key={item.id}>{item.text} | {item.status}</li>
                      })
                    }
                  </ul>
                </div>
              </div>
            )
          })
        }
      </section>
    </>
  );
}

export default ListPost;
