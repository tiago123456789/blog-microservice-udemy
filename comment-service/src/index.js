const express = require("express");
const cors = require("cors")
const app = express();
const Queue = require("bull")
const postRepository = require("./repositories/postCommentRepository")
const postQueue = new Queue("post-queue");

app.use(cors())

app.use(express.json())

app.get("/posts/comments", (request, response) => {
    return response.json(postRepository.getAll());
})

app.get("/posts/:id/comments", (request, response) => {
    return response.json(postRepository.getAllByPostId(request.params.id));
})

app.post("/posts/:id/comments", async (request, response) => {
    const body = request.body;
    const post = postRepository.create(request.params.id, body.text);
    await postQueue.add({ ...post, type: "CommentCreated" })
    return response.json(post);
})

app.listen(4001, () => console.log(`Server is running at: http://localhot:4001`))