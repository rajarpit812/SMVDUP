// GitHub repository details
const repoOwner = 'rajarpit812';
const repoName = 'GCP';
const branch = 'main';

// Fetch the repository contents from GitHub
async function fetchRepoContents() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents?ref=${branch}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch repository contents:', error);
    }
}

// Create list items for the files in the repository
async function populateProgramList() {
    const programList = document.getElementById('program-list');
    const repoContents = await fetchRepoContents();

    if (!repoContents) return;

    repoContents.forEach(file => {
        if (file.type === 'file' && file.name.endsWith('.html')) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = file.download_url;
            link.textContent = file.name.replace('.html', '');
            listItem.appendChild(link);
            programList.appendChild(listItem);
        }
    });
}

// Populate the program list on page load
window.onload = populateProgramList;
