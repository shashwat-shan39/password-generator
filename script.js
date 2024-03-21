const charAmountRange = document.getElementById('charAmountRange');
const charAmountNum = document.getElementById('charAmountNum');
const form = document.getElementById('passwordGeneratorForm');
const includeUppercase = document.getElementById('includeUppercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const passwordDisplay = document.getElementById('passwordDisplay');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58,64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));

charAmountNum.addEventListener('input', syncCharAmount);
charAmountRange.addEventListener('input', syncCharAmount);

form.addEventListener('submit', e => {
    e.preventDefault();
    const size = charAmountNum.value;
    const incUpper = includeUppercase.checked;
    const incSymbols = includeSymbols.checked;
    const incNumbers = includeNumbers.checked;
    const password = generatePassword(size, incUpper , incNumbers, incSymbols);

    passwordDisplay.innerText = password;
});

function generatePassword(charAmount, includeUppercase, includeNumbers, includeSymbols){
    let charCodes = LOWERCASE_CHAR_CODES;
    if(includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if(includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if(includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    
    const password = [];
    for(let i = 0; i < charAmount; i++){
        const char = charCodes[Math.floor(Math.random()*charCodes.length)];
        password.push(String.fromCharCode(char));
    }
    return password.join('');
}

function arrayFromLowToHigh(low, high){
    const array = [];
    for(let i=low;i<=high;i++){
        array.push(i);
    }
    return array;
}

function syncCharAmount(e){
    const value = e.target.value;
    charAmountNum.value = value;
    charAmountRange.value = value;
}
