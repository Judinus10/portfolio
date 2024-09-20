const textArray = ['Developer', 'Designer', 'Coder', 'Creator']; // Add your roles here
let index = 0;
let currentText = '';
let isDeleting = false;

function type() {
  const span = document.getElementById('typed-text');

  if (isDeleting) {
    currentText = textArray[index].substring(0, currentText.length - 1);
  } else {
    currentText = textArray[index].substring(0, currentText.length + 1);
  }

  span.textContent = currentText;

  if (!isDeleting && currentText === textArray[index]) {
    // Wait before starting to delete the word
    setTimeout(() => isDeleting = true, 2000); // Pause at the end of each word
  } else if (isDeleting && currentText === '') {
    isDeleting = false;
    index = (index + 1) % textArray.length; // Move to the next word
  }

  setTimeout(type, isDeleting ? 150 : 100); // Speed of typing
}

// Start typing effect
type();
