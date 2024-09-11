const popupCloseButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');

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
function addListenerToOverlay(item) {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(evt.target);
        }
    });
}

// функция добавляющая слушатель событий элементу из списка кнопок закрытия модальных окон
function addListenerToCloseBtn(item) {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closeModal(popup));
}

// закрытие модального окна нажатием крестика
popupCloseButtons.forEach(addListenerToCloseBtn);

// закрытие любого модального окна нажатием оверлея
overlays.forEach(addListenerToOverlay);

// обработчик закрытия модального окна нажатием кнопки Esc
function closeModalAtEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}
