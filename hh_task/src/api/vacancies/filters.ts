import { FILTERS_URL, FILTERS_KEY } from '@scripts/const';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '..';
import { Filter } from './types/filter';

export function useFilters() {
    return useQuery<Filter, Error>({
        queryKey: [FILTERS_KEY],
        queryFn: () => getMethod(FILTERS_URL),
    });
}
