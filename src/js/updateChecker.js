import axios from 'axios';
// import getParsedRSS from './parser.js';
// import { proxyUrl } from './utils.js';
import {state , parseData} from './handlers.js'

// let state = {
//     response: {
//       success: null,
//       errors: [],
//       data: "",
//       posts: [],
//       feeds: [],
//     },
//     errors: {
//       parseError: "",
//       postErrors: [],
//     },
//     rssValid: '',
//     posted: false,
//     usedUrl: "",
//   }

const getPostsLinks = (state) => state.response.posts.map((feed) => feed[1]);
const proxyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=false&url=${url}`;

const updatePosts = (state) => {

const timeUpdate = 5000

const posts = state.response.posts
const postLinks = getPostsLinks(state)

const promises = postLinks.map((url) => axios({
    url: proxyUrl(url),
}).then((resp) => {
    if(!postLinks.includes(resp.data.status.url)){
        posts.unshift(resp.data.status.url)
    }
})
.catch((err) => {
    console.log('error', err)
}))
  Promise.all(promises)
    .finally(() => setTimeout(() => updatePosts(state), timeUpdate));
};

export default updatePosts;
