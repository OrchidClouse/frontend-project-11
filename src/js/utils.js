const elements = {
    form: document.querySelector("form"),
    input: document.querySelector("input"),
    feedback: document.querySelector(".feedback"),
    postsContainer: document.querySelector(".posts"),
    feedsContainer: document.querySelector(".feeds"),
    submitButton: document.querySelector('button[type="submit"]'),
    postsLink: document.querySelector('a[target="_blank"]'),
    buttonPost: document.querySelector('button[data-bs-toggle="modal"]'),
    modal: {
      title: document.querySelector(".modal-title"),
      body: document.querySelector(".modal-body"),
      button: document.querySelector('a[role="button"]'),
    },
}

export default elements
