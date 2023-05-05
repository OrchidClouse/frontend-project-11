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
    if(postLinks.includes(resp.data.status.url)){
        // console.log(postLinks)
        // console.log(resp.data.status.url)
        // console.log('if')
        state.rerender = false
    }else{
        console.log('else')
        posts.push(resp.data.status.url)
        state.rerender = true
    }
})
.catch((err) => {
    console.log('error', err)
}))
  Promise.all(promises)
    .finally(() => setTimeout(() => updatePosts(state), timeUpdate));
};

export default updatePosts;
