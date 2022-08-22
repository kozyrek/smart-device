const elements = document.querySelectorAll('form input, form textarea');

const setStorage = () => {
  if (window.localStorage) {
    for (let element of elements) {
      element.value = localStorage.getItem(element.name) || element.value;
      element.addEventListener('keyup', () => {
        localStorage.setItem(element.name, element.value);
      });
    }
  }
};

export {setStorage};
