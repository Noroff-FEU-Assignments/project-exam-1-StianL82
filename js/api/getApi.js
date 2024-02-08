export const host = "https://squareeyes.stianlilleng.no";
export const endpoint = "/wp-json/wp/v2/posts";
export const apiUrl = host + endpoint;
export const apiUrlAll = apiUrl + "?per_page=100";

export async function fetchApiCall(page = 1, perPage = 100, params = '', sortOption = '') {
    let url = `${apiUrl}?page=${page}&per_page=${perPage}${params}`;

    // Sort by sortOption
    switch (sortOption) {
        case 'oldest':
            url += '&order=asc&orderby=date';
            break;
        case 'alpha-asc':
            url += '&order=asc&orderby=title';
            break;
        case 'alpha-desc':
            url += '&order=desc&orderby=title';
            break;
        default:
            break;
    }
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const posts = await response.json();

        return posts;
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        throw error;
    }
}

export async function fetchSingleBlogPost(postId) {
    try {
        const url = `${host}/wp-json/wp/v2/posts/${postId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const post = await response.json();
        return post;
    } catch (error) {
        console.error("Error fetching single blog post from the API:", error);
        throw error;
    }
}