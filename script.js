const teaseButton = document.getElementById('teaseButton');
const caButton = document.getElementById('caButton');
const message = document.getElementById('message');

let hoverCount = 0;
let clickCount = 0;
let canCopyCA = false; // Lock for copying the actual CA
let secondMessage; // Reference for "Has it actually?" message

// Set initial position of the button for smooth transitions from the start
teaseButton.style.position = 'absolute';
teaseButton.style.left = '50%';
teaseButton.style.top = '70%'; // Move the button below the coin name
teaseButton.style.transform = 'translate(-50%, -50%)';

teaseButton.addEventListener('mouseover', () => {
    if (hoverCount < 2) {
        // Calculate a random position anywhere on the screen while keeping the button visible
        const randomX = Math.random() * (window.innerWidth - teaseButton.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - teaseButton.offsetHeight);

        teaseButton.style.left = `${randomX}px`;
        teaseButton.style.top = `${randomY}px`;
        hoverCount++;
    }
});

teaseButton.addEventListener('click', () => {
    teaseButton.classList.add('hidden');
    caButton.classList.remove('hidden');
    message.textContent = ''; // Clear any previous messages
});

caButton.addEventListener('click', () => {
    if (clickCount === 0) {
        navigator.clipboard.writeText('Try Again :)').then(() => {
            message.textContent = 'CA has been copied to your clipboard';

            // Remove the "CA has been copied to your clipboard" message after 5 seconds
            setTimeout(() => {
                message.textContent = '';
            }, 5000);

            // Display "Has it actually?" after 5 seconds
            setTimeout(() => {
                secondMessage = document.createElement('p');
                secondMessage.textContent = 'Has it actually?';
                secondMessage.style.marginTop = '10px';
                message.after(secondMessage);

                // Change the button text after 5 seconds
                caButton.textContent = 'Copy CA, for real this time :)';
                canCopyCA = true; // Unlock the ability to copy the actual CA
            }, 5000); // 5-second delay
        });
        clickCount++;
    } else if (clickCount === 1 && canCopyCA) {
        const cryptoAddress = 'YOUR_CRYPTO_ADDRESS_HERE';
        navigator.clipboard.writeText(cryptoAddress).then(() => {
            message.textContent = 'Congratulations, let\'s go earn money!';
            // Remove the "Has it actually?" message if it exists
            if (secondMessage) {
                secondMessage.remove();
            }
        });
        clickCount++;
    }
});
