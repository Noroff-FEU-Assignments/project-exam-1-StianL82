import { fetchSingleBlogPost } from '../api/index.js';
import {extractPostInfo } from '../utils/index.js';
import * as components from "../components/index.js";

function initBlogPostPage() {
    const selector = '.blogpost-image, .wp-block-gallery img, .wp-block-image img';
    const images = document.querySelectorAll(selector);
    
    images.forEach(image => {
      image.addEventListener('click', () => {
        components.showModal(image.src);
      });
    });
  }
  
  const rendered_blogpost = document.querySelector(".rendered_blogpost");

export async function loadBlogPost() {
  components.showLoadingIndicator();
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (!postId) {
            console.error('No postId found in the URL.');
            return;
        }

        const post = await fetchSingleBlogPost(postId);
        const title = post.title.rendered;
        const content = post.content.rendered;
        const updatedContent = extractPostInfo(content);
        const postHtml = `
            <h1>${title}</h1>
            <div>${updatedContent}</div>
        `;

        const postContainer = document.querySelector(".rendered_blogpost");
        if (postContainer) {
            postContainer.innerHTML = postHtml;
        }
    } catch (error) {
      const errorMessage = await components.displayError("We are having trouble fetching the information from the API");
      rendered_blogpost.innerHTML = errorMessage;
    }finally {
      components.hideLoadingIndicator();
  }
}

export function blogPostPage() {
    loadBlogPost().then(() => {
      initBlogPostPage();
    });
    components.setupBackToLastPage();
    components.enableScrollToTop();
}