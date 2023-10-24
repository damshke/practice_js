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

function fillingCard() {

}

async function getVacancyData(page, per_page) {

    const data = await fetchData(page, per_page);

    if (!data) {
        return;
    }

    data.items.forEach(item => {
        const vacancyName = document.querySelector(".vacancy-card__title");
        const vacancyImg = document.querySelector(".vacancy-card__logo");
        const vacancyForm = document.querySelector(".vacancy-card__text");
        vacancyName.innerHTML = item.name;
        vacancyImg.src = item.employer.logo_urls;
        vacancyForm.innerHTML = item.employment.name;


    });



}

window.addEventListener('load', getVacancyData(1, 5));
window.addEventListener('load', fetchFiltersData());