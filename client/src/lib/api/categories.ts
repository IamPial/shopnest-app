const baseUrl = process.env.NEXT_PUBLIC_SERVER_API ? process.env.NEXT_PUBLIC_SERVER_API.replace(/\/+$/, '') : '';

const getCategories = async () => {
    try {
        if (!baseUrl) return [];
        const response = await fetch(`${baseUrl}/categories`, {
            cache: 'no-store'
        });
        if (!response.ok) {
            console.error(`Categories fetch failed with status: ${response.status}`);
            return [];
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data?.data || []);
    } catch (error) {
        console.error("Error in getCategories:", error);
        return [];
    }
}

export default getCategories;
