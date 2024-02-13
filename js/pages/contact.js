import * as components from "../components/backToTopButton.js";

document.addEventListener('DOMContentLoaded', function () {
  components.enableScrollToTop();
});


function setupFormValidation() {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
      document.getElementById('customAlert').style.display = 'block';

      form.reset();

      setTimeout(function() {
          document.getElementById('customAlert').style.display = 'none';
      }, 3000);
    }
  });

  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      hideErrorMessage(input.id + 'Error');
    });

    input.addEventListener('blur', function () {
      validateField(input.id);
    });
  });
}


function validateForm() {
  let isValid = true;

  isValid = validateField('name') && isValid;
  isValid = validateField('email') && isValid;
  isValid = validateField('subject') && isValid;
  isValid = validateField('message') && isValid;

  return isValid;
}


function validateField(fieldId) {
  const fieldValue = document.getElementById(fieldId).value;
  const errorId = fieldId + 'Error';
  const errorElement = document.getElementById(errorId);

  let isValid = true;

  switch (fieldId) {
    case 'name':
      if (fieldValue.trim().length <= 5) {
        isValid = false;
      }
      break;
    case 'email':
      if (!/^\S+@\S+\.\S+$/.test(fieldValue)) {
        isValid = false;
      }
      break;
    case 'subject':
      if (fieldValue.trim().length <= 15) {
        isValid = false;
      }
      break;
    case 'message':
      if (fieldValue.trim().length <= 25) {
        isValid = false;
      }
      break;
  }

  errorElement.style.display = isValid ? "none" : "block";

  return isValid;
}


function hideErrorMessage(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none";
}

export function contactPage() {
  setupFormValidation();
  components.enableScrollToTop();
}


