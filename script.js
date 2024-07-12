document.addEventListener('DOMContentLoaded', (event) => {
    const repoOwner = 'nasbox';
    const repoName = 'nasbox.github.io';
    const branchName = 'FileRepo';

    const folderListElement = document.getElementById('folderList');
    const fileListElement = document.getElementById('fileList');

    // Track paths of folders already processed
    const processedFolders = new Set();

    function fetchAndDisplayContents(path = '', parentElement) {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}?ref=${branchName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Sort files and folders by name
                data.sort((a, b) => a.name.localeCompare(b.name));

                data.forEach((item, index) => {
                    if (item.type === 'dir') {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = `${item.name}`;
                        link.href = '#';
                        listItem.classList.add('folder');
                        listItem.appendChild(link);

                        const newNestedList = document.createElement('ul');
                        newNestedList.classList.add('nested');
                        listItem.appendChild(newNestedList);

                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (newNestedList.innerHTML === '') {
                                fetchAndDisplayContents(item.path, newNestedList);
                            }
                            newNestedList.style.display = newNestedList.style.display === 'none' ? 'block' : 'none';
                        });

                        parentElement.appendChild(listItem);
                    } else if (item.type === 'file') {
                        // Check if file is in the root of the repository
                        if (path === '') {
                            const listItem = document.createElement('li');
                            const link = document.createElement('a');
                            link.textContent = `${item.name}`;
                            link.href = item.html_url;
                            listItem.classList.add('file');
                            listItem.appendChild(link);
                            fileListElement.appendChild(listItem);
                        } else {
                            // Files within folders are appended to the folder's nested list
                            const listItem = document.createElement('li');
                            const link = document.createElement('a');
                            link.textContent = `${item.name}`;
                            link.href = item.html_url;
                            listItem.classList.add('file');
                            listItem.appendChild(link);
                            parentElement.appendChild(listItem);
                        }
                    }
                });

                // Mark the current folder path as processed
                processedFolders.add(path);
            })
            .catch(error => {
                console.error('Error fetching repository contents:', error);
                parentElement.textContent = 'Error fetching repository contents. Please try again later.';
            });
    }

    fetchAndDisplayContents('', folderListElement); // Start fetching from the root path
});
