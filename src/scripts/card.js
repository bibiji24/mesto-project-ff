export function createCard(data, userId, deleteCard, like, handlerClickCardImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const { name, link } = data;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounts = card.querySelector('.card__like-counts');
  card.setAttribute('data-card-id', data._id);
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardTitle.textContent = name;
  if (data.owner._id === userId) {
    deleteButton.setAttribute('data-card-id', data._id);
    deleteButton.addEventListener('click', evt => {
      deleteCard(card, data._id)
    });
  } else {
    deleteButton.remove();
  }
  if (cardHasLike(userId, data.likes)) {
    handleClickLike(likeButton, likeCounts, data.likes.length);
  } else {
    likeCounts.textContent = data.likes.length;
  }
  likeButton.addEventListener('click', (evt) => like(evt.target, likeCounts, data._id))
  cardImage.addEventListener('click', () => handlerClickCardImage(name, link));
  return card;
}

export function removeCard(card) {
  card.remove();
}

export function handleClickLike(likeButton, likeCountsElement, likeAmount) {
  likeButton.classList.toggle('card__like-button_is-active');
  likeCountsElement.textContent = likeAmount;
}

function cardHasLike(userId, likes) {
  return likes.some(item => {
    return item._id === userId
  })
}

export function cardIsLiked(likeButton) {
  return likeButton.classList.contains('card__like-button_is-active');
}