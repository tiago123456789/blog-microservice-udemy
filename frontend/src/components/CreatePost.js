import React from "react"

function CreatePost(props) {

  return (
    <>
      <form onSubmit={props.save}>
        <label>Title:</label><br />
        <input
        className="form-control"
        value={props.title} onChange={(event) => props.setTitle(event.target.value)} />
        <br />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      <br />
    </>
  );
}

export default CreatePost;
