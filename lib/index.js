'use strict';

const esc = require('escape-string-regexp');

module.exports = match;
function match(string, target, flags) {
  let re = new RegExp(esc(target), flags);
  let result = string.match(re);

  if (!result) {
    return null;
  }

  if (result[0].length === string.length) {
    return result;
  }

  let prefix;
  let suffix;

  if (result.index === 0) {
    // Only look at the suffix char
    suffix = string.charAt(result.index + result[0].length);
  }

  if (result[0].length - result.index === result[0].length) {
    // Only look at the prefix char
    prefix = string.charAt(result.index - 1);
  }

  // Look at prefix and suffix
  prefix = prefix || string.charAt(result.index - 1);
  suffix = suffix || string.charAt(result.index + result[0].length);

  if (isBounded(prefix, suffix)) {
    return result;
  }

  // Else look for next match
  let nextMatch;
  let nextIndex = result.index + target.length - 1;
  if (string.length > nextIndex + target.length) {
    nextMatch = match(string.substr(nextIndex), target, flags);
  }

  if (nextMatch) {
    nextMatch.index += nextIndex;
    nextMatch.input = string;
    return nextMatch;
  }

  return null;
}

function isBounded(prefix, suffix) {
  prefix = prefix || '!';
  suffix = suffix || '!';
  return /\B/.test(prefix) && /\B/.test(suffix);
}

match.replace = function(matched, target) {
  let prefix = matched.input.slice(0, matched.index);
  let suffix = matched.input.slice(matched.index + matched[0].length);
  let newString = `${prefix}${target}${suffix}`;
  return newString;
};
