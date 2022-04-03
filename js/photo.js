const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field  input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const photoContainer = document.querySelector('.ad-form__photo-container');
const photoChooser = document.querySelector('.ad-form__photo-container  input[type=file]');
const photoPrev = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const photoPrevElemment = photoPrev.cloneNode(true);
    photoPrev.remove();
    const photoPreviewImg = document.createElement('img');
    photoPreviewImg.className = 'ad-form__photo--preview';
    photoPrevElemment.append(photoPreviewImg);
    photoPreviewImg.src = URL.createObjectURL(file);
    photoContainer.append(photoPrevElemment);
  }
});
