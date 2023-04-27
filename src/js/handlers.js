import { valid } from "./validation.js"
import { elements } from "./utils.js"

let state = {
  response: {
    success: null,
    errors: [],
    data: "",
    posts: []
  },
}

const buttonHandler = async (state) => {
    const inputValue = elements.input.value
    const { success, errors, data } = await valid(inputValue)
    state.response.success = success
    state.response.errors = errors
    state.response.data = data

}

const statusHandler = (state) => {
  if (state.response.success === false) {
    elements.feedback.classList.remove("text-success")
    elements.feedback.classList.add("text-danger")
    elements.feedback.textContent = "Ссылка должна быть валидной"
    return false
  } else if (state.response.success === true) {
    elements.feedback.classList.remove("text-danger")
    elements.feedback.classList.add("text-success")
    elements.feedback.textContent = "RSS успешно загружен"
    
    return true
  }
  console.log(state)

}

const parseData = (state) => {

    const div = document.createElement('div')
    div.innerHTML = state.response.data
    const items = div.querySelectorAll('item')
    const titles = []
    // console.log(items)
    items.forEach((e) => {
        titles.push([e.querySelector('title').textContent, e.querySelector('link').textContent.trim(), e.querySelector('description').textContent])
    })
    return titles
}

export default async function mainHandler() {
    await buttonHandler(state)

      state.response.posts = [parseData(state)]
    //   const res = [parseData(state)]
    //   console.log(state.response.posts)


}

export {state, statusHandler}
