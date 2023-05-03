window.addEventListener('DOMContentLoaded', function () {
    const fetchDataButton = document.querySelector('#fetch-data');
    const postsList = document.querySelector('#posts');
    fetchDataButton.addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((posts) => {
                postsList.innerHTML = '';
                posts.forEach((post) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>${post.title}</strong>: ${post.body}`;
                    postsList.appendChild(listItem);
                });
            })
            .catch((error) => console.error(error));
    });
});
