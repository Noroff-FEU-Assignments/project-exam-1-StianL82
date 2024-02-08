export function setupBackToLastPage() {
  const backToLastPageLink = document.getElementById("backToLastPage");

  if (backToLastPageLink) {
    backToLastPageLink.addEventListener("click", () => {
      window.history.back();
    });
  }
}