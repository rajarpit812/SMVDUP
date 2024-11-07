// GitHub repository details
const repoOwner = 'rajarpit812';
const repoName = 'GCP';
const branch = 'main';

// Fetch the repository contents from GitHub
async function fetchRepoContents() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents?ref=${branch}`;
    console.log(`Fetching contents from: ${apiUrl}`); // Log the API URL
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Repository contents:', data); // Log the fetched data
        return data;
    } catch (error) {
        console.error('Failed to fetch repository contents:', error);
    }
}

// Create list items for the files in the repository
async function populateProgramList() {
    const programList = document.getElementById('program-list');
    const repoContents = await fetchRepoContents();

    console.log('Fetched repo contents:', repoContents); // Log the repo contents

    if (!repoContents) return;

    repoContents.forEach(file => {
        if (file.type === 'file' && file.name.endsWith('.c')) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${file.path}`;
            link.textContent = file.name.replace('.c', '');
            listItem.appendChild(link);
            programList.appendChild(listItem);
        }
    });
}

// Populate the program list on page load
window.onload = populateProgramList;
