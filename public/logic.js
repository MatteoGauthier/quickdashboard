const query = window.location.search.substring(1)
const token = Cookies.get('id_token')
var cookie = document.cookie;


console.log(Cookies.get('id_token'));
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
        console.log(res)

        
        const nameNode = document.createTextNode(`Welcome, ${res.name}`)
        document.body.appendChild(nameNode)

        // Replace value
        reposData.textContent = res.public_repos
    });

    fetch('https://api.github.com/user/repos', {

        method: 'GET',
        headers: {
            Accept: '*/*',
            Authorization: 'token ' + token,
        },
        type: 'sources'
    })
    // Parse the response as JSON
    .then(res => res.json())
    .then(res => {
        // Welcome
        console.log(res)
        console.log(res.length)
        var languages = []
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            console.log(element.language)
            languages.push(element.language)

        }
        console.log(languages)
        console.log(languages.flat(Infinity))
    });