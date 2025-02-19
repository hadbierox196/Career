document.querySelector('.generate-btn').addEventListener('click', generateStats);

const clubs = [
    "Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", "Liverpool",
    "Manchester City", "Chelsea", "Paris Saint-Germain", "Juventus", "AC Milan",
    "Inter Milan", "Arsenal", "Tottenham Hotspur", "Atletico Madrid", "Borussia Dortmund"
    // Add more clubs if needed
];

let currentCategory = 'debut';

let debutGoals = 0, debutAssists = 0, primeGoals = 0, primeAssists = 0, retirementGoals = 0, retirementAssists = 0;

function generateStats() {
    if (currentCategory === 'debut') {
        generateDebutStats();
    } else if (currentCategory === 'prime') {
        generatePrimeStats();
    } else if (currentCategory === 'retirement') {
        generateRetirementStats();
    }
}

function generateDebutStats() {
    const debutClub = clubs[Math.floor(Math.random() * clubs.length)];
    const debutMatches = Math.floor(Math.random() * 50) + 1;
    debutGoals = Math.floor(Math.random() * debutMatches);
    debutAssists = Math.floor(Math.random() * debutMatches);

    document.querySelector('.debut-club').textContent = `Debut Club: ${debutClub}`;
    animateStats('.debut-matches', debutMatches, () => {
        animateStats('.debut-goals', debutGoals, () => {
            animateStats('.debut-assists', debutAssists, () => {
                currentCategory = 'prime';
            });
        });
    });
}

function generatePrimeStats() {
    const primeClub = clubs[Math.floor(Math.random() * clubs.length)];
    const primeMatches = Math.floor(Math.random() * 300) + 100;
    primeGoals = Math.floor(Math.random() * primeMatches);
    primeAssists = Math.floor(Math.random() * primeMatches);

    document.querySelector('.prime-club').textContent = `Prime Club: ${primeClub}`;
    animateStats('.prime-matches', primeMatches, () => {
        animateStats('.prime-goals', primeGoals, () => {
            animateStats('.prime-assists', primeAssists, () => {
                currentCategory = 'retirement';
            });
        });
    });
}

function generateRetirementStats() {
    const retirementClub = clubs[Math.floor(Math.random() * clubs.length)];
    const retirementMatches = Math.floor(Math.random() * 50) + 1;
    retirementGoals = Math.floor(Math.random() * retirementMatches);
    retirementAssists = Math.floor(Math.random() * retirementMatches);

    document.querySelector('.retirement-club').textContent = `Retirement Club: ${retirementClub}`;
    animateStats('.retirement-matches', retirementMatches, () => {
        animateStats('.retirement-goals', retirementGoals, () => {
            animateStats('.retirement-assists', retirementAssists, () => {
                currentCategory = 'debut';
                calculateGA(); // Calculate G/A after all stats
            });
        });
    });
}

// Animate stats with faster flashing (1 second max for each stat)
function animateStats(selector, finalValue, callback) {
    const element = document.querySelector(selector);
    element.classList.add('number-flash');
    let currentNumber = 0;

    const increment = Math.ceil(finalValue / 20); // Adjust for 1-second animation speed

    const interval = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalValue) {
            clearInterval(interval);
            element.textContent = finalValue; // Set final value
            element.classList.remove('number-flash');
            if (callback) callback();
        } else {
            element.textContent = currentNumber;
        }
    }, 50); // Controls speed (50ms per update = ~1 second total)
}

function calculateGA() {
    const totalGoals = debutGoals + primeGoals + retirementGoals;
    const totalAssists = debutAssists + primeAssists + retirementAssists;
    const totalGA = totalGoals + totalAssists;

    const finalResult = `Your G/A is ${totalGA} and had a career like ${getMilestone(totalGA)}`;
    document.getElementById('final-result').innerText = finalResult;
}

// Milestone function to compare against legendary footballers
function getMilestone(totalGA) {
    if (totalGA >= 1100) return "Cristiano Ronaldo";
    if (totalGA >= 1050) return "Lionel Messi";
    if (totalGA >= 1000) return "Pelé";
    if (totalGA >= 950) return "Arthur Friedenreich";
    if (totalGA >= 900) return "Eusébio";
    if (totalGA >= 850) return "Gerd Müller";
    if (totalGA >= 800) return "Josef Bican";
    if (totalGA >= 750) return "Romário";
    if (totalGA >= 700) return "Ferenc Puskás";
    if (totalGA >= 650) return "Alfredo Di Stéfano";
    if (totalGA >= 600) return "Zlatan Ibrahimović";
    if (totalGA >= 550) return "Robert Lewandowski";
    if (totalGA >= 500) return "Luis Suárez";
    if (totalGA >= 450) return "Harry Kane";
    if (totalGA >= 400) return "Kevin De Bruyne";
    if (totalGA >= 350) return "Neymar Jr";
    if (totalGA >= 300) return "Erling Haaland";
    if (totalGA >= 250) return "Bruno Fernandes";
    if (totalGA >= 200) return "João Félix";
    if (totalGA >= 150) return "Marcus Rashford";
    if (totalGA >= 100) return "Jude Bellingham";
    if (totalGA >= 50) return "Paolo Maldini";
    return "an unknown legend";
}

function resetStats() {
    // Reset debut stats
    document.querySelector('.debut-club').textContent = "Debut Club";
    document.querySelector('.debut-matches').textContent = '0';
    document.querySelector('.debut-goals').textContent = '0';
    document.querySelector('.debut-assists').textContent = '0';

    // Reset prime stats
    document.querySelector('.prime-club').textContent = "Prime Club";
    document.querySelector('.prime-matches').textContent = '0';
    document.querySelector('.prime-goals').textContent = '0';
    document.querySelector('.prime-assists').textContent = '0';

    // Reset retirement stats
    document.querySelector('.retirement-club').textContent = "Retirement Club";
    document.querySelector('.retirement-matches').textContent = '0';
    document.querySelector('.retirement-goals').textContent = '0';
    document.querySelector('.retirement-assists').textContent = '0';

    // Reset result
    document.getElementById('final-result').textContent = '';

    // Reset category
    currentCategory = 'debut';

    // Reset values
    debutGoals = debutAssists = primeGoals = primeAssists = retirementGoals = retirementAssists = 0;
}
