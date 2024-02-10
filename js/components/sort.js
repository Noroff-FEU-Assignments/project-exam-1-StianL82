export let currentSortOption = 'latest'; 

export function SortFunctionality(sortOptionsSelector, postsContainerSelector, loadBlogPostsCallback) {
    const sortOptions = document.querySelector(sortOptionsSelector);
    const sortTextElement = document.querySelector(".sort-text");

    const savedSortOption = sessionStorage.getItem('currentSortOption');
    if (savedSortOption && sortOptions) {
        currentSortOption = savedSortOption;
        sortOptions.value = savedSortOption;

        const selectedOptionText = sortOptions.options[sortOptions.selectedIndex].text;
        if (sortTextElement) {
            sortTextElement.textContent = selectedOptionText;
        }
    }

    if (sortOptions) {
    sortOptions.addEventListener("change", () => handleSortChange(sortOptions, postsContainerSelector, loadBlogPostsCallback));
    }
}

function handleSortChange(sortOptions, postsContainerSelector, loadBlogPostsCallback) {
    currentSortOption = sortOptions.value;
    sessionStorage.setItem('currentSortOption', currentSortOption);

    const sortTextElement = document.querySelector(".sort-text");
    if (sortTextElement) {
        const selectedOptionText = sortOptions.options[sortOptions.selectedIndex].text;
        sortTextElement.textContent = selectedOptionText;
    }

    const postsContainer = document.querySelector(postsContainerSelector);
    if (!postsContainer) {
        console.error('postsContainer is null. Cannot update posts.');
        return; // Avslutter funksjonen tidlig hvis postsContainer er null
    }
    postsContainer.innerHTML = '';
    loadBlogPostsCallback(); // Forsikre deg om at denne funksjonen også håndterer null-sjekker eller re-initialiserer postsContainer korrekt.
}


export function sortPosts(posts) {
    return posts.sort((a, b) => {
        switch (currentSortOption) {
            case 'latest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'alpha-asc':
                return a.title.rendered.localeCompare(b.title.rendered, 'nb');
            case 'alpha-desc':
                return b.title.rendered.localeCompare(a.title.rendered, 'nb');
            default:
                return 0;
        }
    });
}


