// Функция удаления класса для работы с включенным JS:
const page = document.querySelector('.no-js');

const removeClassNoJs = () => {
  if (page) {
    page.classList.remove('no-js');
  }
};

export {removeClassNoJs};
