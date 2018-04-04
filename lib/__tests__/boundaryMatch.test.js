const assert = require('assert');
const boundaryMatch = require('../index.js');

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
    const goodStrings = ['(HotDog)', '(hotdog)!', 'hamburger, pizza, (hotdog)'];
    goodStrings.forEach(string => {
      assert(
        boundaryMatch(string, '(Hotdog)', 'i'),
        `:( => ${string} <= should find a match`
      );
    });
  });

  it('skips invalid matches', () => {
    const skippedStrings = ['(HOTDOG)S != (HOTDOG)', 'A(HotDog) is not (HotDog)'];
    skippedStrings.forEach(string => {
      assert(
        boundaryMatch(string, '(Hotdog)', 'i'),
        `:( => ${string} <= should find a match`
      );
    });

    assert(
      boundaryMatch('(HotDog)s', '(hotdog)', 'i') === null,
      `:( => (HotDog)s <= should not find a match`
    );

    assert(
      boundaryMatch('Do you yoyo?', 'yo', 'i') === null,
      `:( => Do you yoyo? <= should not find a match`
    );
  });

  it('does not find matches, as expected', () => {
    const badStrings = ['(HOTDOGS)', 'hotdog'];
    badStrings.forEach(string => {
      assert(
        boundaryMatch(string, '(Hotdog)', 'i') === null,
        `:( => ${string} <= should not find a match`
      );
    });
  });

  it('replaces, as expected', () => {
    let matched = boundaryMatch('(HOTDOG)', '(hotdog)', 'i');
    assert(
      boundaryMatch.replace(matched, 'Chili Dog!') === 'Chili Dog!',
      `:( => '(HOTDOG)' <= should be replaced with Chili Dog!`
    );
    matched = boundaryMatch('Gimme a (HotDog)', '(HOTDOG)', 'i');
    assert(boundaryMatch.replace(matched, 'Chili Dog!') === 'Gimme a Chili Dog!');
  });
});
