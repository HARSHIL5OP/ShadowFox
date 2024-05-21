document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('btn');
  const menu = document.getElementById('menu');
  const menuItems = menu.querySelectorAll('a');
  const nav = document.querySelector('nav');

  button.addEventListener('click', function() {
      menuItems.forEach(function(item) {
          if (item.style.display === 'none' || item.style.display === '') {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
      nav.classList.toggle('expanded'); // Toggle the 'expanded' class on the nav element
      adjustSectionPadding(); // Call function to adjust section padding
  });

  // Function to adjust section padding based on nav height
  function adjustSectionPadding() {
      const navHeight = nav.offsetHeight;
      document.querySelectorAll('section').forEach(function(section) {
          section.style.paddingTop = `${navHeight}px`;
      });
  }
});
