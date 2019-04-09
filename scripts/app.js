const details = document.getElementsByClassName('details');

for (let i = 0; i < details.length; i++) {
  details[i].addEventListener('click', e => {
    details[i].classList.toggle('is-active');
    //console.log(e, e.path.includes('div.details'));
    if (details[i].classList.contains('is-active') === false) {
      details[i].blur();
    }
  });
}

// TODO: need to deal with fingers and onclicks
// [ ] top menu
// [ ] project cards
// TODO: easter egg
