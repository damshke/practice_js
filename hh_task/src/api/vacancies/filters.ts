import { FILTERS_URL, FILTERS_KEY } from '@scripts/const';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '..';

export function useFilters() {
    return useQuery({
        queryKey: [FILTERS_KEY],
        queryFn: () => getMethod(FILTERS_URL),
    });
}
