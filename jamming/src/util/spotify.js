import react from 'react';

let accessToken = ''
const Spotify = {
    getAccessToken(){
        if(accessToken){
            return token
        } 
            // check for access token match
            // when typing the following will get the url of the page. 
            // /access_token=([^&]*)/ capture all the characters in url
            // .match is a search that return array of search results. 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        if (accessTokenMatch && expireInmatch){
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
                //clearing the url allowing us to grab new url after it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
            return accessToken
        }
    }
}


export default Spotify;