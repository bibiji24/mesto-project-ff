function showError(formElement, inputElement, errMsg, validationConfig) {
    const errElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errElement.classList.add(validationConfig.errorClass);
    errElement.textContent = errMsg;
}

function hideError(formElement, inputElement, validationConfig) {
    const errElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errElement.classList.remove(validationConfig.errorClass)
    errElement.textContent = '';
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function changeButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function checkInputValid(formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideError(formElement, inputElement, validationConfig)
    }
}
    /*
validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
    */

function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    changeButtonState(inputList, buttonElement, validationConfig)
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValid(formElement, inputElement, validationConfig);
            changeButtonState(inputList, buttonElement, validationConfig);
        })
    })
}

export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, validationConfig);
    })

}

export function clearValidatioin(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach(inputElement => {
        hideError(formElement, inputElement, validationConfig);
        changeButtonState(inputList, buttonElement, validationConfig)
    })
}