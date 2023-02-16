### All characters in a puzzle must be unique

For now all characters in a puzzle will be unique, as the implementation of "CharacterSpriteMap" shows. Time will reveal if this is an arbitrary decision.

I could create an arbitrary unique identifier for each character, but this violates the concept of decoupling the UI and the game code. (I tried using the object addresses themselves as identifiers but it was not working for reasons I haven't investigated properly.)

I think when it comes to balance it becomes difficult to reason to yourself what the potency of a character will be if they can be duplicated 1-2 times. Luckily this is intended to be a single-player game (for now...) so I don't have to deal with the issue many MMOs have, where the game design has to negotiate the preferences of many players at once.

### Character contracts cannot specify functions

This is a tough decision, and I'm not sure if it's an arbitrary decision. This essentially means characters cannot do calculations themselves; all calculations are done by some service outside of the characters.

Which means:

1. All character properties must be public so that implementers must have the full context.
2. Implementers, for whatever reason (even reasons not invented yet), may need to make decision on a per-character basis.

Not that this matters to the end user; it only matters to the developer.

This is, of course, a big hassle for proponents of object-oriented programming, who may think certain calculations belong more on the object itself rather than to some all-knowing service.

The reason I want to keep this paradigm is for one reason:

I want the character metadata to be copyable.

Given:

```
const c; // some character
```

You're happy to do this, if you're not worried about shallow copying:

```
const d = { ...c };
```

Or you're free to use this new, browser-native function (that I learned about today - magic!):

```
const d = structuredClone(c);
```

"Why, sir? Why do developers need to be able to clone characters? Furthermore, can't functions be cloned?"

For 1), I don't know myself, to be honest. My instinct says a character should be _descriptive_, not having a particularly involved role in the game engine. Characters are interchangeable. I'm concerned that decentralizing these interactions may cause a headache in the future.

For 2), I actually don't know how JavaScript cloning works with functions; furthermore, I don't know how they affect constructor functions. Even if it works hunky-dory, I still don't like the idea of cloning functions.

So, _for now_, characters themselves do not affect the puzzle's state nor calculate animations. Characters are extremely lightweight as a result.

Heavyweight data is an eye-sore. Heavyweight services are a reality. So no one said.

### Foiling

There is a kinda-but-not-really implementation of "foiling". Software developers love clear terms so that word probably won't stay.

"Foiling" is when a character can act within a reaction based on a trigger. The most basic example is that a character can attack and take only partial damage if they anticipate another character's attack.

I mention foiling now to state that the specification is that foiling is one depth only - meaning, a foil can only happen once per source action. For example, you _cannot_ have a character anticipate a character anticipating their move. That could be fun to implement, but most certainly a headache, and if it's stupid for anime then it's stupid for game programming. So I sayeth.
