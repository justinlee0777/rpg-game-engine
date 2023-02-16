### Terminology

"Ongoing effect" is a cumbersome name, and yet "effect" is not adequate (as immediate things like damage, by our darn English language, is also an effect) and the typical RPG term "status effects" did not seem adequate, as they seem to indicate "effects against an otherwise-healthy status".

An ongoing effect is any temporary change on a character based on some trigger. It does not even matter if it is beneficial or malignant. A character can even summon cosmetic butterflies for the rest of the battle; it is simply an "ongoing effect".

### The Hide skill

"Hide" is an interesting skill. The idea is that, _so long as the skill is cast first_, a character can completely mitigate damage for another character, at the cost of that character being unable to attack. This is only useful for skills that are extremely costly to receive, though I plan to make most skills with that specification. In a way, "Hide" is a good fork in the road for distinguishing this engine from other RPG engines.

### Skill Parameter: Triggers

But this is where things get extremely tricky. "Hide" is a pretty useful skill. Unfortunately, it's somewhere in the middle as far as priority goes, so many attacks will come before it. This limits the usefulness of the skill. In contrast, making the skill high in priority will ruin it and make it one-dimensional. This was revealed to me as I was implementing "Hide".

So the next step is to implement skill parameters.

I have been thinking about allowing players to customize how skills execute for a while. For example, if you want a skill to execute more quickly, you can sacrifice some of its damage. You can also add status effects to an attack by having it cost more stamina and possibly be slower. The idea is to give players a substantial amount of flexibility without forcing them to set strategies up.

The one customization I'm most interested in, for "Hide" specifically, is called a _trigger_. Players can customize skills by associating them with a triggering event - for example, if a character does so and so action, the player can anticipate it and react accordingly. This seems to me the ideal customization path for "Hide". The upcoming implementation seems fraught with difficult decision-making best for a different write-up.
