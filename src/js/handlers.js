import { valid } from "./validation.js"
import elements from "./utils.js"

let state = {
  response: {
    success: null,
    errors: [],
    data: "",
    posts: [],
    feeds: [],
  },
  postErrors: [],
  posted: "",
  usedUrl: "",
}

const errorHandler = (message) => {
  elements.feedback.classList.remove("text-success")
  elements.feedback.classList.add("text-danger")
  elements.feedback.textContent = message
  state.posted = false
  state.postErrors.push(message)
  return false
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
    errorHandler("Ссылка должна быть валидным URL")
  } else if (state.usedUrl === elements.input.value) {
    errorHandler("RSS уже существует")
  } else if (state.response.success === true) {
    elements.feedback.classList.remove("text-danger")
    elements.feedback.classList.add("text-success")
    elements.feedback.textContent = "RSS успешно загружен"
    state.posted = true
    return true
  }
}

const parseData = (state) => {
  const feeds = []
  const titles = []
  const div = document.createElement("div")
  div.innerHTML = state.response.data
  const items = div.querySelectorAll("item")
  items.forEach((item) => {
    titles.push([
      item.querySelector("title").textContent,
      item.querySelector("link").nextSibling.textContent.trim(),
      item.querySelector("description").textContent,
    ])
  })
  div.querySelectorAll("channel").forEach((channel) => {
    feeds.push([
      channel.querySelector("title").textContent,
      channel.querySelector("description").textContent,
    ])
  })
  return [titles, feeds]
}

export default async function mainHandler() {
  await buttonHandler(state)
  if (statusHandler(state)) {
    const [posts, feeds] = parseData(state)
    state.response.posts = posts
    state.response.feeds = feeds
    state.usedUrl = elements.input.value
  }
}

export { state }
