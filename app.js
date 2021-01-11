// Main Variables
function $(id) {
    return document.getElementById(id);
}

let button = $('button');
let reposData = $('result');

button.onclick = async function () {
    const repos = await fechRepos();
    clear();
    printRepos(repos);
};

function clear() {
    reposData.innerHTML = '';
}

function printNoResult(message = 'Please Write Github UserName') {
    reposData.innerHTML = `<span class='empty'>${message}<span>`
}

function card({name, html_url: htmlUrl, stargazers_count: stargazersCount}) {
    return `<div class="repo-box">${name}
    <a href=${htmlUrl} target="_blank">Visit</a>
    <span>Stars ${stargazersCount}</span>
    </div>`
}

function printRepos(repos) {
    if (repos instanceof Array) 
        reposData.innerHTML = repos.map(card).join('');
    else printNoResult(repos.message);
}

function fechRepos() {
    const query = $('search');
    if(!query) return printNoResult();
    return fetch(`https://api.github.com/users/${query.value}/repos`)
    .then(response => response.json())
    .then(repsitories => repsitories)
}