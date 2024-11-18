document.addEventListener('DOMContentLoaded', function() {
    const texts = ["Developer", "Designer", "Freelancer", "Blogger"]; // Add your texts here
    let index = 0;
    const typingTextSpan = document.querySelector('.typing-text span');
    let typingInterval;

    function typeText() {
        const currentText = texts[index];
        typingTextSpan.textContent = ''; // Clear the current text
        let charIndex = 0;

        typingInterval = setInterval(() => {
            if (charIndex < currentText.length) {
                typingTextSpan.textContent += currentText[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    index = (index + 1) % texts.length;
                    typeText();
                }, 5000); // Wait for 5 seconds before typing the next text
            }
        }, 100); // Adjust typing speed here (lower number = faster typing)
    }

    typeText();
});