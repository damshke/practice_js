import { FILTERS_URL, FILTERS_KEY } from '@api/const';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '..';

export default function useFilters() {
    return useQuery({
        queryKey: [FILTERS_KEY],
        queryFn: () => getMethod(FILTERS_URL),
    });
}
