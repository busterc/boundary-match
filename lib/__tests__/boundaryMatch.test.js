const assert = require('assert');
const boundaryMatch = require('../index.js');

const goodStrings = ['(HotDog)', '(hotdog)!', 'hamburger, pizza, (hotdog)'];
const badStrings = ['(HOTDOGS)', 'hotdog'];
const skippedStrings = ['(HOTDOG)S != (HOTDOG)', 'A(HotDog) is not (HotDog)'];

describe('boundaryMatch', () => {
  it('vanilla regex fails', () => {
    let string = '(HOTDOG)';
    let re = new RegExp('\\b\\(hotdog\\)\\b', 'i');
    assert(string.match(re) === null, `:( => ${string} <= should not find a match`);
    assert(
      string.match(/\b\(hotdog\)\b/i) === null,
      `:( => ${string} <= should not find a match`
    );
  });

  it('finds valid matches', () => {
    goodStrings.forEach(string => {
      assert(
        boundaryMatch(string, '(Hotdog)', 'i'),
        `:( => ${string} <= should find a match`
      );
    });
  });

  it('skips invalid matches', () => {
    skippedStrings.forEach(string => {
      assert(
        boundaryMatch(string, '(Hotdog)', 'i'),
        `:( => ${string} <= should find a match`
      );
    });

    assert(
      boundaryMatch('(HotDog)s', '(hotdog)', 'i') === null,
      `:( => '(HotDog)s <= should not find a match`
    );
  });

  it('does not find matches, as expected', () => {
    badStrings.forEach(string => {
      assert(
        boundaryMatch(string, '(Hotdog)', 'i') === null,
        `:( => ${string} <= should not find a match`
      );
    });
  });
});
