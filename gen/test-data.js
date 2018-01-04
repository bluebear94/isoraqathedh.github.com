var objvocab = {
    "FIRST": [
        "The <POS> inflects with respect to <thing>.",
        ["The <POS> inflects with respect to <thing> and <thing>.", 0.4],
        ["The <POS> inflects with respect to <thing> or <thing>, but not both.",
         0.2],
        ["The <POS> inflects with respect to <thing>, <thing> and <thing>.",
         0.3],
        "There is a very <fine-coarse> division of the semantic space " +
            "of <stuff> in this language.",
        "The <POS> inflection system "+
            "is understood using <stuff> as an analogy.",
        "The <POS> and the <POS> are handled in exactly the same way.",
        "The language lacks any <POS>.",
        "Names are a type of <POS>.",
        "There is <amount> of <sound-type> in the phonology.",
        "The language utilises <unusual-sound-type> in the phonology."],
    "stuff": [
        "snow", "wood", "hills", "water", "galactic filaments",
        "quantum-mechanical behaviour",
        "transfinite ordinal numbers",
        "animals with more than three horns",
        "kings",
        "food which is to be eaten in more than a day",
        "milk"
    ],
    "amount": [
        ["a small amount", 4],
        ["a large amount", 4],
        ["an unusually small amount", 2],
        ["an unusually large amount", 2],
        ["a lack", 2],
        "a pathological amount",
        "in popular analyses a non-integer amount",
        "in popular analyses a negative amount"],
    "sound-type": [
        "vowels", "consonants",
        "plosives", "alveolars", "unrounded vowels",
        "rounded vowels", "fricatives", "ingressive phonemes",
        "<unusual-sound-type>"],
    "unusual-sound-type": [
        "whistles", "finger-taps", "hand signals"],
    "fine-coarse": ["fine", "coarse"],
    "thing": [
        ["<grammatical-object>", 100],
        ["<unusual-object>", 10],
        "<very-unusual-object>"],
    "grammatical-object": [
        "person", "number", "tense", "manner", "place", "prestige",
        "evidentiality", "alienableness"],
    "unusual-object": [
        "the date",
        "whether one has eaten recently",
        "the phase of the moon",
        "the makeup of the crowd around the audience",
        "the direction the speaker is facing"],
    "very-unusual-object": [
        "the position of a star or planet in the sky",
        "the amount of money one makes in a period of time",
        "how prepared one is to make this statement"],
    "POS": ["noun", "verb", "adjective", "conjunction",
            "pre/post-positions"]};
