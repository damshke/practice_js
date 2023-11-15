import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://api.hh.ru/vacancies';
const VACANCIES_KEY = 'vacancies';

const getVacancies = async () => {
    const data = await fetch(API_URL);
    const response = await data.json();
    return response;
};

export default function useVacancies() {
    return useQuery(VACANCIES_KEY, getVacancies());
}
