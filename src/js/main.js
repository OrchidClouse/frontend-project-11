import createPost from "./posts.js"
// import updatePosts from "./updateChecker.js"
import { state } from "./handlers.js"

const main = () => {
  createPost()
  updatePosts(state)
}

export default main
