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



async function getVacancyData(page, per_page) {

    const data = await fetchData(page, per_page);

    if (!data) {
        return;
    }

    data.items.forEach(item => {
        // output =
        //     <div class="vacancy-card__head">
        //         <div class="vacancy-card__info">
        //             <div class="vacancy-card__left">
        //                 <h4 class="vacancy-card__title">${item.name}</h4>
        //                 <img class="vacancy-card__logo" src={item.employer.logo_urls}></img>
        //             </div>
        //             <button class="vacancy-card__respond-button button">Respond</button>
        //         </div>
        //         <div class="vacancy-card__about">
        //             <p>
        //                 <span class="vacancy-card__option">Form</span>
        //                 <span class="vacancy-card__text">${item.employment.name}</span>
        //             </p>
        //             <p>
        //                 <span class="vacancy-card__option">Company</span>
        //                 <span class="vacancy-card__text">${item.employer.name}</span>
        //             </p>
        //             <p>
        //                 <span class="vacancy-card__option">Experience</span>
        //                 <span class="vacancy-card__text">00 years</span>
        //             </p>
        //             <p>
        //                 <span class="vacancy-card__option">Address</span>
        //                 <span class="vacancy-card__text">Address</span>
        //             </p>
        //             <p>
        //                 <span class="vacancy-card__option">Salary</span>
        //                 <span class="vacancy-card__text">from to</span>
        //             </p>
        //         </div>
        //         <div class="vacancy-card__description">
        //             <div class="vacancy-card__description-content">
        //                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        //                 totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
        //                 dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
        //                 sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
        //                 est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius
        //                 modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
        //                 veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
        //                 commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
        //                 molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

        //             </div>
        //             <button class="vacancy-card__expand-button">More details</button>
        //         </div>
        //     </div>

        // document.querySelector('.vacancy-card').innerHTML += output;
    });


}

window.addEventListener('load', getVacancyData(1, 5));
window.addEventListener('load', fetchFiltersData());