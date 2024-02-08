function createModal() {
  const modal = document.createElement('div');
  modal.id = 'imageModal';

  const modalContent = document.createElement('img');
  modalContent.id = 'modalContent';
  modal.appendChild(modalContent);

  const closeButton = document.createElement('div');
  closeButton.classList.add('modal-close-button');
  closeButton.textContent = '✕';
  closeButton.addEventListener('click', (e) => {
    modal.style.display = 'none';
    e.stopPropagation();
  });

  modal.appendChild(closeButton);
  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  return modal;
}

export function showModal(imageSrc) {
  const modal = document.getElementById('imageModal') || createModal();
  const modalContent = document.getElementById('modalContent');
  modalContent.src = imageSrc;
  modal.style.display = 'flex';
}


