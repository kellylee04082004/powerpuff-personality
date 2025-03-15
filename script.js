const questions = [
    {
        question: "What's your favorite weekend plan",
        answers: [
            { text: "Chilling with a good book", type: "a Cozy Girl" },
            { text: "Planning an exciting trip", type: "a Explorer" },
            { text: "Perfecting a new hobby", type: "a Creator" },
            { text: "Shopping and treating yourself", type: "the Icon" }
        ]
    },
    {
        question: "How do you make a decision",
        answers: [
            { text: "I weight my options", type: "a Strategist" },
            { text: "I ask my friend", type: "Indecisive" },
            { text: "I do whatever feels", type: "the Real One" },
            { text: "I’m always confident in decisions", type: "Energetic" }
        ]
    },
    {
        question: "Superpower you wish you had",
        answers: [
            { text: "Teleportation", type: "a Procrastinator" },
            { text: "Super memory", type: "a Perfectionist" },
            { text: "Telepathy", type: "a Mindful" },
            { text: "Wish granting", type: "a Creator" }
        ]
    },
    {
        question: "What’s your guilty pleasure",
        answers: [
            { text: "Eating comfort food at night", type: "a Cozy Girl" },
            { text: "Binge-watching TV shows", type: "Energetic" },
            { text: "Listening to cringy pop music", type: "a Mastermind" },
            { text: "Hours scrolling on TikTok", type: "Mindful" }
        ]
    },
    {
        question: "What’s your biggest weakness",
        answers: [
            { text: "Overthinking everything", type: "a Perfectionist" },
            { text: "Always running late", type: "a Procrastinator" },
            { text: "Can't say not to people", type: "a Introverted Extrovert" },
            { text: "Being too emotional", type: "Romantic" }
        ]
    },
    {
        question: "What's your move at a party",
        answers: [
            { text: "I host the party", type: "the Icon" },
            { text: "I wait for someone to talk to me", type: "a Introverted Extrovert" },
            { text: "I observe before mingling", type: "a Strategist" },
            { text: "I start deep conversations", type: "a Mastermind" }
        ]
    },
    {
        question: "Which animal would you be",
        answers: [
            { text: "A unicorn", type: "a Creator" },
            { text: "An owl", type: "a Strategist" },
            { text: "A dolphin", type: "Chill" },
            { text: "A flamingo", type: "the Icon" }
        ]
    },
    {

        question: "First buy as a millionaire",
        answers: [
            { text: "A private jet", type: "a Explorer" },
            { text: "The latest high-tech gadgets", type: "a Perfectionist" },
            { text: "A beach house", type: "Chill" },
            { text: "An extravagant shopping spree", type: "the Real One" }
        ]
    },
    {
        question: "What’s your biggest pet peeve",
        answers: [
            { text: "When I get interrupted", type: "Mindful" },
            { text: "Being told to hurry up", type: "a Procrastinator" },
            { text: "People arguing without logic", type: "a Mastermind" },
            { text: "Plans got canceled last minute", type: "Energetic" }
        ]
    },
    {
        question: "What is your spirit drink",
        answers: [
            { text: "Champagne", type: "the Icon" },
            { text: "Craft cocktail", type: "the Real One" },
            { text: "Smoothie", type: "a Creator" },
            { text: "Coffee", type: "Chill" }
        ]
    }
];

let currentQuestionIndex = 0;
const personalityScores = {};






// Initialize scores
function initializeScores() {
    questions.forEach(q => {
        q.answers.forEach(a => {
            if (!personalityScores[a.type]) {
                personalityScores[a.type] = 0;
            }
        });
    });
}

// Display question and answers
// Display question and answers
function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const answerButtons = document.getElementById("answer-buttons");

    // Clear previous content
    questionContainer.innerText = questions[currentQuestionIndex].question;
    answerButtons.innerHTML = "";

    // ✅ Ensure answer buttons are centered inside their container
    answerButtons.style.display = "flex"; /* ✅ CHANGED */
    answerButtons.style.flexDirection = "column"; /* ✅ CHANGED */
    answerButtons.style.alignItems = "center"; /* ✅ CHANGED */
    answerButtons.style.justifyContent = "center"; /* ✅ CHANGED */
    answerButtons.style.width = "100%"; /* ✅ Ensures it takes full width */

    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;

        // ✨ Make buttons shorter and properly centered
        button.classList.add(
            "bg-pink-300", "text-white", "px-5", "py-2", /* ✅ Reduced padding */
            "rounded-full", "w-[280px]", "max-w-[340px]", /* ✅ Fixed width */
            "text-center", "shadow-md",
            "border", "border-pink-400",
            "hover:bg-pink-400", "hover:scale-105", "transition", "duration-300",
            "mt-2"
        );

        button.style.width = "280px"; /* ✅ CHANGED - Shorter width */
        button.style.padding = "7px 17px"; /* ✅ CHANGED - Compact button */
        button.style.minWidth = "250px"; /* ✅ CHANGED - Prevents buttons from shrinking */
        button.style.display = "block"; /* ✅ Ensures they appear as separate rows */
        button.style.margin = "6px auto"; /* ✅ Centers each button horizontally */

        button.onclick = () => selectAnswer(answer.type);
        answerButtons.appendChild(button);
    });
}






