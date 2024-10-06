import './pages/index.css'; // добавьте импорт главного файла стилей

import { cardIsLiked, createCard, handleClickLike, removeCard } from './scripts/card';
import { openModal, closeModal, addListenerToOverlay } from './scripts/modal';
import { clearValidatioin, enableValidation } from './scripts/validation';
import { sendDeleteCardRequest, sendLike, sendNewCard, takeNewCards, takeUserInfo, updateUserData } from './scripts/api';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


// DOM узлы
// контейнер для карточек
const placesList = document.querySelector('.places__list');

// кнопки на странице
const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');

// DOM узлы на странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');

// попап изменения профиля
const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const formProfile = document.querySelector('.popup_type_edit .popup__form');

// попап добавления карточки
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardImageUrlInput = newCardPopup.querySelector('.popup__input_type_url');
const formNewCard = newCardPopup.querySelector('.popup__form');

// попап отображения картинки
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// попап ввода данных новой аватарки
const newAvatarPopup = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = newAvatarPopup.querySelector('.popup__form');
const newAvatarUrlInput = newAvatarPopup.querySelector('.popup__input_type_avatar-link');

// попап подтверждения удаления
const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmButton = confirmPopup.querySelector('.popup__button');

// общие элементы для всех попапов
const popupCloseButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');


// функция вставки данных о поользователе
function updateUserInfo(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  avatar.setAttribute('style', `background-image: url(${data.avatar});`)
}

// функция изменения надписи на кнопке во время загрузки данных с сервера или на сервер
function changeButtonWaitingState(buttonElement) {
  if (buttonElement.textContent === 'Сохранить') {
    buttonElement.textContent = 'Сохранение...'
  } else {
    buttonElement.textContent = 'Сохранить'
  }
}

// обработка ошибки при запросе на сервер
function handleError(err) {
	console.log(`Error: ${err}`);
}

// обработчик нажатия кнопки подтверждения.
let handleConfirmButtonClick;

// обработчик нажатия на кнопку удаления карточки. 
function handleClickCardDeleteButton(card, cardId) {
  openModal(confirmPopup)
  handleConfirmButtonClick = () => {
    deleteCard(card, cardId)
  }
}

confirmButton.addEventListener('click', () => handleConfirmButtonClick());

// обрбаботчик нажатия кнопки редактирования профиля
function handleClickProfileEditBtn() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidatioin(formProfile, validationConfig);
    openModal(profilePopup);
}

// обрбаботчик нажатия кнопки добавления новой карточки
function handleClickNewPlaceBtn() {
    openModal(newCardPopup);
    formNewCard.reset();
    clearValidatioin(formNewCard, validationConfig);
}
// обрбаботчик нажатия аватарки для изменения автарки
function handleClickEditAvatar() {
    openModal(newAvatarPopup);
    formNewAvatar.reset();
    clearValidatioin(formNewAvatar, validationConfig);
}

// обновление профиля (обработчик события submit)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const newData = {
      name: nameInput.value,
      about: descriptionInput.value
    }
    changeButtonWaitingState(evt.target.querySelector('button'));
    updateUserData(newData, false)
    .then((data) => {
      updateUserInfo(data)
      closeModal(profilePopup)
    })
    .catch(handleError)
    .finally(() => {
      changeButtonWaitingState(evt.target.querySelector('button'))
    })
}

// добавление карточки места (обработчик события submit)
function handleSendNewPlaceBtn(evt) {
    evt.preventDefault();
    const newData = {
      name: cardNameInput.value, 
      link: cardImageUrlInput.value
    }
    changeButtonWaitingState(evt.target.querySelector('button'));
    sendNewCard(newData).then(data => {
      const card = createCard(data, data.owner._id, handleClickCardDeleteButton, likeCard, handleClickCardImage);
      placesList.prepend(card);
      closeModal(newCardPopup)
      formNewCard.reset();
    })
    .catch(handleError)
    .finally(() => {
      changeButtonWaitingState(evt.target.querySelector('button'))
    })
}



// функция обработки лайка
function likeCard(likeButton, likeCountsElement, cardId) {
  if (cardIsLiked(likeButton)) {
    sendLike(cardId, 'DELETE').then(card => {
      handleClickLike(likeButton, likeCountsElement, card.likes.length);
    }).catch(handleError);
  } else {
    sendLike(cardId, 'PUT').then(card => {
      handleClickLike(likeButton, likeCountsElement, card.likes.length);
    }).catch(handleError);
  }
}

// обработчик удаления карточки с удалением карточки на сервере
function deleteCard(card, cardId) {
  sendDeleteCardRequest(cardId)
  .then(() => {
    removeCard(card);
  }).then(() => {      
    closeModal(confirmPopup);
  }).catch(handleError);
}


// обработчик клика по картинке карточки (открытие попапа)
function handleClickCardImage(name, link) {
  openModal(imagePopup);
  imagePopupImage.setAttribute('src', link);
  imagePopupImage.setAttribute('alt', name);
  imagePopupCaption.textContent = name;
}

// обработчик отправки нового аватара
function submitNewAvatar(evt) {
  evt.preventDefault();
  const newData = {avatar: newAvatarUrlInput.value};
  changeButtonWaitingState(evt.target.querySelector('button'));
  updateUserData(newData, true)
  .then(data => {
    updateUserInfo(data);
    closeModal(newAvatarPopup);
  })
  .catch(handleError)
  .finally(() => {
    changeButtonWaitingState(evt.target.querySelector('button'))
  })
}

// функция добавляющая слушатель событий элементу из списка кнопок закрытия модальных окон
function addListenerToCloseBtn(item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closeModal(popup));
}

// загрузка и отрисовка данных пользователя и новых карточек на странице
Promise.all([takeUserInfo(), takeNewCards()]).then(([userData, cardsArray]) => {
  updateUserInfo(userData);
  cardsArray.forEach(item => {
    placesList.append(createCard(item, userData._id, handleClickCardDeleteButton, likeCard, handleClickCardImage));
  })
}).catch(handleError);


// включение валидации форм
enableValidation(validationConfig);

// открытие модального окна с формой изменения профиля
profileEditButton.addEventListener('click', handleClickProfileEditBtn);

// отправка данных из модального окна для редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// открытие модального окна с формой добавления карточки
placeAddButton.addEventListener('click', handleClickNewPlaceBtn);

// добавление новой карточки
formNewCard.addEventListener('submit', handleSendNewPlaceBtn);

// окрытие модального окна с формой обновления аватарки
avatar.addEventListener('click', handleClickEditAvatar);

// отправка новой аватарки
formNewAvatar.addEventListener('submit', submitNewAvatar)

// закрытие модального окна нажатием крестика
popupCloseButtons.forEach(addListenerToCloseBtn);

// закрытие любого модального окна нажатием оверлея
overlays.forEach(addListenerToOverlay);


  