/* eslint-disable */
const inputElements = document.querySelectorAll('.card__input');
const submitButton = document.querySelector('.card__button');

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};

const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isDateValid = (dayElement, monthElement, yearElement) => {
  const isValid = [false, false, false];

  if (!validateDay(dayElement.value)) {
    dayElement.classList.add('card__input--error');
  } else {
    isValid[0] = true;
    dayElement.classList.remove('card__input--error');
  }

  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add('card__input--error');
  } else {
    isValid[1] = true;
    monthElement.classList.remove('card__input--error');
  }

  if (!validateYear(yearElement.value)) {
    yearElement.classList.add('card__input--error');
  } else {
    isValid[2] = true;
    yearElement.classList.remove('card__input--error');
  }

  return isValid.every((item) => item === true);
};

const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let yearDiff = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();
  let dayDiff = today.getDate() - birthDate.getDate();
  console.log(yearDiff,monthDiff,dayDiff);

  if (monthDiff < 0) {
    yearDiff -= 1;
    monthDiff += 12;
  } else if (monthDiff === 0 && dayDiff < 0) {
    yearDiff -= 1;
    monthDiff += 11;
    dayDiff += 30;
  }
  if (dayDiff < 0) {
    monthDiff -= 1;
    dayDiff += 30;
  }
  return [yearDiff, monthDiff, dayDiff];
};

const onClickHandler = () => {
  const dayElement = document.querySelector('.card__input[name="day"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const yearElement = document.querySelector('.card__input[name="year"]');
  const resultElements = document.querySelectorAll('.card__resultValue');

  if (!isDateValid(dayElement, monthElement, yearElement)) {
    resultElements.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.textContent = '--';
    });
    return;
  }
  const ageArray = calculateAge(yearElement.value, monthElement.value, dayElement.value);
  resultElements[0].textContent = ageArray[0];
  resultElements[1].textContent = ageArray[1];
  resultElements[2].textContent = ageArray[2];
};
// run the function when the Enter key is clicked
inputElements.forEach((item) => {
  item.addEventListener('keydown', (e) => {
    // eslint-disable-next-line no-unused-expressions
    e.key === 'Enter' && onClickHandler();
  });
});

submitButton.addEventListener('click', onClickHandler);
