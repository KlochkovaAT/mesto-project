const hideInputError = (formElement, inputElement, cssClassess) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(cssClassess.inputErrorClass);
  errorElement.classList.remove(cssClassess.errorClass);
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage, cssClassess) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(cssClassess.inputErrorClass);
  errorElement.classList.add(cssClassess.errorClass);
  errorElement.textContent = errorMessage;
};

const isValid = (formElement, inputElement, cssClassess) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, cssClassess);
  } else {
    hideInputError(formElement, inputElement, cssClassess);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, cssClassess) => {
  const inputList = Array.from(formElement.querySelectorAll(cssClassess.inputSelector));
  const buttonElement = formElement.querySelector(cssClassess.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, cssClassess)
      toggleButtonState(inputList, buttonElement, cssClassess.inactiveButtonClass);
    });
  });
};

export const enableValidation = (cssClassess) => {
  const formList = Array.from(document.querySelectorAll(cssClassess.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    resetValidation(formElement, cssClassess);
    setEventListeners(formElement, cssClassess);
  });
};

export function resetValidation(formElement, cssClassess) {
  const inputList = Array.from(formElement.querySelectorAll(cssClassess.inputSelector));
  const buttonElement = formElement.querySelector(cssClassess.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, cssClassess.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, cssClassess);
  });
}
