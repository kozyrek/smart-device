const phoneInputs = document.querySelectorAll('input[data-tel-input]');

let getInputNumbersValue = (input) => {
  return input.value.replace(/\D/g, '');
};

let onPhoneInput = (evt) => {
  let input = evt.target;
  let inputNumbersValue = getInputNumbersValue(input);
  let selectionStart = input.selectionStart;
  let formattedInputValue = '';

  if (!inputNumbersValue) {
    input.value = '';
  }

  if (input.value.length !== selectionStart) {
    if (evt.data && /\D/g.test(evt.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  if (inputNumbersValue[0] === '8' || inputNumbersValue[0] === '7') {
    formattedInputValue = '+7(';
  }
  if (inputNumbersValue[0] === '9') {
    formattedInputValue = '+7(' + inputNumbersValue;
  }
  if (inputNumbersValue.length > 1) {
    formattedInputValue = '+7(' + inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 5) {
    formattedInputValue += ')' + inputNumbersValue.substring(4);
  }

  input.value = formattedInputValue;
};

let onPhoneKeyDown = (evt) => {
  let input = evt.target;

  if (input.value === '') {
    input.value = '+7(';
  }

  if (evt.keyCode === 8 && getInputNumbersValue(input).length === 1) {
    input.value = '';
  }
};

let onPhonePaste = (evt) => {
  let input = evt.target;
  let inputNumbersValue = getInputNumbersValue(input);
  let pasted = evt.clipboardData || window.clipboardData;

  if (pasted) {
    let pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      input.value = inputNumbersValue;
      return;
    }
  }
};

const getMaskInput = () => {
  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('focus', (evt) => {
      let input = evt.target;
      if (input.value === '') {
        input.value = '+7(';
      }
    });
    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('paste', onPhonePaste);
  }
};

export {getMaskInput};
