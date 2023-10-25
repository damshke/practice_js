// TO DO: 
// 1. фильтрация 
// 3. разобраться, почему стили не работают на данных
// 4. сделать проверки наличия необязательных полей
// 5. сделать валидацию формы


const PER_PAGE = 5;

let description;

let currentPage = 0;

async function fetchData(page, per_page) {

    const search = {
        page: String(page),
        per_page: String(per_page)
    }

    const params = new URLSearchParams(search).toString();

    const response = await fetch(`https://api.hh.ru/vacancies?${params}`);
    const data = await response.json();
    return data;
}

async function fetchFiltersData() {
    const response = await fetch('https://api.hh.ru/dictionaries');
    const data = await response.json();

    return data.employment, data.experience;
}

async function fetchDescription(item, displayItem) {
    const response = await fetch(item.url);
    const data = await response.json();

    console.log(data.description);

    displayItem.innerHTML = data.description;
}

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
        vacancyCardImg.src = item.employer.logo_urls; //сделать проверку на наличие картинки
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

        const paragraph = document.createElement('p');

        vacancyCardAbout.appendChild(paragraph);

        const vacancyForm = document.createElement('span');
        vacancyForm.classList.add('vacancy-card__option');
        vacancyForm.innerHTML = 'Form';

        const vacancyFormText = document.createElement('span');
        vacancyFormText.classList.add('vacancy-card__text');
        vacancyFormText.innerHTML = item.employment.name;

        paragraph.appendChild(vacancyForm);
        paragraph.appendChild(vacancyFormText);

        //

        vacancyCardAbout.appendChild(paragraph);

        const vacancyCompany = document.createElement('span');
        vacancyCompany.classList.add('vacancy-card__option');
        vacancyCompany.innerHTML = 'Company';

        const vacancyCompanyText = document.createElement('span');
        vacancyCompanyText.classList.add('vacancy-card__text');
        vacancyCompanyText.innerHTML = item.employer.name;

        paragraph.appendChild(vacancyCompany);
        paragraph.appendChild(vacancyCompanyText);

        // 

        vacancyCardAbout.appendChild(paragraph);

        const vacancyAddress = document.createElement('span');
        vacancyAddress.classList.add('vacancy-card__option');
        vacancyAddress.innerHTML = 'Address';

        const vacancyAddressText = document.createElement('span');
        vacancyAddressText.classList.add('vacancy-card__text');
        vacancyAddressText.innerHTML = item.area.name; // проверку на адрес

        paragraph.appendChild(vacancyAddress);
        paragraph.appendChild(vacancyAddressText);

        //

        vacancyCardAbout.appendChild(paragraph);

        const vacancySalary = document.createElement('span');
        vacancySalary.classList.add('vacancy-card__option');
        vacancySalary.innerHTML = 'Salary';

        const vacancySalaryText = document.createElement('span');
        vacancySalaryText.classList.add('vacancy-card__text');
        vacancySalaryText.innerHTML = `from ${item.salary.from} to ${item.salary.to} ${item.salary.currency}`; // проверку на поля зп

        paragraph.appendChild(vacancySalary);
        paragraph.appendChild(vacancySalaryText);

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

async function getVacancyData(page, per_page) {

    const data = await fetchData(page, per_page);

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

async function loadMoreData() {
    const next_page = currentPage + 1;
    await getVacancyData(next_page, PER_PAGE);
}

window.addEventListener('load', async function () {
    await getVacancyData(0, 5);
    await fetchFiltersData();
});