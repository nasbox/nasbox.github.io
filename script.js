document.addEventListener('DOMContentLoaded', (event) => {
    const repoOwner = 'pappykojo';
    const repoName = 'pappykojo.github.io';
    const branchName = 'main';

    const fileListElement = document.getElementById('fileList');

    function fetchAndDisplayContents(path = '') {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branchName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = item.html_url;
                    link.textContent = item.name;
                    listItem.appendChild(link);
                    fileListElement.appendChild(listItem);

                    if (item.type === 'dir') {
                        const nestedList = document.createElement('ul');
                        listItem.appendChild(nestedList);
                        fetchAndDisplayContents(item.path);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching repository contents:', error);
                fileListElement.textContent = 'Error fetching repository contents. Please try again later.';
            });
    }

    fetchAndDisplayContents();
});
