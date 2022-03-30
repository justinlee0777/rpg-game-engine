For now all characters in a puzzle will be unique, as the implementation of "CharacterSpriteMap" shows. Time will reveal if this is an arbitrary decision.

I could create an arbitrary unique identifier for each character, but this violates the concept of decoupling the UI and the game code. (I tried using the object addresses themselves as identifiers but it was not working for reasons I haven't investigated properly.)

I think when it comes to balance it becomes difficult to reason to yourself what the potency of a character will be if they can be duplicated 1-2 times. Luckily this is intended to be a single-player game (for now...) so I don't have to deal with the issue many MMOs have, where the game design has to negotiate the preferences of many players at once.