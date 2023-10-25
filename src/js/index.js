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



function fillingCard(data) {

    const vacancyCardContainer = document.querySelector(".vacancy-card-container");

    data.items.forEach(item => {

        // create vacancy card div
        const vacancyCard = document.createElement('div');
        vacancyCard.classList.add('vacancy-card');

        //create vacancy card head

        const vacancyCardHead = document.createElement('div');
        vacancyCardHead.classList.add('vacancy-card__head');

        // create vacancy card info

        const vacancyCardInfo = document.createElement('div');
        vacancyCardInfo.classList.add('vacancy-card__info');

        // vacancy card info <--- vacancy card left

        const vacancyCardLeft = document.createElement('div');
        vacancyCardLeft.classList.add('vacancy-card__left');

        // vacancy card left <--- vacancy card title

        const vacancyCardTitle = document.createElement('h4');
        vacancyCardTitle.innerHTML = item.name;
        vacancyCardTitle.classList.add('vacancy-card__title');

        // vacancy card left <--- vacancy card log

        const vacancyCardImg = document.createElement('img');
        vacancyCardImg.src = logoChecking(item);
        vacancyCardImg.classList.add('vacancy-card__logo');

        // append child for vacancy card left
        vacancyCardLeft.appendChild(vacancyCardTitle);
        vacancyCardLeft.appendChild(vacancyCardImg);

        // vacancy card info <--- vacancy card button

        const vacancyCardButton = document.createElement('button');
        vacancyCardButton.innerHTML = 'Respond';
        vacancyCardButton.classList.add('vacancy-card__respond-button', 'button');

        // append child for vacancy card info
        vacancyCardInfo.appendChild(vacancyCardLeft);
        vacancyCardInfo.appendChild(vacancyCardButton);

        // vacancy card head <--- vacancy card about

        const vacancyCardAbout = document.createElement('div');
        vacancyCardAbout.classList.add('vacancy-card__about');

        // common <p>

        const paragraphForm = document.createElement('p');
        const paragraphCompany = document.createElement('p');
        const paragraphExp = document.createElement('p');
        const paragraphAddress = document.createElement('p');
        const paragraphSalary = document.createElement('p');

        vacancyCardAbout.appendChild(paragraphForm);

        const vacancyForm = document.createElement('span');
        vacancyForm.classList.add('vacancy-card__option');
        vacancyForm.innerHTML = 'Form';

        const vacancyFormText = document.createElement('span');
        vacancyFormText.classList.add('vacancy-card__text');
        vacancyFormText.innerHTML = item.employment.name;

        paragraphForm.appendChild(vacancyForm);
        paragraphForm.appendChild(vacancyFormText);

        //

        vacancyCardAbout.appendChild(paragraphCompany);

        const vacancyCompany = document.createElement('span');
        vacancyCompany.classList.add('vacancy-card__option');
        vacancyCompany.innerHTML = 'Company';

        const vacancyCompanyText = document.createElement('span');
        vacancyCompanyText.classList.add('vacancy-card__text');
        vacancyCompanyText.innerHTML = item.employer.name;

        paragraphCompany.appendChild(vacancyCompany);
        paragraphCompany.appendChild(vacancyCompanyText);

        // 

        vacancyCardAbout.appendChild(paragraphExp);

        const vacancyExperience = document.createElement('span');
        vacancyExperience.classList.add('vacancy-card__option');
        vacancyExperience.innerHTML = 'Experience';

        const vacancyExperienceText = document.createElement('span');
        vacancyExperienceText.classList.add('vacancy-card__text');
        vacancyExperienceText.innerHTML = item.experience.name;

        paragraphExp.appendChild(vacancyExperience);
        paragraphExp.appendChild(vacancyExperienceText);

        // 

        vacancyCardAbout.appendChild(paragraphAddress);

        const vacancyAddress = document.createElement('span');
        vacancyAddress.classList.add('vacancy-card__option');
        vacancyAddress.innerHTML = 'Address';

        const vacancyAddressText = document.createElement('span');
        vacancyAddressText.classList.add('vacancy-card__text');
        vacancyAddressText.innerHTML = addressChecking(item);

        paragraphAddress.appendChild(vacancyAddress);
        paragraphAddress.appendChild(vacancyAddressText);

        //

        vacancyCardAbout.appendChild(paragraphSalary);

        const vacancySalary = document.createElement('span');
        vacancySalary.classList.add('vacancy-card__option');
        vacancySalary.innerHTML = 'Salary';

        const vacancySalaryText = document.createElement('span');
        vacancySalaryText.classList.add('vacancy-card__text');
        vacancySalaryText.innerHTML = salaryChecking(item);

        paragraphSalary.appendChild(vacancySalary);
        paragraphSalary.appendChild(vacancySalaryText);

        vacancyCardHead.appendChild(vacancyCardInfo);
        vacancyCardHead.appendChild(vacancyCardAbout);

        // added description

        const vacancyCardDescription = document.createElement('div');
        vacancyCardDescription.classList.add('vacancy-card__description');

        const vacancyCardContent = document.createElement('div');
        vacancyCardContent.classList.add('vacancy-card__description-content');
        fetchDescription(item, vacancyCardContent);

        const showMoreButton = document.createElement('button');
        showMoreButton.classList.add('vacancy-card__expand-button');
        showMoreButton.innerHTML = 'More details';

        vacancyCardDescription.appendChild(vacancyCardContent);
        vacancyCardDescription.appendChild(showMoreButton);

        vacancyCard.appendChild(vacancyCardHead);
        vacancyCard.appendChild(vacancyCardDescription);
        vacancyCardContainer.appendChild(vacancyCard);

        return vacancyCardContainer;
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