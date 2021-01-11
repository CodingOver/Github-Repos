// Main Variables
let input = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');

getButton.onclick = function () {
    getRepos();
};

// Get Repos Function 
function getRepos() { // If Value Is Empty

    if (input.value == '') {

        reposData.innerHTML = "<span class='empty'>Please Write Github UserName<span>";

    } else { // Fetch API Github 

        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then(response => response.json())
            .then(repsitories => {

                // Empty The Container
                reposData.innerHTML = '';

                // Loop on Repsitories
                repsitories.forEach(repo => {

                    // Create The Main Div 
                    let mainDiv = document.createElement('div');
                    
                    // Add Class To Main Div 
                    mainDiv.className = 'repo-box';

                    // Create Repo Name Text
                    let repoName = document.createTextNode(repo.name);

                    // append The Repo Name into The Main Div
                    mainDiv.appendChild(repoName);

                     // Create Repo URL Anchor
                     let theUrl = document.createElement('a');
                     
                     // Create repo text 
                     let theUrlText = document.createTextNode('Visit');

                     // Append The URL Text into Anchor Text
                     theUrl.appendChild(theUrlText);

                     // Add Href Attributes To Repo Url Anchor
                     theUrl.href = `https://github.com/${input.value}/${repo.name}`;

                     // Set Target Blanks To Repo Url Anchor
                     theUrl.setAttribute('target', '_blank');

                     // Append Url Anchor To Main Div
                     mainDiv.append(theUrl);
                     // Append Url Anchor To Container
                     reposData.appendChild(mainDiv);

                     // Create Star count Span
                     let starsSpan = document.createElement('span');

                     // Create The Stars Count Text
                     let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                     // Add Stars Count Text To Stars Count Span
                     starsSpan.appendChild(starsText);
                     
                     // Append The Stars Count Span To Main Div
                     mainDiv.appendChild(starsSpan);

                     // append The main Div To Container
                     reposData.appendChild(mainDiv);
                });
            });
    }

}
