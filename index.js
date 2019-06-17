// Import the express lirbary
const express = require('express')
const axios = require('axios')

const app = express()
const clientID = '49947e1e13649dccd714'
const clientSecret = process.env.GH_TOKEN || require('./creditentials.json').githubAppToken

// Root path
app.use(express.static(__dirname + '/public'))

// Oauth github
app.get('/oauth/redirect', (req, res) => {
    // The req.query object has the query params that
    // were sent to this route. We want the `code` param
    const requestToken = req.query.code
    axios({
      // make a POST request
      method: 'post',
      // to the Github authentication API, with the client ID, client secret
      // and request token
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      // Set the content type header, so that we get the response in JSOn
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
      // Once we get the response, extract the access token from
      // the response body
      console.log(response)
      const accessToken = response.data.access_token
      res.cookie('id_token' , accessToken)
      // redirect the user to the welcome page, along with the access token
      res.redirect(`/`)
    })
  })

// Start the server on port 8080
app.listen(8080)