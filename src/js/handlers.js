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
  errors: {
    parseError: "",
    postErrors: [],
  },
  rssValid: '',
  posted: false,
  usedUrl: "",
}

const generateError = (message) => {
  elements.feedback.classList.remove("text-success")
  elements.feedback.classList.add("text-danger")
  elements.feedback.textContent = message
  state.errors.postErrors.push(message)
  // return false
}

const buttonHandler = async (state) => {
  const url = elements.input.value
  const { success, errors, data } = await valid(url)
  state.response.success = success
  state.response.errors = errors
  state.response.data = data
}

const statusHandler = (state) => {
  if (state.response.success === false) {
    generateError("Ссылка должна быть валидным URL")
  }else if(state.rssValid === null){
    generateError("Ссылка не содержит валидный RSS")
  }
  else if(state.usedUrl === elements.input.value){
    generateError("RSS уже существует")
  }
  else if (state.rssValid === true && state.response.success === true) {
    elements.feedback.classList.remove("text-danger")
    elements.feedback.classList.add("text-success")
    elements.feedback.textContent = "RSS успешно загружен"
    state.posted = true
    return true
  }else{
    generateError("Нет сети")
  }
}

const parseData = (state) => {
  const feeds = []
  const titles = []
  const div = document.createElement("div")
  div.innerHTML = state.response.data
  const items = div.querySelectorAll("item")
  const checkRss = div.querySelector('rss')
  if(checkRss){
    state.rssValid = true
  }else{
    state.rssValid = null
  }
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
    const [posts, feeds] = parseData(state)
    state.response.posts = posts
    state.response.feeds = feeds
    statusHandler(state)
}

export { state, generateError, parseData }
