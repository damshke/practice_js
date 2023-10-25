const PER_PAGE = 5;

let currentPage = 0;

async function fetchData(page, per_page, form, experience) {

    const search = {
        page: String(page),
        per_page: String(per_page)
    }

    if (form) {
        search.employment = form;
    }

    if (experience) {
        search.experience = experience;
    }

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

window.addEventListener('load', async function () {
    await getVacancyData(0, PER_PAGE);
    await fetchFiltersData();
});

// const selectForm = [];

// window.addEventListener('load', function () {
//     selectForm = document.querySelectorAll('.filters-section__filter select');
// });

// selectForm.forEach(item =>
//     item.addEventListener('change', function () {
//         const clearButton = document.querySelector('.header__clear-button');
//         if (item.value !== "") clearButton.style.display = 'flex';
//     }))

function fillingCard(data) {

    const vacancyCardContainer = document.querySelector(".vacancy-card-container");
    const vacancyCardTemplate = document.querySelector('template');

    data.items.forEach(item => {

        const vacancyCard = vacancyCardTemplate.content.cloneNode(true);

        vacancyCard.querySelector('.vacancy-card__title').innerHTML = item.name;

        // const text = {
        //     form: item.employment.name,
        //     company: item.employer.name,
        //     experience: item.experience.name,
        //     address: addressChecking(item),
        //     salary: salaryChecking(item),
        // }

        // vacancyCard.querySelectorAll('.vacancy-card__text').forEach(item => 
        //     item.textContent = text
        //     )

        fetchDescription(item, vacancyCard.querySelector('.vacancy-card__description-content'));

        vacancyCardContainer.append(item)
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

    if (!salary) {
        return '';
    }

    const { from, to, currency } = salary;
    const parts = [];

    if (from) {
        parts.push(`from ${from}`);
    }

    if (to) {
        parts.push(`to ${to}`);
    }

    if (currency) {
        parts.push(currency);
    }

    return parts.join(' ');
}

function logoChecking(item) {
    if (item.employer && item.employer.logo_urls) {
        return item.employer.logo_urls.original;
    }
    else {
        return '';
    }
}