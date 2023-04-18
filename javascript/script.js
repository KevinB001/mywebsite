// theme change slider

const body = document.querySelector('body');
const headings = document.querySelectorAll('.h4');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const themeStatus = document.querySelector('.theme-status');

function toggleTheme() {
  for (i = 0; i < headings.length; ++i) {
  headings[i].classList.toggle('h4-light-mode');
  }
  for (i = 0; i < navLinks.length; ++i) {
  navLinks[i].classList.toggle('h4-light-mode');
  }
  body.classList.toggle('light-mode');
  const themeMessage = body.classList.contains('light-mode') ?
    'Dark'
    : "Light"
  themeStatus.innerText = themeMessage; 
}
  
themeToggle.addEventListener('click', () => {
  toggleTheme();
});

// slide in headings

const items = document.querySelectorAll('.item');

const options = {
  threshold: 0.5
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    }
  });
}, options);

items.forEach(item => {
  observer.observe(item);
});