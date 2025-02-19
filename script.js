document.addEventListener("DOMContentLoaded", function () {
    // Typing Animation (Max 1 sec per phrase)
    const typingTexts = ["Total Submission To Allah's Will"];
    const typingElement = document.getElementById("typing-text");
    const maxTypingTime = 1000; // 1 second max
    let typingIndex = 0;
    let charIndex = 0;

    function typeText() {
        if (typingIndex < typingTexts.length) {
            let text = typingTexts[typingIndex];
            let speed = maxTypingTime / text.length; // Adjust speed dynamically
            typingElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex < text.length) {
                setTimeout(typeText, speed);
            }
        }
    }
    typeText();

    // Scroll Animations
    const scrollElements = document.querySelectorAll(".scroll-effect");
    const observer = new IntersectionObserver(
        (entries) => {
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

    // Number Count Animations (Fast & Smooth)
    function animateStats(element, finalValue) {
        let currentNumber = 0;
        let increment = Math.ceil(finalValue / 50); // Adjust for smooth animation
        let interval = setInterval(() => {
            element.textContent = currentNumber;
            currentNumber += increment;
            if (currentNumber >= finalValue) {
                element.textContent = finalValue;
                clearInterval(interval);
            }
        }, 20); // Fast smooth effect
    }

    // Trigger number animations when in view
    const numberElements = document.querySelectorAll(".animate-number");
    numberElements.forEach(el => {
        const finalValue = parseInt(el.getAttribute("data-value"), 10);
        if (!isNaN(finalValue)) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats(el, finalValue);
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
