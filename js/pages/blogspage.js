import { fetchApiCall } from '../api/index.js';
import * as utils from "../utils/index.js";
import * as components from "../components/index.js";

let allPosts = [];
let currentPage = 1;
const postsPerPage = 10;
let currentSortOption = 'latest';

export async function loadBlogPosts(isInitialLoad = true, resetPagination = false) {
    if (resetPagination) {
        currentPage = 1;
    }

    if (isInitialLoad || resetPagination) {
        components.showLoadingIndicator();
        try {
            allPosts = await fetchApiCall(1, 100, '', currentSortOption);
            allPosts = components.sortPosts(allPosts);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            document.querySelector(".blogpost-card").innerHTML = await components.displayError("We are having trouble fetching the information from the API");
            return;
        } finally {
            components.hideLoadingIndicator();
        }
    }

    displayPosts();
}


function displayPosts() {
    const loadMoreButton = document.querySelector("#loadMoreButton");
    const postsContainer = document.querySelector(".blogpost-card");
    let startIndex = (currentPage - 1) * postsPerPage;
    let endIndex = currentPage * postsPerPage;
    let postsToShow = allPosts.slice(startIndex, endIndex);

    const postsHtml = postsToShow.map(post => {
        const firstH3 = utils.getFirstH3Content(post.content.rendered);
        const firstImageSrc = utils.getFirstImageSrc(post.content.rendered);
        const pubDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
        <figure class="blogpost">
            <figcaption class="blogpost_heading_small">
                <h2>${post.title.rendered}</h2>
            </figcaption>
            <img src="${firstImageSrc || 'defaultImageURL.jpg'}" class="container_grey_image" alt="${post.title.rendered}" />
            <figcaption class="textfield-grey">
                <h2 class="blogpost_heading_big">${post.title.rendered}</h2>
                <h3>${firstH3 || 'Standard H3 Innhold'}</h3>
                <p class="blogpost-date">Published: ${pubDate}</p>
                <div class="button">
                    <a href="blogpost.html?id=${post.id}" class="cta grey-cta">Read more...</a>
                </div>
                </figcaption>
                </figure>
        `;
    }).join('');

    postsContainer.insertAdjacentHTML('beforeend', postsHtml);

    // Hide or show load more button
    if (endIndex >= allPosts.length) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}


export function setupLoadMoreButton() {
    const loadMoreButton = document.querySelector("#loadMoreButton");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            loadBlogPosts(false);
        });
    }
}


export function blogsPage() {
    loadBlogPosts(true);
    setupLoadMoreButton();
    components.enableScrollToTop();
    components.setupSearch();
    components.SortFunctionality("#sort-options", ".blogpost-card", () => loadBlogPosts(true, true));
}