const topMenu = document.querySelector('.header-menu');
const topWork = topMenu.querySelector('[data-work]');
const bottomMenu = document.querySelector('.footer-menu');
const bottomWork = bottomMenu.querySelector('[data-work]');

topWork.addEventListener('mouseover', () => {
  const topWorkSubMenu = topMenu.querySelector('.work-submenu');
  topWorkSubMenu.classList.remove('is-hidden');
});

topWork.addEventListener('mouseout', () => {
  const topWorkSubMenu = topMenu.querySelector('.work-submenu');
  setTimeout(function () {
    topWorkSubMenu.classList.add('is-hidden');
  }, (1000));
});

bottomWork.addEventListener('mouseover', () => {
  const bottomWorkSubMenu = bottomMenu.querySelector('.work-submenu');
  bottomWorkSubMenu.classList.remove('is-hidden');
});

bottomWork.addEventListener('mouseout', () => {
  const bottomWorkSubMenu = bottomMenu.querySelector('.work-submenu');
  setTimeout(function () {
    bottomWorkSubMenu.classList.add('is-hidden');
  }, (1000));
});

//need to deal with fingers and onclicks