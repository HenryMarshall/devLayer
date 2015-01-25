dl.testData = {
  characters: {
    "q": ["24"],
    "Q": ["24", "62"],
    "!": ["24", "108"],
    "j": ["44"],
    "J": ["44", "50"],
    "(": ["44", "108"],
    ")": ["44", "108", "50"],
    ";": ["47"],
    ":": ["47", "50"]
  }
}

// FIXME: This test relies on some of the same logic as what it is testing.
QUnit.test("dl.buildCurrentStroke", function(assert) {
  function buildCurrentStrokeTest(character) {
    var expect =  _.map(dl.testData.characters[character], function(keycode) {
                    return xm.config.keyboard[keycode];
                  });

    assert.propEqual(dl.buildCurrentStroke(character, dl.testData.characters), expect);
  }

  buildCurrentStrokeTest("q");
  buildCurrentStrokeTest("Q");
  buildCurrentStrokeTest("(");
  buildCurrentStrokeTest(")");
  buildCurrentStrokeTest(":");
});