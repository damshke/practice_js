import { useQuery } from '@tanstack/react-query';

const getDescription = async (id: string, url: string) => {
    const data = await fetch(url);
    const response = await data.json();
    return response;
};

export default function useDescription(id: string, url: string) {
    return useQuery({
        queryKey: [id, url],
        queryFn: () => getDescription(id, url),
    });
}
