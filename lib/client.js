/**
 * Module Dependencies
 */

var querystring = require('querystring');
var assign = require('object-assign');
var open = require('oauth-open');
var assert = require('assert');
var isArray = Array.isArray;

/**
 * Export `Facebook`
 */

module.exports = Facebook;

/**
 * Base endpoint
 */

var endpoint = 'https://www.facebook.com/v2.3/dialog/oauth';

/**
 * Default options
 */

var defaults = {
  redirect_uri:  window.location.origin || window.location.protocol + '//' + window.location.host + '/',
  scope: ['email'],
  display: 'popup'
}

/**
 * Facebook provider
 */

function Facebook(obj, fn) {
  obj = assign(defaults, obj);
  assert(obj.client_id, 'facebook provider requires a "client_id"');

  var url = endpoint + '?' + qs(obj);
  open(url, function(err, data) {
    if (err) return fn(err);
    return fn(null, data.code);
  });
}

/**
 * Scope
 */

function scope(scope) {
  var scope = isArray(scope) ? scope.join(',') : scope;
  return scope;
}

/**
 * Build the querystring
 */

function qs(options) {
  // essure there is a / at the end
  options.redirect_uri = options.redirect_uri.replace(/\/$/, '/');

  return querystring.stringify({
    client_id: options.client_id,
    redirect_uri: options.redirect_uri,
    scope: scope(options.scope),
    display: options.display,
    nonce: '',
    response_type: 'code'
  });
}
