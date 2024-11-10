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
    if (hoverCount < 1) {
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

                // Generate social icons after 5 seconds
                generateSocialIcons();
            }, 5000); // 5-second delay
        });
        clickCount++;
    } else if (clickCount === 1 && canCopyCA) {
        const cryptoAddress = '45kRgVT2NCrW3daqo89LtMieJem1NFucPwkqwTV6pump';
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

function generateSocialIcons() {
    const socialContainer = document.createElement('div');
    socialContainer.style.marginTop = '20px';
    socialContainer.style.display = 'flex';
    socialContainer.style.gap = '80px'; // Increased gap for more distance between icons
    socialContainer.style.justifyContent = 'center';

    // Common style for icons
    const iconStyle = `
        width: 80px; /* Increased size */
        transition: transform 0.3s ease-in-out; /* Smooth hover animation */
        cursor: pointer;
    `;

    // Function to create an icon with a link
    function createIcon(src, alt, href) {
        const link = document.createElement('a');
        link.href = href;
        link.target = '_blank'; // Open link in a new tab
        link.rel = 'noopener noreferrer'; // Security measure for new tab

        const icon = document.createElement('img');
        icon.src = src;
        icon.alt = alt;
        icon.style.cssText = iconStyle;
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.1)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });

        link.appendChild(icon);
        return link;
    }

    // Telegram Icon
    const telegramIcon = createIcon('./src/telegram.png', 'Telegram', 'https://t.me/+z4oMLIkYIddhMDFk');
    socialContainer.appendChild(telegramIcon);

    // PumpFun Icon
    const pumpFunIcon = createIcon('./src/pumpfun.png', 'PumpFun', 'https://pump.fun/coin/45kRgVT2NCrW3daqo89LtMieJem1NFucPwkqwTV6pump');
    socialContainer.appendChild(pumpFunIcon);

    // X (formerly Twitter) Icon
    const xIcon = createIcon('./src/X.png', 'X', 'https://x.com/TeaseCoinCTO');
    socialContainer.appendChild(xIcon);

    // Append the container to the main container or another element
    const mainContainer = document.querySelector('.container');
    mainContainer.appendChild(socialContainer);
}
