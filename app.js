
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
    else if (value === '+' || value === '-' || value === '/' || value === '*' || value === '²' || value === 'V') {
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

// Pour utiliser les touches du clavier 

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    currentValue += key;
    screen.textContent = currentValue;
  }
  else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '=' || key === '²') {
    if (currentValue === '' && key === '-') {
      currentValue = '-';
    } else {
      if (savedValue !== '' && currentValue !== '') {
        savedValue = calculate(savedValue, currentValue, operator);
        currentValue = '';
      } else if (currentValue !== '') {
        savedValue = currentValue;
        currentValue = '';
      }
      operator = key;
    }
  }
  else if (key === 'c' || key === 'C' || key === 'Delete' || key === 'delete') {
    currentValue = '';
    savedValue = '';
    operator = '';
    screen.textContent = '0';
  }
  else if (key === 'v' || key === 'V') {
    currentValue = Math.sqrt(parseFloat(currentValue)).toString();
    screen.textContent = currentValue;
  }
  else if (key === 'Enter') {
    if (operator !== '' && currentValue !== '') {
      currentValue = calculate(savedValue, currentValue, operator);
      operator = '';
      savedValue = '';
      resultDisplayed = true;
      screen.textContent = currentValue;
    }
  }
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
        return 'error';
      }
      return (value1 / value2).toString();
    case '²':
      return (value1 ** value2).toString();
    default:
      return value2;
  }
}



