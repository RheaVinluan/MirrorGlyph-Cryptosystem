// Number → Symbol
const numToSymbol = {
    "0": "®", "1": "©", "2": "™", "3": "§", "4": "¶",
    "5": "¥", "6": "£", "7": "•", "8": "…", "9": "∆"
};

const symbolToNum = Object.fromEntries(
    Object.entries(numToSymbol).map(([k, v]) => [v, k])
);

// Letter → Symbol
const letterToSymbol = {
    "A": "!", "B": "@", "C": "#", "D": "$", "E": "%", "F": "^",
    "G": "&", "H": "*", "I": "~", "J": "?", "K": "/", "L": "+",
    "M": "=", "N": "<", "O": ">", "P": "|", "Q": ":", "R": ";",
    "S": ",", "T": ".", "U": "_", "V": "-", "W": "`", "X": "(",
    "Y": ")", "Z": "["
};

const symbolToLetter = Object.fromEntries(
    Object.entries(letterToSymbol).map(([k, v]) => [v, k])
);

// ------------------ ENCRYPT (SYMBOLIZE → REVERSE) ------------------
function encrypt(text) {
    let symbols = "";

    for (let ch of text) {
        if (/[A-Za-z]/.test(ch)) {
            symbols += letterToSymbol[ch.toUpperCase()];
        }
        else if (/[0-9]/.test(ch)) {
            symbols += numToSymbol[ch];
        }
        else {
            symbols += ch;
        }
    }

    // Final Step: Reverse entire symbol string
    return [...symbols].reverse().join("");
}

// ------------------ DECRYPT (REVERSE → DESYMBOLIZE) ------------------
function decrypt(text) {
    let reversed = [...text].reverse().join("");
    let output = "";

    for (let ch of reversed) {

        // Number symbol → number
        if (symbolToNum[ch]) {
            output += symbolToNum[ch];
        }

        // Letter symbol → letter
        else if (symbolToLetter[ch]) {
            output += symbolToLetter[ch];
        }

        else {
            output += ch;
        }
    }

    return output;
}

// BUTTONS
const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const copyBtn = document.getElementById("copyBtn");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");


encryptBtn.onclick = () => {
    outputText.value = encrypt(inputText.value);
};

decryptBtn.onclick = () => {
    outputText.value = decrypt(inputText.value);
};

copyBtn.onclick = () => {
    const text = outputText.value;

    // Modern method
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
    } 
};

