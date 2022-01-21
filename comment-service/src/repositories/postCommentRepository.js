const { randomBytes } = require("crypto");
const commentsByPosts = {};

module.exports = {
    getAll() {
        return commentsByPosts;
    },

    getAllByPostId(postId) {
        return commentsByPosts[postId];
    },

    create(postId, text) {
        const comment = {
            text: text,
            id: randomBytes(4).toString('hex'),
            postId,
            status: "pendent"   
        }
        
        if (text.indexOf("orange") > -1) {
            comment.status = "reproved"
        } else {
            comment.status = "approved"
        }

        if (!commentsByPosts[postId]) {
            commentsByPosts[postId] = []
        }
        
        commentsByPosts[postId].push(comment);
        return comment;
    }
}