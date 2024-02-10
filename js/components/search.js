import { fetchApiCall } from '../api/index.js';
import * as utils from "../utils/index.js";
import { sortPosts } from './sort.js';

export async function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const postsContainer = document.querySelector('.blog_posts');
  let originalPosts = [];

  try {
    originalPosts = await fetchApiCall(1, 100);
  } catch (error) {
    console.error("Error fetching original posts:", error);
  }
  searchInput.value = '';

  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim();

    if (searchText.length === 0) {
        window.location.reload();
    } else {
        searchPosts(searchText, postsContainer);
    }
});
}

async function searchPosts(searchText, postsContainer) {
  try {
    const posts = await fetchApiCall(1, 100, `&search=${encodeURIComponent(searchText)}`);
    const sortedPosts = sortPosts(posts);
    displayPosts(sortedPosts, postsContainer);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

function displayPosts(posts, postsContainer) {
  postsContainer.innerHTML = '';

  const postsHtml = posts.map(post => {
    const firstH3 = utils.getFirstH3Content(post.content.rendered);
    const firstImageSrc = utils.getFirstImageSrc(post.content.rendered);
    return `
    <figure class="blogpost">
        <figcaption class="blogpost_heading_small">
            <h2>${post.title.rendered}</h2>
        </figcaption>
        <img src="${firstImageSrc || 'defaultImageURL.jpg'}" class="container_grey_image" alt="${post.title.rendered}" />
        <figcaption class="textfield-grey">
            <h2 class="blogpost_heading_big">${post.title.rendered}</h2>
            <h3>${firstH3 || 'Standard H3 Innhold'}</h3>
            <div class="button">
                <a href="blogpost.html?id=${post.id}" class="cta grey-cta">Read more</a>
            </div>
        </figcaption>
    </figure>
    `;
  }).join('');

  postsContainer.innerHTML = postsHtml;
}