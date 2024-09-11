import { initialCards, createCard, removeCard, likeCard } from './cards';
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
const popupCloseButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');
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
    document.addEventListener('keydown', closeModalAtEsc);
}

// обрбаботчик нажатия кнопки добавления новой карточки
function handleClickNewPlaceBtn() {
    openModal(newCardPopup);
    document.addEventListener('keydown', closeModalAtEsc);
}

// обновление профиля (обработчик события submit)
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profilePopup);
    document.removeEventListener('keydown', closeModalAtEsc);
}

// добавление карточки масте (обработчик события submit)
function handleSendNewPlaceBtn(evt) {
    evt.preventDefault();
    const card = createCard(cardNameInput.value, cardImageUrlInput.value, removeCard, likeCard, handleClickCardImage);
    placesList.prepend(card);
    closeModal(newCardPopup);
    cardNameInput.value = '';
    cardImageUrlInput.value = '';
    document.removeEventListener('keydown', closeModalAtEsc);
}

// обработчик закрытия модального окна нажатием кнопки Esc
function closeModalAtEsc(evt) {
    document.removeEventListener('keydown', closeModalAtEsc);
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

// обработчик клика по картинке карточки
function handleClickCardImage(evt) {
    openModal(imagePopup);
    document.addEventListener('keydown', closeModalAtEsc);
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');
    imagePopupImage.setAttribute('src', evt.target.getAttribute('src'));
    imagePopupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
}

// открытие модального окна с формой изменения профиля
profileEditButton.addEventListener('click', handleClickProfileEditBtn);

// отправка данных из модального окна для редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// открытие модального окна с формой добавления карточки
placeAddButton.addEventListener('click', handleClickNewPlaceBtn);

// добавление новой карточки
formNewCard.addEventListener('submit', handleSendNewPlaceBtn)

// закрытие модального окна нажатием крестика
popupCloseButtons.forEach(item => {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closeModal(popup));
});

// закрытие любого модального окна нажатием оверлея
overlays.forEach(item => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(item);
        }
    });
});



  