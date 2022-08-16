const accordionButtons = document.querySelectorAll('.accordion__button');

const openAccordion = () => {
  for (let accordionButton of accordionButtons) {
    accordionButton.addEventListener('click', (evt) => {
      const accordionsActive = document.querySelectorAll('.accordion--active');
      accordionsActive.forEach((item) => {
        item.classList.remove('accordion--active');
      });

      const target = evt.target.parentElement;
      target.classList.toggle('accordion--active');
    });
  }
};

export {openAccordion};
