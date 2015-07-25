
# facebook-oauth-agent

  Bare bones, low-level agent for authenticating with Facebook's oAuth.

  Uses both a client-side and server-side library to make the oAuth handshake more understandable.

  This library does not make any assumptions about your server-side architecture, allowing it to easily adapt to any setup.

## Example

**client.js**

```js
var Facebook = require('facebook-oauth-agent');

// Open popup
Facebook({
  client_id: client_id,
  scope: 'email'
}, function(err, code) {
  // send "code" to server.js
})
```

**server.js**

```js
var Facebook = require('facebook-oauth-agent');

// received "code" from client
Facebook({
  code: code,
  client_id: client_id,
  client_secret: client_secret,
  redirect_uri: redirect_uri,
}, function(err, profile) {
  // "profile" will contain your facebook information
});

```

## Installation

```
npm install facebook-oauth-agent
```

## Getting the keys

<img src="http://www.doit.ba/img/facebook.jpg" width="150">
- Visit [Facebook Developers](https://developers.facebook.com/)
- Click **Apps > Create a New App** in the navigation bar
- Enter *Display Name*, then choose a category, then click **Create app**
- Click on *Settings* on the sidebar, then click **+ Add Platform**
- Select **Website**
- Enter *http://localhost:3000* for *Site URL*

## See also:

- [google-oauth-agent](https://github.com/lapwinglabs/google-oauth-agent)
- [linkedin-oauth-agent](https://github.com/lapwinglabs/linkedin-oauth-agent)
- [twitter-oauth-agent](https://github.com/lapwinglabs/twitter-oauth-agent)

## Credits

Most of this code is distilled from the [satellizer](https://github.com/sahat/satellizer) project.

## License

(The MIT License)

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
