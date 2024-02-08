export function showLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator'); // 
  if (loadingIndicator) loadingIndicator.style.display = "block";
}

export function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading-indicator'); // 
  if (loadingIndicator) loadingIndicator.style.display = "none";
}