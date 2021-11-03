var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// this will take the username the user types into the HTML form verify it occupied and not empty. it store it inside of the username variable then pass it to the getUserRepos as an argumuent, it will then empty the value of the input for the next search.
var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }
    console.log(event);
};

var displayRepos = function(repos, searchTerm) {
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for(var i =0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" +repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-betwee align-center";

        //create a san element to hold repository name
        var titleEL = document.createElement("span");
        titleEL.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEL);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

// append to container
repoEl.appendChild(statusEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
   
   //make a request to the url
        fetch(apiUrl).then(function(response) {
        response.json().then(function(data) { 
            displayRepos(data, user);
        });
        });
    };
userFormEl.addEventListener("submit", formSubmitHandler);