// Part 2: JavaScript Functions - Scope, Parameters, Return Values

// Global state for tracking animation states
let animationStates = {
    isCardFlipped: false,
    isModalOpen: false
};

/**
 * Toggles card flip animation
 * @param {HTMLElement} cardElement - The card element to flip
 * @param {Object} state - Global state object to update
 * @returns {boolean} - New flip state
 */
function toggleCardFlip(cardElement, state) {
    // Local scope variable to check current state
    const isFlipped = cardElement.classList.contains('flipped');
    
    // Toggle the flipped class
    cardElement.classList.toggle('flipped');
    
    // Update global state and return
    state.isCardFlipped = !isFlipped;
    return state.isCardFlipped;
}

/**
 * Shows modal with animation
 * @param {HTMLElement} modalElement - The modal element to show
 * @param {Object} state - Global state object to update
 * @returns {boolean} - Success (true if modal was shown)
 */
function showModal(modalElement, state) {
    if (state.isModalOpen) return false; // Prevent multiple opens
    
    modalElement.classList.add('active');
    state.isModalOpen = true;
    return true;
}

/**
 * Closes modal with animation
 * @param {HTMLElement} modalElement - The modal element to close
 * @param {Object} state - Global state object to update
 * @param {Function} callback - Optional callback after closing
 * @returns {boolean} - Success (always true)
 */
function closeModal(modalElement, state, callback) {
    modalElement.classList.add('closing');
    
    // Wait for animation to complete
    setTimeout(() => {
        modalElement.classList.remove('active', 'closing');
        state.isModalOpen = false;
        if (callback) callback();
    }, 500); // Match CSS animation duration
    
    return true;
}

/**
 * Validates form input and returns feedback
 * @param {string} inputValue - The input value to validate
 * @returns {string} - Validation message
 */
function validateFormInput(inputValue) {
    // Local scope for validation logic
    const minLength = 2;
    if (!inputValue || inputValue.length < minLength) {
        return `Name must be at least ${minLength} characters long`;
    }
    return "Valid input";
}

// Part 3: Combining CSS Animations with JavaScript
// Event listener for card flip
const flipButton = document.getElementById('flip-btn');
const card = document.getElementById('card');
flipButton.addEventListener('click', () => {
    const flipped = toggleCardFlip(card, animationStates);
    console.log(`Card flipped: ${flipped}`);
});

// Event listeners for modal open/close
const openModalButton = document.getElementById('open-modal-btn');
const closeModalButton = document.getElementById('close-modal-btn');
const modal = document.getElementById('modal');
const contactForm = document.getElementById('contact-form');

openModalButton.addEventListener('click', () => {
    const success = showModal(modal, animationStates);
    if (success) {
        console.log('Modal opened successfully');
    }
});

closeModalButton.addEventListener('click', () => {
    const success = closeModal(modal, animationStates, () => console.log('Modal closed'));
    if (success) {
        console.log('Closing animation triggered');
    }
});

// Form submission with validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name').value;
    const feedback = validateFormInput(nameInput);
    console.log(`Form validation: ${feedback}`);
    if (feedback === "Valid input") {
        closeModal(modal, animationStates, () => console.log('Form submitted and modal closed'));
    }
});