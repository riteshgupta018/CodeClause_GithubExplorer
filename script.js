const searchInput = document.querySelector('input[type="text"]');
const repositoriesList = document.querySelector(".repositories");

searchInput.addEventListener("keyup", function (event) {
  const searchTerm = event.target.value;
  if (searchTerm.length > 0) {
    searchRepositories(searchTerm);
  } else {
    repositoriesList.innerHTML = "";
  }
});

function searchRepositories(searchTerm) {
  fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      repositoriesList.innerHTML = "";
      data.items.forEach((repository) => {
        const repositoryElement = document.createElement("li");
        const repositoryLink = document.createElement("a");
        const repositoryDescription = document.createElement("p");
        repositoryLink.href = repository.html_url;
        repositoryLink.target = "_blank";
        repositoryLink.textContent = repository.name;
        repositoryDescription.textContent = repository.description;
        repositoryElement.appendChild(repositoryLink);
        repositoryElement.appendChild(repositoryDescription);
        repositoriesList.appendChild(repositoryElement);
      });
    })
    .catch((error) => console.error(error));
}