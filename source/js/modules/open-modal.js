const page = document.querySelector('.page-body');
const modal = document.querySelector('.modal');
const buttonOpen = document.querySelector('.page-header__button');
const buttonClose = document.querySelector('.modal__close-button');
const modalForm = document.querySelector('.feedback-form--modal');
const focusableElementsString = 'button:not([disabled]), input, textarea';
const focusInput = document.getElementById('first-name-modal');

const existVerticalScroll = () => {
  return document.body.offsetHeight > window.innerHeight;
};

const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
};

const setClass = (item) => {
  if (item) {
    item.classList.toggle('modal--close');
    page.classList.toggle('page-body__lock');
  }
};

const openModal = () => {
  if (buttonOpen) {
    buttonOpen.addEventListener('click', function (evt) {
      evt.preventDefault();

      page.dataset.scrollY = getBodyScrollTop();

      setClass(modal);
      if (focusInput) {
        focusInput.focus();
      }

      if (existVerticalScroll()) {
        page.style.top = `-${page.dataset.scrollY}px`;
      }
    });
  }

  if (modal) {
    const focusableElements = modal.querySelectorAll(focusableElementsString);
    const modalElements = Array.from(focusableElements);
    const firstTabStop = modalElements[0];
    const lastTabStop = modalElements[modalElements.length - 1];

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
  }
};

const closeModal = () => {
  if (buttonClose) {
    buttonClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      setClass(modal);
      buttonOpen.focus();

      if (existVerticalScroll()) {
        window.scrollTo(0, page.dataset.scrollY);
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', function (evt) {
      const target = evt.target;
      const itsModalForm = target === modalForm || modalForm.contains(target);
      if (!itsModalForm) {
        setClass(modal);
        buttonOpen.focus();

        if (existVerticalScroll()) {
          window.scrollTo(0, page.dataset.scrollY);
        }
      }
    });

    modal.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        setClass(modal);
        buttonOpen.focus();

        if (existVerticalScroll()) {
          window.scrollTo(0, page.dataset.scrollY);
        }
      }
    });
  }
};

export {openModal, closeModal};
