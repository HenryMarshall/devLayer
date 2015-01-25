dl.testData = {
  corpus: "(q)",
  corpusStrokes: [
    [
      {
        "finger": "rightIndex",
        "hand": "right",
        "x": 7.75,
        "y": 2
      },
      {
        "finger": "rightThumb",
        "hand": "right",
        "x": 10,
        "y": 4
      }
    ],
    [
      {
        "finger": "leftPinkie",
        "hand": "left",
        "x": 1.5,
        "y": 1
      }
    ],
    [
      {
        "finger": "rightIndex",
        "hand": "right",
        "x": 7.75,
        "y": 2
      },
      {
        "finger": "rightThumb",
        "hand": "right",
        "x": 10,
        "y": 4
      },
      {
        "finger": "leftPinkie",
        "hand": "left",
        "x": 1.25,
        "y": 3
      }
    ]
  ],
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
QUnit.test("dl.keycodesToStrokes", function(assert) {
  function keycodesToStrokesTest(corpusCharacter) {
    var expect =  _.map(dl.testData.characters[corpusCharacter], function(keycode) {
                    return xm.config.keyboard[keycode];
                  });

    assert.propEqual(
      dl.keycodesToStrokes(corpusCharacter, dl.testData.characters), 
      expect
    );
  }

  keycodesToStrokesTest("q");
  keycodesToStrokesTest("Q");
  keycodesToStrokesTest("(");
  keycodesToStrokesTest(")");
  keycodesToStrokesTest(":");

  assert.throws(function() {
    dl.keycodesToStrokes("i", dl.testData.characters)
  }, /corpusCharacter not in characters/);
});

QUnit.test("dl.distanceBetween", function(assert) {
  assert.equal(dl.distanceBetween("27", "28"), 1);
  assert.equal(dl.distanceBetween("41", "28"), 1.25);
  assert.throws(function() {
    dl.distanceBetween("24", "27");
  }, /Different fingers used/);
});

QUnit.test("dl.corpusToCorpusStrokes", function(assert) {
  assert.propEqual(
    dl.corpusToCorpusStrokes(dl.testData.corpus, dl.testData.characters), 
    dl.testData.corpusStrokes
  );
});