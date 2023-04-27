import { elements } from "./utils.js"
import mainHandler, { state, statusHandler } from "./handlers.js"


const feedsContainer = elements.feedsContainer
const postsContainer = elements.postsContainer


const createPost = () => {
    if(statusHandler()){
        elements.submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            mainHandler(state)
            console.log(state.response.posts)
            const [title, link, desc] = state.response.posts
            postsContainer.append(title)
        })
    }
}


export default createPost