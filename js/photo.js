const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';
const avatarChooserElement = document.querySelector('.ad-form__field  input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoContainerElement = document.querySelector('.ad-form__photo-container');
const photoChooserElement = document.querySelector('.ad-form__photo-container  input[type=file]');
const PhotoPreviewTemplate = document.querySelector('#photo-preview').content.querySelector('.ad-form__photo');

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const photoPreviewElement = PhotoPreviewTemplate.cloneNode(true);
    const photoPreviewImg = photoPreviewElement.querySelector('.ad-form__photo--preview');
    photoPreviewImg.src = URL.createObjectURL(file);
    photoContainerElement.append(photoPreviewElement);
  }
});

const resetAvatar = () => {
  avatarPreviewElement.src = AVATAR_DEFAULT_SRC;
};

const resetPhotos = () => {
  const photoElements = document.querySelectorAll('.ad-form__photo');
  Array.from(photoElements).forEach((element) => {
    element.remove();
  });
};

export {resetAvatar, resetPhotos};
