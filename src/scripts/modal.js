export function openModal(popupElem) {
    popupElem.classList.add('popup_is-animated');
    // таймер чтобы класс popup_is-opened применился точно после popup_is-animated
    setTimeout(() => popupElem.classList.add('popup_is-opened'), 0);
}

export function closeModal(popupElem) {
    popupElem.classList.remove('popup_is-opened');
    setTimeout(() => popupElem.classList.remove('popup_is-animated'), 600);
}

