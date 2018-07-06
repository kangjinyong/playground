var GoogleAuth;
var SCOPE = 'profile email';
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyCr7Ce69pSDnNIfS3IPjICBcU8nwEWOCGw',
        'clientId': '937174194034-diuttf5no4kktme3f6q9aviru381a39m.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
        }); 
        $('#revoke-access-button').click(function() {
            revokeAccess();
        }); 
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        GoogleAuth.signOut();
    } else {
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}

function setSigninStatus(isSignedIn) {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Sign out');
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('You are currently signed in and have granted access to this app.');
        var profile = user.getBasicProfile();
        //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        //console.log('Given Name: ' + profile.getGivenName());
        //console.log('Family Name: ' + profile.getFamilyName());
        //console.log("Image URL: " + profile.getImageUrl());
        //console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = user.getAuthResponse().id_token;
        //console.log("ID Token: " + id_token);
    } 
    else {
        $('#sign-in-or-out-button').html('Sign In/Authorize');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('You have not authorized this app or you are signed out.');
    }
}