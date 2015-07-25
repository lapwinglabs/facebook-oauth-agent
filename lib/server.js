/**
 * Module dependencies
 */

var superagent = require('superagent');
var assert = require('assert');

/**
 * Export `Facebook`
 */

module.exports = Facebook;

/**
 * Access Token Endpoint
 */

var access_token_endpoint = 'https://graph.facebook.com/v2.3/oauth/access_token';

/**
 * API Endpoint
 */

var api_endpoint = 'https://graph.facebook.com/v2.3/me';

/**
 * Initialize `Facebook`
 */

function Facebook(obj, fn) {
  assert(obj.code, 'facebook authentication requires a "code"');
  assert(obj.client_id, 'facebook authentication requires a "client_id"');
  assert(obj.client_secret, 'facebook authentication requires a "client_secret"');
  assert(obj.redirect_uri, 'facebook authentication requires a "redirect_uri"');

  // Facebook needs a "/" at the end... !@#$@.
  obj.redirect_uri = obj.redirect_uri.replace(/\/$/, '') + '/';

  var query = {
    code: obj.code,
    client_id: obj.client_id,
    client_secret: obj.client_secret,
    redirect_uri: obj.redirect_uri
  };

  // get the access token and request the profile
  fetch_token(query, function(err, obj) {
    if (err) return fn(err);
    fetch_profile(obj, fn);
  })
}

/**
 * Get the token
 */

function fetch_token(obj, fn) {
  superagent
    .get(access_token_endpoint)
    .accept('json')
    .query(obj)
    .end(function(err, res) {
      if (!res.ok) return fn(error(res.text));
      return fn(null, res.body)
    });
}

/**
 * Fetch profile
 */

function fetch_profile(obj, fn) {
  superagent
    .get(api_endpoint)
    .accept('json')
    .query(obj)
    .end(function(err, res) {
      if (!res.ok) return fn(error(res.text));
      return fn(null, res.body);
    })
}

/**
 * Fetch the error
 */

function error(text) {
  return new Error(JSON.parse(text).error.message);
}
