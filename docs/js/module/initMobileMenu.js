export function initMobileMenu(options = {}) {
  const {
    menuSelector = '.header-menu',
    burgerSelector = '.burger',
    closeButtonSelector = '.js-close',
    linkSelectors = ['.link-nav'],
    activeClass = 'active'
  } = options;

  const menuEl = document.querySelector(menuSelector);
  const burgerBtn = document.querySelector(burgerSelector);
  const closeBtn = menuEl?.querySelector(closeButtonSelector);
  const linkEls = menuEl
    ? Array.from(menuEl.querySelectorAll(linkSelectors.join(',')))
    : [];

  if (!menuEl || !burgerBtn) {
    console.warn('Mobile menu: required elements not found');
    return;
  }

  function openMenu() {
    menuEl.classList.add(activeClass);
    burgerBtn.classList.add(activeClass);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuEl.classList.remove(activeClass);
    burgerBtn.classList.remove(activeClass);
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    menuEl.classList.contains(activeClass) ? closeMenu() : openMenu();
  }

  // Клик по бургеру (открыть / закрыть)
  burgerBtn.addEventListener('click', toggleMenu);

  // Кнопка закрытия
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Клик по ссылкам
  linkEls.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuEl.classList.contains(activeClass)) {
      closeMenu();
    }
  });

  // Клик вне меню и бургера
  document.addEventListener('click', (e) => {
    if (
      menuEl.classList.contains(activeClass) &&
      !menuEl.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  return {
    open: openMenu,
    close: closeMenu
  };
}