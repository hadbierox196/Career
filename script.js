document.addEventListener("DOMContentLoaded", function () {
    // Typing Animation
    const typingTexts = ["Total Submission To Allah's Will"];
    const typingSpeed = 40; // Speed per letter
    const maxTypingTime = 1000; // Max 1 second per phrase
    let typingIndex = 0;
    let charIndex = 0;
    let currentText = "";
    let typingElement = document.getElementById("typing-text");

    function typeText() {
        if (charIndex < typingTexts[typingIndex].length) {
            currentText += typingTexts[typingIndex][charIndex];
            typingElement.textContent = currentText;
            charIndex++;
            let speed = Math.max(typingSpeed, maxTypingTime / typingTexts[typingIndex].length);
            setTimeout(typeText, speed);
        }
    }
    typeText();

    // Scroll Animations
    const scrollElements = document.querySelectorAll(".scroll-effect");
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    scrollElements.forEach(el => observer.observe(el));

    // Number Count Animations
    function animateStats(selector, finalValue, callback) {
        const element = document.querySelector(selector);
        element.classList.add("number-flash");
        let currentNumber = 0;
        const intervalSpeed = Math.max(50, 1000 / finalValue); // Max 1 second per number

        const interval = setInterval(() => {
            element.textContent = currentNumber;
            currentNumber++;
            if (currentNumber > finalValue) {
                clearInterval(interval);
                element.textContent = finalValue;
                element.classList.remove("number-flash");
                if (callback) callback();
            }
        }, intervalSpeed);
    }

    // Run number animations when in view
    const numberElements = document.querySelectorAll(".animate-number");
    numberElements.forEach(el => {
        const finalValue = parseInt(el.getAttribute("data-value"), 10);
        if (!isNaN(finalValue)) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats(`#${el.id}`, finalValue);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(el);
        }
    });
});
