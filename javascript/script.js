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


// message form at bottom
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');


form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    

    if(nameValue === '') {
        setError(name, 'Please enter your name');
    } else {
        setSuccess(name);
    }

    if(emailValue === '') {
        setError(email, 'Please enter your email');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(messageValue === '') {
        setError(message, 'Please enter your message');
    } else {
        setSuccess(message);
    }
    const errorMessages = document.querySelectorAll('.error');
    if (errorMessages.length === 0) {
        form.submit();
        form.reset();
    }
};

 