import { FILTERS_URL, FILTERS_KEY } from '@api/const';
import { useQuery } from '@tanstack/react-query';

const getFilters = async () => {
    const data = await fetch(FILTERS_URL);
    const response = await data.json();
    return response;
};

export default function useFilters() {
    return useQuery({
        queryKey: [FILTERS_KEY],
        queryFn: getFilters,
    });
}
