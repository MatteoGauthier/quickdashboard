const query = window.location.search.substring(1)
const token = query.split('access_token=')[1]

var reposData = document.querySelector("#repos-data")
// Call the user info API using the fetch browser library
fetch('https://api.github.com/user', {

        method: 'GET',
        headers: {
            Accept: '*/*',
            Authorization: 'token ' + token,
        }
    })
    // Parse the response as JSON
    .then(res => res.json())
    .then(res => {
        // Welcome
        const nameNode = document.createTextNode(`Welcome, ${res.name}`)
        document.body.appendChild(nameNode)

        // Replace value
        reposData.textContent = res.public_repos
    })