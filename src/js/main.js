import createPost from "./posts.js"
import updatePosts from "./updateChecker.js"
import { state } from "./handlers.js"

const main = () => {
  createPost()
  updatePosts(state)
  if(state.rerender = true){
    createPost()
  }
}

export default main
