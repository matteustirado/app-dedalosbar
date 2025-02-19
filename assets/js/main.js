const emojis = document.querySelectorAll('.emojis button');
const inputContainer = document.querySelector('.input-container');
const inputField = document.getElementById('inputField');
const swipeButtonContainer = document.querySelector('.swipe-button-container');
const swipeButton = document.getElementById('swipeButton');
const swipeTrack = document.querySelector('.swipe-button-track');

let isSwiping = false;
let startX = 0;
let swipeCompleted = false;

function showInput() {
    inputContainer.style.display = 'block';
    inputField.focus();
}

function hideInputAndSwipe() {
    inputContainer.style.display = 'none';
    swipeButtonContainer.style.display = 'none';
    inputField.value = '';
    swipeButton.textContent = 'Arraste para Enviar';
    swipeButton.classList.remove('swiped');
    swipeButton.style.left = '0';
    swipeButtonContainer.style.backgroundColor = '#eae9e9';
    swipeCompleted = false;
}

emojis.forEach((emoji) => {
    emoji.addEventListener('click', showInput);
});

document.addEventListener('click', (event) => {
    if (!inputContainer.contains(event.target) && !Array.from(emojis).some((emoji) => emoji.contains(event.target))) {
        hideInputAndSwipe();
    }
});

inputField.addEventListener('input', () => {
    if (inputField.value.trim() !== '') {
        swipeButtonContainer.style.display = 'block';
    } else {
        swipeButtonContainer.style.display = 'none';
    }
});

function handleSwipeStart(event) {
    isSwiping = true;
    startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    swipeButton.style.transition = 'none';
}

function handleSwipeMove(event) {
    if (!isSwiping) return;

    const currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const offsetX = Math.min(
        Math.max(currentX - startX, 0),
        swipeTrack.offsetWidth - swipeButton.offsetWidth
    );

    swipeButton.style.left = `${offsetX}px`;

    if (offsetX >= swipeTrack.offsetWidth - swipeButton.offsetWidth) {
        swipeButton.textContent = 'Enviado!';
        swipeButton.classList.add('swiped');
        swipeButtonContainer.style.backgroundColor = 'green';
        swipeCompleted = true;

        console.log('Mensagem enviada:', inputField.value);

        inputField.value = '';
        setTimeout(hideInputAndSwipe, 2000);
    }
}

function handleSwipeEnd() {
    if (!isSwiping) return;

    if (!swipeCompleted) {
        swipeButton.style.left = '0';
    }
    isSwiping = false;
    swipeButton.style.transition = 'left 0.3s ease';
}

swipeButton.addEventListener('mousedown', handleSwipeStart);
document.addEventListener('mousemove', handleSwipeMove);
document.addEventListener('mouseup', handleSwipeEnd);

swipeButton.addEventListener('touchstart', handleSwipeStart);
document.addEventListener('touchmove', handleSwipeMove);
document.addEventListener('touchend', handleSwipeEnd);
