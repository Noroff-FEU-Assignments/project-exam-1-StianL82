export function getFirstH3Content(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const h3 = doc.querySelector("h3");
  return h3 ? h3.innerHTML : null;
}

export function getFirstImageSrc(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : null;
}


export function extractPostInfo(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

// (title)
const titleElement = doc.querySelector("h1");
if (titleElement) {
    titleElement.classList.add("blogpost-title");
}

// (h3)
const h3Element = doc.querySelector("h3");
if (h3Element) {
    h3Element.classList.add("blogpost-h3");
}

  // (Image)
  const imageElement = doc.querySelector(".wp-block-image img");
  if (imageElement) {
    imageElement.classList.add("blogpost-image");
  }

  // (Video)
  const videoElement = doc.querySelector(".wp-block-embed iframe");
  if (videoElement) {
    videoElement.classList.add("blogpost-video");
  }

const renderedBlogpostContainer = document.querySelector(".rendered_blogpost");

// (All <p>)
const paragraphElements = renderedBlogpostContainer.querySelectorAll("p");
paragraphElements.forEach((paragraph) => {
  paragraph.classList.add("blogpost-paragraph");
});

// (Image Gallery)
const galleryContainers = doc.querySelectorAll(".custom-gallery");
galleryContainers.forEach((galleryContainer, index) => {
  galleryContainer.classList.add(`blogpost-gallery-${index}`);
});

  return doc.documentElement.outerHTML;
}
