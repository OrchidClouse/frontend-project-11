import elements from "./utils.js"
import mainHandler, { state } from "./handlers.js"

const readyPost = (e) => {
  let description = []
  const postsContainer = document.querySelector(".posts")
  const feedsContainer = document.querySelector(".feeds")
  const cardBorderDivPosts = document.createElement("div")
  const cardBorderDivFeeds = document.createElement("div")
  const cardBodyDivPosts = document.createElement("div")
  const cardBodyDivFeeds = document.createElement("div")
  const postTitle = document.createElement("h2")
  const feedTitle = document.createElement("h2")
  const ulPosts = document.createElement("ul")
  const ulFeeds = document.createElement("ul")

  postsContainer.append(cardBorderDivPosts)
  cardBorderDivPosts.append(cardBodyDivPosts)
  cardBorderDivPosts.append(ulPosts)
  cardBodyDivPosts.append(postTitle)

  feedsContainer.append(cardBorderDivFeeds)
  cardBorderDivFeeds.append(cardBodyDivFeeds)
  cardBorderDivFeeds.append(ulFeeds)
  cardBodyDivFeeds.append(feedTitle)

  cardBorderDivFeeds.classList.add("card", "border-0")
  cardBodyDivFeeds.classList.add("card-body")
  feedTitle.classList.add("card-title", "h4")
  ulFeeds.classList.add("list-group", "border-0", "rounded-0")

  cardBorderDivPosts.classList.add("card", "border-0")
  cardBodyDivPosts.classList.add("card-body")
  postTitle.classList.add("card-title", "h4")
  ulPosts.classList.add("list-group", "border-0", "rounded-0")

  let dataIdCounter = 2
  if (state.postErrors.length < 1) {
    const postsIterate = state.response.posts.map(([title, link, desc]) => {
      const liPost = document.createElement("li")
      const aInPostLi = document.createElement("a")
      const btnInPostLi = document.createElement("button")

      liPost.append(btnInPostLi)
      liPost.prepend(aInPostLi)

      aInPostLi.target = "_blank"
      aInPostLi.rel = "noopener noreferrer"
      aInPostLi.classList.add("fw-bold")
      liPost.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-start",
        "border-0",
        "border-end-0"
      )
      btnInPostLi.classList.add("btn", "btn-outline-primary", "btn-sm")
      btnInPostLi.setAttribute("data-bs-toggle", "modal")
      btnInPostLi.setAttribute("data-bs-target", "#modal")
      aInPostLi.href = link
      aInPostLi.setAttribute("data-id", dataIdCounter)

      postTitle.textContent = "Посты"
      btnInPostLi.textContent = "Просмотр"
      aInPostLi.textContent = title
      description.push(desc)
      ulPosts.append(liPost)
      dataIdCounter++
    })

    document
      .querySelectorAll('button[data-bs-toggle="modal"]')
      .forEach((btns) =>
        btns.addEventListener("click", (e) => {
          e.preventDefault()
          const header = e.target.previousSibling
          const bodyTextId = header.getAttribute("data-id")
          const modalTitle = elements.modal.title
          const modalBody = elements.modal.body
          const modalBtn = elements.modal.button

          modalTitle.textContent = header.textContent
          modalBody.textContent = description[bodyTextId - 2] // -2 because data-id start with 2 (first element is 2)
          modalBtn.href = header.href
        })
      )

    const feedsIterate = state.response.feeds.map(([title, desc]) => {
      const liFeed = document.createElement("li")
      const titleFeed = document.createElement("h3")
      const descFeed = document.createElement("p")

      liFeed.classList.add("list-group-item", "border-0", "border-end-0")
      titleFeed.classList.add("h6", "m-0")
      descFeed.classList.add("m-0", "small", "text-black-50")

      feedTitle.textContent = "Фиды"
      titleFeed.textContent = title
      descFeed.textContent = desc

      liFeed.append(descFeed)
      liFeed.prepend(titleFeed)

      ulFeeds.append(liFeed)
    })
  }

  document.addEventListener("click", (e) => {
    const a = document.querySelectorAll(".fw-bold")
    a.forEach((elem) => {
      if (e.target === elem) {
        elem.classList.add("link-secondary")
      }
    })
  })

  elements.form.reset()
  elements.input.focus()
  console.log(state.postErrors)
  state.postErrors = []
}

const createPost = () => {
  elements.submitButton.addEventListener("click", async (e) => {
    e.preventDefault()
    await mainHandler(state)
    if (state.postErrors >= 1 || state.posted) {
      elements.postsContainer.textContent = ""
      elements.feedsContainer.textContent = ""
    }
    readyPost(e)
  })
}

export default createPost
