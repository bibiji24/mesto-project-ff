import './pages/index.css'; // добавьте импорт главного файла стилей

import { initialCards } from './scripts/cards';
import { createCard, removeCard, handleClickLike } from './scripts/card';
import { openModal, closeModal, addListenerToOverlay } from './scripts/modal';
import { clearValidatioin, enableValidation } from './scripts/validation';
import { handleError, sendDeleteCardRequest, sendLike, sendNewCard, takeNewCards, takeUserInfo, updateUserData } from './scripts/api';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


// @todo: DOM узлы
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

// попап ввода данных новой аватарки
const newAvatarPopup = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = newAvatarPopup.querySelector('.popup__form');
const newAvatarUrlInput = newAvatarPopup.querySelector('.popup__input_type_avatar-link');

// общие элементы для всех попапов
const popupCloseButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');



// функция вставки данных о поользователе
function updateUserInfo(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  avatar.setAttribute('style', `background-image: url(${data.avatar});`)
}

function changeButtonWaitingState(buttonElement) {
  if (buttonElement.textContent === 'Сохранить') {
    buttonElement.textContent = 'Сохранение...'
  } else {
    buttonElement.textContent = 'Сохранить'
  }
}

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
    .then(updateUserInfo)
    .catch(handleError)
    .finally(() => {
      changeButtonWaitingState(evt.target.querySelector('button'))
      closeModal(profilePopup)
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
      const card = createCard(data, data.owner._id, deleteCard, likeCard, handleClickCardImage);
      placesList.prepend(card);
    })
    .catch(handleError)
    .finally(() => {
      changeButtonWaitingState(evt.target.querySelector('button'))
      closeModal(newCardPopup)
      formNewCard.reset();
    })
}



// функция обработки лайка
function likeCard(likeButton, likeCountsElement, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
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
function deleteCard(card, cardID) {
  sendDeleteCardRequest(cardID).then(() => {
    removeCard(card);
  })
}


// обработчик клика по картинке карточки (открытие попапа)
function handleClickCardImage(name, link) {
    openModal(imagePopup);
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');
    imagePopupImage.setAttribute('src', link);
    imagePopupCaption.textContent = name;
}

// обработчик отправки нового аватара
function submitNewAvatar(evt) {
    evt.preventDefault();
    const newData = {avatar: newAvatarUrlInput.value};
    changeButtonWaitingState(evt.target.querySelector('button'));
    updateUserData(newData, true)
    .then(updateUserInfo)
    .catch(handleError)
    .finally(() => {
      changeButtonWaitingState(evt.target.querySelector('button'))
      closeModal(newAvatarPopup);
    })
}

// функция добавляющая слушатель событий элементу из списка кнопок закрытия модальных окон
function addListenerToCloseBtn(item) {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closeModal(popup));
}

// загрузка и отрисовка данных пользователя и новых карточек на странице
Promise.all([takeUserInfo(), takeNewCards()]).then((res) => {
  updateUserInfo(res[0]);
  res[1].forEach(item => {
    placesList.append(createCard(item, res[0]._id, deleteCard, likeCard, handleClickCardImage));
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


  