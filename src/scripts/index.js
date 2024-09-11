import { initialCards } from './cards';
import { createCard, removeCard, likeCard } from './card';
import { openModal, closeModal } from './modal';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const placeAddButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardImageUrlInput = newCardPopup.querySelector('.popup__input_type_url');
const formNewCard = newCardPopup.querySelector('.popup__form');
const imagePopup = document.querySelector('.popup_type_image');


// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(createCard(item.name, item.link, removeCard, likeCard, handleClickCardImage));
});


// обрбаботчик нажатия кнопки редактирования профиля
function handleClickProfileEditBtn() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

// обрбаботчик нажатия кнопки добавления новой карточки
function handleClickNewPlaceBtn() {
    openModal(newCardPopup);
}

// обновление профиля (обработчик события submit)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profilePopup);
}

// добавление карточки масте (обработчик события submit)
function handleSendNewPlaceBtn(evt) {
    evt.preventDefault();
    const card = createCard(cardNameInput.value, cardImageUrlInput.value, removeCard, likeCard, handleClickCardImage);
    placesList.prepend(card);
    closeModal(newCardPopup);
    formNewCard.reset();
}

// обработчик клика по картинке карточки
function handleClickCardImage(name, link) {
    openModal(imagePopup);
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');
    imagePopupImage.setAttribute('src', link);
    imagePopupCaption.textContent = name;
}

// открытие модального окна с формой изменения профиля
profileEditButton.addEventListener('click', handleClickProfileEditBtn);

// отправка данных из модального окна для редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// открытие модального окна с формой добавления карточки
placeAddButton.addEventListener('click', handleClickNewPlaceBtn);

// добавление новой карточки
formNewCard.addEventListener('submit', handleSendNewPlaceBtn)



  