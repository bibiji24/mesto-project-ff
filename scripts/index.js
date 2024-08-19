// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const avatar = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    avatar.setAttribute('src', link);
    avatar.setAttribute('alt', name);
    cardTitle.textContent = name;
    deleteButton.addEventListener('click', deleteCard);
    return card;
}
// @todo: Функция удаления карточки
function removeCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(createCard(item.name, item.link, removeCard));
});