// Process answer selection
function selectAnswer(personalityType) {
    personalityScores[personalityType]++;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result");
    const tryAgainButton = document.getElementById("try-again-button");

    quizContainer.style.display = "none"; // Hide quiz questions
    resultContainer.style.display = "block"; // Show result section
    tryAgainButton.style.display = "block"; // Show Try Again button

    let topPersonality = Object.keys(personalityScores).reduce((a, b) =>
        personalityScores[a] > personalityScores[b] ? a : b
    );

    let cleanPersonality = topPersonality
    .replace(/^(The|A)\s+/i, "") // Remove "The" or "A" at the start
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, ""); // Remove all spaces


    resultContainer.innerHTML = ""; // Clear previous results

    // 🖼️ Create Image Element
    const image = document.createElement("img");
    image.src = `images/${cleanPersonality}.jpg`;
    image.alt = topPersonality;
    image.style.width = "320px"; // Reduce image size
    image.style.height = "auto";
    image.style.display = "block"; 
    image.style.margin = "10px auto"; // Center

    // ✨ Create and Append Text
    const text = document.createElement("p");
    text.style.fontSize = "18px";
    text.style.fontWeight = "bold";
    text.style.color = "#ff5e78";
    text.style.textAlign = "center";
    text.style.marginBottom = "10px";
    text.innerText = `You are ${topPersonality}`;

    // 🎯 Update Try Again Button Styles
    tryAgainButton.style.display = "block";
    tryAgainButton.style.margin = "20px auto"; // Center button
    tryAgainButton.style.padding = "8px 16px"; // Smaller padding
    tryAgainButton.style.fontSize = "16px"; // Adjust text size
    tryAgainButton.style.width = "auto"; // Remove fixed width
    tryAgainButton.style.borderRadius = "50px"; // More rounded shape

    // Append elements
    resultContainer.appendChild(text);
    resultContainer.appendChild(image);
    resultContainer.appendChild(tryAgainButton);
}


function resetQuiz() {
    currentQuestionIndex = 0;

    // Reset personality scores
    Object.keys(personalityScores).forEach(key => {
        personalityScores[key] = 0;
    });

    // Hide result section and show quiz container
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    // Restart the quiz
    showQuestion();
}

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    const tryAgainButton = document.getElementById("try-again-button");

    // Hide the quiz initially
    quizContainer.classList.add("hidden");

    // Start quiz button
    startButton.addEventListener("click", function () {
        startButton.style.display = "none"; 
        quizContainer.classList.remove("hidden");
    });

    // Try Again button event
    tryAgainButton.addEventListener("click", resetQuiz);
});
document.addEventListener("DOMContentLoaded", function () {
    const videoModal = document.getElementById("videoModal");
    const introVideo = document.getElementById("introVideo");
    const closeBtn = document.getElementById("closeBtn");

    // Ensure the video plays on page load
    introVideo.play().catch(error => {
        console.log("Autoplay failed, user interaction needed", error);
    });

    // Function to fade out and remove the video modal
    function fadeOutVideo() {
        videoModal.style.transition = "opacity 1s ease-out"; // Smooth fade-out transition
        videoModal.style.opacity = "0"; // Make it invisible

        setTimeout(() => {
            videoModal.style.display = "none"; // Remove from view after fade-out
        }, 1000); // Wait for fade-out transition to complete
    }

    // Fade out when the video ends
    introVideo.addEventListener("ended", fadeOutVideo);

    // If video is still playing after 2 seconds, fade out automatically
    setTimeout(fadeOutVideo, 2000);

    // Close modal when user clicks the close button
    closeBtn.addEventListener("click", fadeOutVideo);
});

// Start the quiz
initializeScores();
showQuestion();

