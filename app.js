
const buttons = document.querySelectorAll('.button');
const screen = document.getElementById('value');

let currentValue = '';
let operator = '';
let savedValue = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (resultDisplayed && (!isNaN(value) || value === '.')) {
      currentValue = '';
      resultDisplayed = false;
    }

    if (!isNaN(value) || value === '.') {
      currentValue += value;
    }
    else if (value === '+' || value === '-' || value === '/' || value === '*' || value === 'X' || value === 'V') {
      if (currentValue === '' && value === '-') {
        currentValue = '-';
      } else if (value === 'V') {
        currentValue = Math.sqrt(parseFloat(currentValue)).toString();
      }
      else {
        if (savedValue !== '' && currentValue !== '') {
          savedValue = calculate(savedValue, currentValue, operator);
          currentValue = '';
        } else if (currentValue !== '') {
          savedValue = currentValue;
          currentValue = '';
        }
        operator = value;
      }
    }
    else if (value === '=') {
      if (operator !== '' && currentValue !== '') {
        currentValue = calculate(savedValue, currentValue, operator);
        operator = '';
        savedValue = '';
        resultDisplayed = true;
      }
    }
    else if (value === 'C') {
      currentValue = '';
      savedValue = '';
      operator = '';
    }

    if (currentValue.length > 17) {
      currentValue = currentValue.slice(0, 17);
    }

    if (savedValue.length > 17) {
      savedValue = savedValue.slice(0, 17);
    }


    screen.textContent = currentValue || savedValue || '0';
  });
});

// Fonction de calcul
function calculate(value1, value2, operator) {
  value1 = parseFloat(value1);
  value2 = parseFloat(value2);

  switch (operator) {
    case '+':
      return (value1 + value2).toString();
    case '-':
      return (value1 - value2).toString();
    case '*':
      return (value1 * value2).toString();
    case '/':
      if (value2 === 0) {
        return 'ERROR';
      }
      return (value1 / value2).toString();
    case 'X':
      return (value1 ** value2).toString();
    default:
      return value2;
  }
}


