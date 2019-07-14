(function() {
  var header = document.querySelector('header');
  var isExpanded = true;

  function toggle() {
    header.classList.toggle('is-scrolled');
  }

  document.addEventListener('scroll', function(e) {
    if (isExpanded && window.scrollY > 110) {
      window.requestAnimationFrame(function() {
        toggle();
        isExpanded = !isExpanded;
      });
    } else if (!isExpanded && window.scrollY < 30) {
      window.requestAnimationFrame(function() {
        toggle();
        isExpanded = !isExpanded;
      });
    }
  });
})();
