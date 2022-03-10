const express = require("express")
const cors = require("cors")
const app = express();
const Queue = require("bull")

const postQueue = new Queue("post-queue", { 
    redis: { 
      port: 6379,
      host: "queue-srv" 
    }
});

const posts = {};

const actionByType = {
    "PostCreated": (data) => {
        delete data.type
        if (!posts[data.id]) {
            posts[data.id] = { ...data, comments: [] };
        } else {
            posts[data.id] = { ...data, comments: [] };
        }
    },
    "CommentCreated": (data) => {
        delete data.type
        posts[data.postId].comments.push(data);
    },
}

postQueue.process((job, done) => {
    actionByType[job.data.type](job.data)
    done();
})

app.use(cors())

app.get("/posts", (request, response) => {
    return response.json(posts);
})

app.listen(4002, () => console.log("Server is running at address: http://localhost:4002"));