// Get DOM elements
const inputTest = document.getElementById('inputTest');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const feedback = document.getElementById('passwordFeedback');

// Password validation function
const evaluatePassword = (password) => {
    const checks = {
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+]/.test(password),
    };

    // Calculate rating based on passed checks
    const rating = Object.values(checks).filter(Boolean).length;

    // Determine feedback message
    let feedbackMessage = '';
    if (password.length === 0) {
        feedbackMessage = 'Please enter a password.';
    } else if (password.length < 8) {
        feedbackMessage = 'Password is too short (minimum 8 characters).';
    } else if (rating === 1) {
        feedbackMessage = 'Weak: Add more character types (uppercase, digits, special).';
    } else if (rating === 2) {
        feedbackMessage = 'Medium: Consider adding more character types.';
    } else if (rating === 3) {
        feedbackMessage = 'Good: Almost there, add a special character!';
    } else if (rating === 4) {
        feedbackMessage = 'Strong: Great password!';
    }

    return { rating, feedbackMessage };
};

// Update UI based on password strength
const updateUI = ({ rating, feedbackMessage }) => {
    const sections = [section1, section2, section3];
    const colors = {
        empty: 'var(--color-empty)',
        weak: 'var(--color-weak)',
        medium: 'var(--color-medium)',
        strong: 'var(--color-strong)',
    };

    // Reset all sections to empty
    sections.forEach((section) => (section.style.backgroundColor = colors.empty));

    // Apply colors based on rating and length
    if (inputTest.value.length === 0) {
        // Empty input
    } else if (inputTest.value.length < 8) {
        sections.forEach((section) => (section.style.backgroundColor = colors.weak));
    } else if (rating === 1) {
        section1.style.backgroundColor = colors.weak;
    } else if (rating === 2) {
        section1.style.backgroundColor = section2.style.backgroundColor = colors.medium;
    } else if (rating === 3) {
        sections.forEach((section) => (section.style.backgroundColor = colors.medium));
    } else if (rating === 4) {
        sections.forEach((section) => (section.style.backgroundColor = colors.strong));
    }

    // Update feedback text
    feedback.textContent = feedbackMessage;
};

// Event listener for password input
inputTest.addEventListener('input', () => {
    const result = evaluatePassword(inputTest.value);
    updateUI(result);
});