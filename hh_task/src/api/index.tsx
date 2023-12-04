export const getMethod = async (url: string) => {
    const data = await fetch(`${url}`);
    const response = await data.json();
    return response;
};
