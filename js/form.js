
const correctClassName = "correct";
const erroneousClassName = "erroneous";

/**
 * 
 * @param {HTMLDivElement} inputContainer 
 */
function setupInput(inputContainer) {
    /** @type {HTMLInputElement} */
    const input = inputContainer.querySelector(".labeled-field__field");

    /** @type {HTMLSpanElement} */
    const errorSpan = inputContainer.querySelector("span.labeled-field__indicator");

    const checkErroneousValue = () => {
        if (!input.checkValidity()) {
            errorSpan.innerText = input.validationMessage;
            inputContainer.classList.add(erroneousClassName);
            inputContainer.classList.remove(correctClassName);
        }
    };

    const checkCorrectOrBlankValue = () => {
        if (input.checkValidity()) {
            errorSpan.innerText = "";
            inputContainer.classList.add(correctClassName);
            inputContainer.classList.remove(erroneousClassName);
        }
    
        if (input.value == "") {
            inputContainer.classList.remove(correctClassName);
            inputContainer.classList.remove(erroneousClassName);
        }
    };

    input.addEventListener("focusout", checkErroneousValue);
    input.addEventListener("input", checkCorrectOrBlankValue);

    checkErroneousValue();
    checkCorrectOrBlankValue();
}

// const inputNames = [ "name", "period", "career", "group", "year" ];
// inputNames.forEach(name => {
//     const inputId = `${name}Input`;

//     /** @type {HTMLInputElement} */
//     const input = document.getElementById(inputId);

//     setupInput(input.parentNode);
// });

/**
 * 
 * @param {string[]} inputList 
 */
function setupInputs(inputList) {
    inputList.forEach(name => {
        const id = `${name}Input`;
        const input = document.getElementById(id);
        setupInput(input.parentNode);
    });
}
