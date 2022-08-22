const page = document.querySelector('.page-body');
const modal = document.querySelector('.modal');
const buttonOpen = document.querySelector('.page-header__button');
const buttonClose = modal.querySelector('.modal__close-button');
const modalForm = modal.querySelector('.feedback-form--modal');
const focusableElementsString = 'button:not([disabled]), input, textarea';
const focusableElements = modal.querySelectorAll(focusableElementsString);
const focusInput = document.getElementById('first-name-modal');

const modalElements = Array.from(focusableElements);
const firstTabStop = modalElements[0];
const lastTabStop = modalElements[modalElements.length - 1];


const existVerticalScroll = () => {
  return document.body.offsetHeight > window.innerHeight;
};

const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
};


const setClass = () => {
  modal.classList.toggle('modal--close');
  page.classList.toggle('page-body__lock');
};

const openModal = () => {
  buttonOpen.addEventListener('click', function (evt) {
    evt.preventDefault();

    page.dataset.scrollY = getBodyScrollTop();

    setClass();
    focusInput.focus();

    if (existVerticalScroll()) {
      page.style.top = `-${page.dataset.scrollY}px`;
    }
  });

  modal.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 9) {
      if (evt.shiftKey) {
        if (document.activeElement === firstTabStop) {
          evt.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if (document.activeElement === lastTabStop) {
          evt.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  });

};

const closeModal = () => {
  buttonClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    setClass();
    buttonOpen.focus();

    if (existVerticalScroll()) {
      window.scrollTo(0, page.dataset.scrollY);
    }
  });

  modal.addEventListener('click', function (evt) {
    const target = evt.target;
    const itsModalForm = target === modalForm || modalForm.contains(target);
    if (!itsModalForm) {
      setClass();
      buttonOpen.focus();

      if (existVerticalScroll()) {
        window.scrollTo(0, page.dataset.scrollY);
      }
    }
  });
};

export {openModal, closeModal};
