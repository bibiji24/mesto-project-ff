// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(name, link, deleteCard, like, handlerClickCardImage) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardTitle.textContent = name;
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', () => like(likeButton))
  cardImage.addEventListener('click', () => handlerClickCardImage(name, link));
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