import  elements  from "./utils.js"
import mainHandler, { state } from "./handlers.js"


const feedsContainer = elements.feedsContainer
const postsContainer = elements.postsContainer


const createPost = () => {
        elements.submitButton.addEventListener('click', async (e) => {
            e.preventDefault()
            await mainHandler(state)
            console.log(state.response.posts)
            const [title, link, desc] = state.response.posts
            postsContainer.append(title)
        })
}


export default createPost