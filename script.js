<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C Programming Examples</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            text-align: left;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 15px 0;
        }
        a {
            text-decoration: none;
            color: #007BFF;
            font-size: 18px;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>C Programming Examples</h1>
    <h2>Choose a Program:</h2>
    <ul id="program-list">
        <!-- Program list will be populated here -->
    </ul>
    <script>
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
    </script>
</body>
</html>
