import { openModal } from "./modal";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(name, link, deleteCard, like, handlerClickCardImage) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const avatar = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  avatar.setAttribute('src', link);
  avatar.setAttribute('alt', name);
  cardTitle.textContent = name;
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', () => like(likeButton))
  avatar.addEventListener('click', handlerClickCardImage);
  return card;
}

// @todo: Функция удаления карточки
export function removeCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

// функция обработки лайка
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

