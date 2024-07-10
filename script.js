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
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.textContent = `${item.name}`;
                    listItem.appendChild(link);
                    

                    if (item.type === 'dir') {
                        listItem.classList.add('folder');
                        link.href = '#';
                        const newNestedList = document.createElement('ul');
                        newNestedList.classList.add('nested');
                        listItem.appendChild(newNestedList);

                        // Recursively fetch and display folder contents
                        fetchAndDisplayContents(item.path, newNestedList);
                        
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            newNestedList.style.display = newNestedList.style.display === 'none' ? 'block' : 'none';
                        });

                        parentElement.appendChild(listItem);
                    } else {
                        // Check if the file's path is not in processed folders
                        if (!isFileInProcessedFolder(item.path)) {
                            listItem.classList.add('file');
                            link.href = item.html_url;
                            fileListElement.appendChild(listItem);
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

    function isFileInProcessedFolder(filePath) {
        // Check if filePath starts with any processed folder path
        for (let folderPath of processedFolders) {
            if (filePath.startsWith(folderPath)) {
                return true;
            }
        }
        return false;
    }

    fetchAndDisplayContents('', folderListElement); // Start fetching from the root path

});
