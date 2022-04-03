const SUCCESS_POPUP_SHOW_TIME = 3000;
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorPopup = errorElement.cloneNode(true);
const successElement = document.querySelector('#success').content.querySelector('.success');
const successPopup = successElement.cloneNode(true);

// не разобралась как сделать универсальный закрыватель попапов, сделала два для каждого
const isEscapeKey = (evt) => evt.key === 'Escape';
// const isEnterKey = (evt) => evt.key === 'Enter';

const onPopupEscKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

function closeErrorModal () {
  errorPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydownError);
}

const onPopupEscKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
};

function closeSuccessModal () {
  successPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydownSuccess);
}
//end

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

export {createErrorMessage, createSuccessMessage};
