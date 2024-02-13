import { apiUrlAll } from "../api/getApi.js";
import { getFirstImageSrc } from '../utils/index.js';
import * as components from "../components/index.js";

let numberOfPostsToShow = 4;
let currentStartIndex = 0;
let posts = [];

window.addEventListener('resize', adjustPostsToShow);

export function adjustPostsToShow() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 810 && screenWidth > 600) {
    numberOfPostsToShow = 2;
  } else if (screenWidth <= 600 && screenWidth > 500) {
    numberOfPostsToShow = 1;
  } else {
    numberOfPostsToShow = 4;
  }

  displayPosts();
}

adjustPostsToShow();

const carouselCard = document.querySelector(".carousel");

async function fetchPosts() {
  components.showLoadingIndicator();
  try {
    const response = await fetch(apiUrlAll);
    const data = await response.json();
    posts = data;
    displayPosts();
  } catch (error) {
    const errorMessage = await components.displayError("We are having trouble fetching the information from the API");
    carouselCard.innerHTML = errorMessage;
  } finally {
    components.hideLoadingIndicator();
  }
}


export function displayPosts() {
  const carouselContainer = document.querySelector('.carousel-container');

  if (!carouselContainer) return;

  carouselContainer.innerHTML = '';

  const postsToDisplay = posts.slice(currentStartIndex, currentStartIndex + numberOfPostsToShow);

  postsToDisplay.forEach(post => {
    const firstImageSrc = getFirstImageSrc(post.content.rendered);
    const title = post.title.rendered;

    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.addEventListener('click', () => {
      window.location.href = `blogpost.html?id=${post.id}`;
    });
    card.style.cursor = 'pointer';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'carousel-card-image';
    const image = document.createElement('img');
    image.src = firstImageSrc;
    image.alt = post.title.rendered;
    imageContainer.appendChild(image);

    const textContainer = document.createElement('div');
    textContainer.className = 'carousel-card-text';
    const text = document.createElement('p');
    text.textContent = title;
    textContainer.appendChild(text);

    card.appendChild(imageContainer);
    card.appendChild(textContainer);

    carouselContainer.appendChild(card);
  });
}


function updateNavigationButtons() {
  const leftButton = document.querySelector('.carousel-left-button');
  const rightButton = document.querySelector('.carousel-right-button');

  if (currentStartIndex - numberOfPostsToShow >= 0) {
    leftButton.classList.add('button-active');
    leftButton.classList.remove('button-inactive');
  } else {
    leftButton.classList.remove('button-active');
    leftButton.classList.add('button-inactive');
  }

  if (currentStartIndex + numberOfPostsToShow < posts.length) {
    rightButton.classList.add('button-active');
    rightButton.classList.remove('button-inactive');
  } else {
    rightButton.classList.remove('button-active');
    rightButton.classList.add('button-inactive');
  }
}


export function setupNavigation() {
  const leftButton = document.querySelector('.carousel-left-button');
  const rightButton = document.querySelector('.carousel-right-button');

  leftButton.addEventListener('click', () => {
    if (currentStartIndex - numberOfPostsToShow >= 0) {
      currentStartIndex -= numberOfPostsToShow;
      displayPosts();
      updateNavigationButtons();
    }
  });

  rightButton.addEventListener('click', () => {
    if (currentStartIndex + numberOfPostsToShow < posts.length) {
      currentStartIndex += numberOfPostsToShow;
      displayPosts();
      updateNavigationButtons();
    }
  });
}


export function homePage() {
  fetchPosts().then(() => {
    adjustPostsToShow();
    setupNavigation();
    components.enableScrollToTop();
    updateNavigationButtons();
  });
}