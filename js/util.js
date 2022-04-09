const SUCCESS_POPUP_SHOW_TIME = 3000;
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorPopup = errorElement.cloneNode(true);
const successElement = document.querySelector('#success').content.querySelector('.success');
const successPopup = successElement.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

function closeModal (popup, onPopupKeydown) {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeydown);
}

const onPopupEscKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal(errorPopup, onPopupEscKeydownError);
  }
};

const onPopupEscKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal(successPopup, onPopupEscKeydownSuccess);
  }
};

const createErrorMessage = (message) => {
  errorPopup.classList.remove('hidden');
  errorPopup.querySelector('.error__message').textContent = message;
  errorPopup.querySelector('.error__button').textContent = 'ХОРОШО';
  document.addEventListener('click', () => {
    errorPopup.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydownError);
  document.body.append(errorPopup);
};

const createSuccessMessage = () => {
  successPopup.classList.remove('hidden');
  document.addEventListener('click', () => {
    successPopup.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydownSuccess);
  document.body.append(successPopup);
  setTimeout(() => {
    successPopup.classList.add('hidden');
  }, SUCCESS_POPUP_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createErrorMessage, createSuccessMessage, debounce};
