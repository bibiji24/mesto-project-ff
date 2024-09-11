export function openModal(popupElem) {
    popupElem.classList.add('popup_is-animated');
    // таймер чтобы класс popup_is-opened применился точно после popup_is-animated
    setTimeout(() => popupElem.classList.add('popup_is-opened'), 0);
    document.addEventListener('keydown', closeModalAtEsc);
}

export function closeModal(popupElem) {
    document.removeEventListener('keydown', closeModalAtEsc);
    popupElem.classList.remove('popup_is-opened');
    setTimeout(() => popupElem.classList.remove('popup_is-animated'), 600);
}

// функция добавляющая слушатель событий элементу из списка оверлеев
export function addListenerToOverlay(item) {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(evt.target);
        }
    });
}

// обработчик закрытия модального окна нажатием кнопки Esc
function closeModalAtEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}
