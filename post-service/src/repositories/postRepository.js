const { randomBytes } = require("crypto");
const posts = [];

module.exports = {

    getAll() {
        return posts;
    },

    create(title) {
        const post = {
            title: title,
            id: randomBytes(4).toString('hex')      
        }
    
        posts.push(post);
        return post;
    }
}