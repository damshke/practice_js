import { PER_PAGE } from './utils/constant.js'
import { emailRegex, phoneRegex } from './utils/regex.js'

let visibility_flag = 0;

let currentPage = 0;

async function fetchData(page, per_page, form, experience) {

    const search = {
        page: String(page),
        per_page: String(per_page),
    }

    if (form) search.employment = form;

    if (experience) search.experience = experience;

    const params = new URLSearchParams(search).toString();

    const response = await fetch(`https://api.hh.ru/vacancies?${params}`);
    const data = await response.json();
    return data;
}

async function fetchFiltersData() {
    const response = await fetch('https://api.hh.ru/dictionaries');
    const data = await response.json();

    const employmentSelect = document.querySelector('.filters-section__filter:nth-of-type(1) select');
    const experienceSelect = document.querySelector('.filters-section__filter:nth-of-type(2) select');

    data.employment.forEach(employment => {
        const option = document.createElement('option');
        option.text = employment.name;
        option.value = employment.id;
        employmentSelect.add(option);
    });

    data.experience.forEach(exp => {
        const option = document.createElement('option');
        option.text = exp.name;
        option.value = exp.id;
        experienceSelect.add(option);
    });
}

async function getVacancyData(page, per_page, form, experience) {

    const data = await fetchData(page, per_page, form, experience);

    if (!data || data.items.length === 0) {
        const loadMoreButton = document.querySelector('.show-more');
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
        return;
    }

    fillingCard(data);

    currentPage = page;
}

async function findVacancies() {
    const employmentSelect = document.querySelector('.filters-section__filter:nth-of-type(1) select');
    const experienceSelect = document.querySelector('.filters-section__filter:nth-of-type(2) select');

    if (employmentSelect.value === 'Not selected' && experienceSelect.value === 'Not selected') {
        return;
    }

    const vacancyCardContainer = document.querySelector(".vacancy-card-container");
    vacancyCardContainer.innerHTML = "";

    currentPage = 0;
    await getVacancyData(0, 5, employmentSelect.value, experienceSelect.value);
}

async function loadMoreData() {
    const next_page = currentPage + 1;
    const employmentSelect = document.querySelector('.filters-section__filter:nth-of-type(1) select');
    const experienceSelect = document.querySelector('.filters-section__filter:nth-of-type(2) select');

    if (employmentSelect.value === 'Not selected' && experienceSelect.value === 'Not selected') {
        await getVacancyData(next_page, 5);
    }
    await getVacancyData(next_page, PER_PAGE, employmentSelect.value, experienceSelect.value);
}

function changeVisibility() {
    if (visibility_flag === 0) {
        const showDetailsButton = document.querySelector('.vacancy-card__expand-button');
        showDetailsButton.innerHTML = '<img class="vacancy-card__icon" src="./img/chevronUp.svg" /> Less details';

        const contentSpace = document.querySelector('.vacancy-card__description-content');
        contentSpace.classList.remove('vacancy-card__description-content');
        contentSpace.classList.add('vacancy-card__description-content--expand');

        visibility_flag = 1;
    }
    else {
        const showDetailsButton = document.querySelector('.vacancy-card__expand-button');
        showDetailsButton.innerHTML = '<img class="vacancy-card__icon" src="./img/chevronDown.svg" /> More details';

        const contentSpace = document.querySelector('.vacancy-card__description-content--expand');
        contentSpace.classList.remove('vacancy-card__description-content--expand');
        contentSpace.classList.add('vacancy-card__description-content')

        visibility_flag = 0;
    }
}

window.addEventListener('load', async function () {
    await getVacancyData(0, PER_PAGE);
    await fetchFiltersData();

    const selectForm = document.querySelectorAll('.filters-section__filter select');
    const clearButton = document.querySelector('.header__clear-button');

    selectForm.forEach(select => {
        select.addEventListener('change', function () {
            if (select.value !== "") {
                clearButton.style.display = 'flex';
            } else {
                clearButton.style.display = 'none';
            }
        });
    });

    clearButton.addEventListener('click', async function () {
        selectForm.forEach(select => {
            select.value = '';
        });
        clearButton.style.display = 'none';
    });

    const submitButton = document.querySelector('.form-request__submit-button');
    submitButton.addEventListener('click', submitForm);
});


function fillingCard(data) {

    const vacancyCardContainer = document.querySelector(".vacancy-card-container");
    const vacancyCardTemplate = document.querySelector("template");

    data.items.forEach(item => {
        const vacancyCard = vacancyCardTemplate.content.cloneNode(true);

        vacancyCard.querySelector('.vacancy-card__title').innerHTML = item.name;
        vacancyCard.querySelector('p:nth-of-type(1) .vacancy-card__text').innerHTML = item.employment.name;
        vacancyCard.querySelector('p:nth-of-type(2) .vacancy-card__text').innerHTML = item.employer.name;
        vacancyCard.querySelector('p:nth-of-type(3) .vacancy-card__text').innerHTML = item.experience.name;
        vacancyCard.querySelector('p:nth-of-type(4) .vacancy-card__text').innerHTML = addressChecking(item);
        vacancyCard.querySelector('p:nth-of-type(5) .vacancy-card__text').innerHTML = salaryChecking(item);
        fetchDescription(item, vacancyCard.querySelector('.vacancy-card__description-content'));

        vacancyCardContainer.appendChild(vacancyCard);
    });
}

async function fetchDescription(item, displayItem) {
    const response = await fetch(item.url);
    const data = await response.json();

    displayItem.innerHTML = data.description;
}

function addressChecking(item) {
    if (item.address) {
        return item.address.raw;
    }
    if (item.area) {
        return item.area.name;
    }
    return '';
}

function salaryChecking(item) {
    const { salary } = item;

    if (!salary) return '';

    const { from, to, currency } = salary;
    const parts = [];

    if (from) parts.push(`from ${from}`);

    if (to) parts.push(`to ${to}`);

    if (currency) parts.push(currency);

    return parts.join(' ');
}

function logoChecking(item) { return item.employer && item.employer.logo_urls ? item.employer.logo_urls.original : '' }

// form validation

function submitForm() {
    const nameInput = document.querySelector('.form-request__initials');
    const emailInput = document.querySelector('.form-request__email');
    const phoneInput = document.querySelector('.form-request__phone');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === '') {
        alert('Please, enter your name');
        return;
    }

    if (email === '') {
        alert('Please, enter your email');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please, enter a valid email address');
        return;
    }

    if (phone === '') {
        alert('Please, enter your phone number');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
}

function validateEmail(email) {
    const re = emailRegex;
    return re.test(email);
}

function validatePhone(phone) {
    const re = phoneRegex;
    return re.test(phone);
}
