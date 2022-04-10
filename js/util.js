const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeModal = (popup, onPopupKeydown) => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupKeydown);
};

const onPopupEscKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal(errorElement, onPopupEscKeydownError);
  }
};

const onPopupEscKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal(successElement, onPopupEscKeydownSuccess);
  }
};

const createErrorMessage = (message) => {
  errorElement.classList.remove('hidden');
  errorElement.querySelector('.error__message').textContent = message;
  errorElement.querySelector('.error__button').textContent = 'ХОРОШО';
  document.addEventListener('click', () => {
    errorElement.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydownError);
  document.body.append(errorElement);
};

const createSuccessMessage = () => {
  successElement.classList.remove('hidden');
  document.addEventListener('click', () => {
    successElement.classList.add('hidden');
  });
  document.addEventListener('keydown', onPopupEscKeydownSuccess);
  document.body.append(successElement);
  setTimeout(() => {
    successElement.classList.add('hidden');
  });
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createErrorMessage, createSuccessMessage, debounce};
