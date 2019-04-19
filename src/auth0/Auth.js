import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    responseType: 'token id_token',
    scope: 'openid profile',
    sso: false
  });

  getProfile = () => {
    return this.profile;
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        // console.log('***Auth.handleAuth().authResult***\n', authResult)
        this.setSession(authResult);
        resolve();
      });
    })
  };

  isAuthenticated = () => {
    return new Date().getTime() < this.expiresAt;
  };

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    this.auth0.logout({
      return_to: window.location.origin
    });

    history.replace('/');
  };

  setSession = authResult => {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at in milliseconds
    this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
  }
}
