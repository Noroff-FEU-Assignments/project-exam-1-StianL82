export function enableScrollToTop() {
  document.querySelectorAll('.back-to-top-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  });
}