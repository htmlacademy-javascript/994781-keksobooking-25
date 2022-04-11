const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const createErrorMessage = (message) => {
  errorElement.classList.remove('hidden');
  errorElement.querySelector('.error__message').textContent = message;
  errorElement.querySelector('.error__button').textContent = 'ХОРОШО';

  function onMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }
  function onMessageClick() {
    closeMessage();
  }
  function closeMessage(){
    errorElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onMessageClick);
  }

  document.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.body.append(errorElement);
};

const createSuccessMessage = () => {
  successElement.classList.remove('hidden');

  function onMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }
  function onMessageClick() {
    closeMessage();
  }
  function closeMessage(){
    successElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onMessageClick);
  }

  document.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.body.append(successElement);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createErrorMessage, createSuccessMessage, debounce};
