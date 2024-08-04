function checkInputValidity(inputElement, config) {
  const errorMessage = '';
  if (inputElement.validity.valueMissing) {
    errorMessage = 'Вы пропустили это поле.';
  }
  else if (inputElement.validity.tooShort) {
    errorMessage = `Должно быть от ${inputElement.minLength} до ${inputElement.maxLength} символов.`;
  }
  else if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage || 'Неверный формат.';
  }
  else if (inputElement.validity.typeMismatch) {
    if (inputElement.type === 'url') {
      errorMessage = 'Введите адрес сайта.';
    } else {
      errorMessage = 'Введите корректное значение.';
    }
  };
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorMessage, config);
  } else {
    hideInputError(inputElement, config)
  };
  inputElement.addEventListener('input', checkInputValidity);
};

function hideInputError(inputElement, config) {
  const errorElement = inputElement.closest(config.formSelector).querySelector(`.${inputElement.name}-input-error`);
  if (errorElement) {
    errorElement.textContent = ''; 
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass); 
  }
};

function showInputError(inputElement, errorMessage, config) {
  const errorElement = inputElement.closest(config.formSelector).querySelector(`.${inputElement.name}-input-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid); 
};

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
    formElement.addEventListener('submit', (event) => event.preventDefault());
    toggleButtonState(inputList, buttonElement, config);
  });
};

function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => hideInputError(inputElement, config));
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

export { enableValidation, clearValidation };
