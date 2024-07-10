
document.addEventListener('DOMContentLoaded', (event) => {
    const repoOwner = 'nasbox';
    const repoName = 'nasbox.github.io';
    const branchName = 'FileRepo';

    const fileListElement = document.getElementById('fileList');

    function fetchAndDisplayContents(path = '', parentElement = fileListElement) {
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
                    link.textContent = item.name;
                    listItem.appendChild(link);

                    if (item.type === 'dir') {
                        listItem.classList.add('folder');
                        link.href = '#';
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            const nestedList = listItem.querySelector('.nested');
                            if (nestedList) {
                                nestedList.style.display = nestedList.style.display === 'none' ? 'block' : 'none';
                            } else {
                                const newNestedList = document.createElement('ul');
                                newNestedList.classList.add('nested');
                                listItem.appendChild(newNestedList);
                                fetchAndDisplayContents(item.path, newNestedList);
                            }
                        });
                    } else {
                        listItem.classList.add('file');
                        link.href = item.html_url;
                    }

                    parentElement.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching repository contents:', error);
                fileListElement.textContent = 'Error fetching repository contents. Please try again later.';
            });
    }

    fetchAndDisplayContents();
});
