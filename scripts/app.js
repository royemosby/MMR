const topMenu = document.querySelector('.header-menu');
const topWork = topMenu.querySelector('[data-work]');

topWork.addEventListener('mouseover', () => {
  const topWorkSubMenu = topMenu.querySelector('.work-submenu');
  topWorkSubMenu.classList.remove('is-hidden');
});

topWork.addEventListener('mouseout', () => {
  const topWorkSubMenu = topMenu.querySelector('.work-submenu');
  setTimeout(() => {
    topWorkSubMenu.classList.add('is-hidden');
  }, (1000));
});

// TODO need to deal with fingers and onclicks
