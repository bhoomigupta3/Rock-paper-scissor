const choices = ["stone", "paper", "scissor"];
const beats = {
    stone: "scissor",
    paper: "stone",
    scissor: "paper"
};

let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const playerChoiceEl = document.getElementById("playerChoice");
const computerChoiceEl = document.getElementById("computerChoice");
const outcomeEl = document.getElementById("outcome");

document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => handlePlayerChoice(btn.dataset.choice));
});

// keyboard support: 1 -> stone, 2 -> paper, 3 -> scissor
window.addEventListener("keydown", (e) => {
    if (e.key === "1") handlePlayerChoice("stone");
    if (e.key === "2") handlePlayerChoice("paper");
    if (e.key === "3") handlePlayerChoice("scissor");
});

document.getElementById("nextRound").addEventListener("click", resetRound);
document.getElementById("reset").addEventListener("click", resetGame);

function handlePlayerChoice(playerChoice) {
    const computerChoice = randomChoice();
    showChoices(playerChoice, computerChoice);
    const result = decideWinner(playerChoice, computerChoice);
    applyResult(result);
}

function randomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function showChoices(player, computer) {
    playerChoiceEl.textContent = formatLabel(player);
    computerChoiceEl.textContent = formatLabel(computer);
}

function formatLabel(key) {
    return key[0].toUpperCase() + key.slice(1);
}

function decideWinner(player, computer) {
    if (player === computer) return "draw";
    return beats[player] === computer ? "player" : "computer";
}

function applyResult(result) {
    if (result === "draw") {
        outcomeEl.textContent = "It's a draw!";
        outcomeEl.className = "outcome draw";
    } else if (result === "player") {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        outcomeEl.textContent = "You win this round! 🎉";
        outcomeEl.className = "outcome win";
    } else {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        outcomeEl.textContent = "Computer wins this round.";
        outcomeEl.className = "outcome lose";
    }
    // small animation highlight on winner's score
    highlightWinner(result);
}

function highlightWinner(result) {
    const pNode = playerScoreEl;
    const cNode = computerScoreEl;
    if (result === "player") flash(pNode);
    else if (result === "computer") flash(cNode);
    else {
        flash(pNode);
        flash(cNode);
    }
}

function flash(el) {
    el.style.transform = "scale(1.14)";
    setTimeout(() => el.style.transform = "", 140);
}

function resetRound() {
    playerChoiceEl.textContent = "—";
    computerChoiceEl.textContent = "—";
    outcomeEl.textContent = "Make your move!";
    outcomeEl.className = "outcome";
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    resetRound();
}