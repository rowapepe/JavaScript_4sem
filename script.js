window.onload = function(){
    let leftNumber = '';
    let rightNumber = '';
    let expressionResult = '';
    let selectedOperation = null;

    const outputElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function resetCalculator() {
        leftNumber = '';
        rightNumber = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (!Number.isFinite(Number(value))) {
                leftNumber = '';
            }
            if ((digit !== '.') || (digit === '.' && !leftNumber.includes(digit))) {
                leftNumber += digit;
            }
            outputElement.innerHTML = leftNumber;
        }
        else {
            if (!Number.isFinite(Number(value))) {
                rightNumber = '';
            }
            if ((digit !== '.') || (digit === '.' && !rightNumber.includes(digit))) {
                rightNumber += digit;
                outputElement.innerHTML = rightNumber;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById('btn_op_mult').onclick = function() {
        if (leftNumber === '') return;
        selectedOperation = 'x';
    };

    document.getElementById('btn_op_plus').onclick = function() {
        if (leftNumber === '') return;
        selectedOperation = '+';
    };

    document.getElementById('btn_op_minus').onclick = function() {
        if (leftNumber === '') return;
        selectedOperation = '-';
    };

    document.getElementById('btn_op_div').onclick = function() {
        if (leftNumber === '') return;
        selectedOperation = '/';
    };

    document.getElementById('btn_op_sign').onclick = function() {
        if (selectedOperation && rightNumber !== '') {
            const nextValue = Number(rightNumber) * -1;
            rightNumber = nextValue.toString();
            outputElement.innerHTML = rightNumber;
            return;
        }

        if (leftNumber !== '') {
            const nextValue = Number(leftNumber) * -1;
            leftNumber = nextValue.toString();
            outputElement.innerHTML = leftNumber;
        }
    };

    document.getElementById('btn_op_percent').onclick = function() {
        if (selectedOperation && rightNumber !== '') {
            const nextValue = Number(rightNumber) / 100;
            rightNumber = nextValue.toString();
            outputElement.innerHTML = rightNumber;
            return;
        }

        if (leftNumber !== '') {
            const nextValue = Number(leftNumber) / 100;
            leftNumber = nextValue.toString();
            outputElement.innerHTML = leftNumber;
        }
    };

    document.getElementById('btn_op_clear').onclick = function() {
        resetCalculator();
    };

    document.getElementById('btn_op_equal').onclick = function() {
        if (leftNumber === '' || rightNumber === '' || !selectedOperation) {
            return;
        }

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+leftNumber) * (+rightNumber);
                break;
            case '+':
                expressionResult = (+leftNumber) + (+rightNumber);
                break;
            case '-':
                expressionResult = (+leftNumber) - (+rightNumber);
                break;
            case '/':
                expressionResult = (+leftNumber) / (+rightNumber);
                break;
            default:
                break;
        }

        leftNumber = expressionResult.toString();
        rightNumber = '';
        selectedOperation = null;

        outputElement.innerHTML = leftNumber;
    };
};
