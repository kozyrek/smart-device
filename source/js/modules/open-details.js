const button = document.querySelector('.description__button');
const descriptionText = document.querySelector('.description');

const openDetails = () => {
  if (button) {
    button.addEventListener('click', () => {
      descriptionText.classList.toggle('description--open-details');

      if (descriptionText.classList.contains('description--open-details')) {
        button.textContent = 'Свернуть';
      } else {
        button.textContent = 'Подробнее';
      }
    });
  }
};

export {openDetails};
