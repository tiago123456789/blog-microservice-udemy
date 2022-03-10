const express = require("express");
const cors = require("cors");
const Queue = require("bull");
const app = express();
const postRepository = require("./repositories/postRepository")
const postQueue = new Queue("post-queue", { 
    redis: { 
      port: 6379,
      host: "queue-srv" 
    }
});

app.use(cors())

app.use(express.json())

app.get("/posts", (request, response) => {
    return response.json(postRepository.getAll());
})

app.post("/posts", async (request, response) => {
    const body = request.body;
    const post = postRepository.create(body.title);
    await postQueue.add({ ...post, type: "PostCreated" })
    return response.json(post);
})

app.listen(4000, () => {
    console.log("v3")
    console.log(`Server is running at: http://localhot:4000`)
})