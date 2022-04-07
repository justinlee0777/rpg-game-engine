### To use

Environment: node@15.10.0, npm@7.5.3

1. Load dependencies: `npm run install`
2. Build the package: `npm run build`
3. Host the `dist` package through a web server.

### Proposal

A very, very small game engine meant only for "lenient puzzle-based RPGs":

- Turn-based game, not real-time
- Units take action all in one turn
    - Order of action is determined by the action used
- No equipment, or reduced emphasis on equipment
- No levels/point allocation, or reduced emphasis on these
- Each character has unique set of skills
- Each enemy has unique behavior (aggressive from the start; turtling; charging up for moves)
- Multiple victory conditions (enemy's HP goes to 0; number of turns hits certain number; certain damage threshold met)
- No MP - MP is one-dimensional, it only matters whether you have enough or not
- Skills use stamina
    - Characters regenerate stamina every turn. Skills can still be used without sufficient stamina, but the action is completed much later (proportional to the deficit).
- Skills have stagger threshold
    - If a character takes a certain amount of damage before executing a skill, the skill gets canceled. The stamina deficit may play a part in this as well.


### Rationale

RPG games rely on several mechanics that make them feel less immediately enjoyable.

- Real-time: Real-time gameplay is a phony way of making matches feel more urgent. When user inputs are optimized, it is no different than implementing a queue. When user inputs are not optimized, users panic. Enemies are artifically tougher by making them act faster. They don't change the game in a fundamental way either.
- Meter to act: Mana, action points, whatever you call them, it only matters if you have enough or have the items to bring yourself to the right amount. This further causes balancing issues with skills that have good yield and little-to-none resource consumption.
- Levels: Skill points and higher stats are only to compensate for the lack of balance in matches. Furthermore, the choices in skills are somewhat arbitrary when DPS and survivability are always the biggest concerns.
- Equipment: Equipment is an interesting mechanic when it significantly changes gameplay; often it does not, however, and is a way to compensate for lack of balance.

From my hypothesis, RPGs as a result have become more action-based or users perceive they are largely controlled by luck or grinding.

I have added several ideas, to be prototyped:

- Unique enemy behavior: Ideally an enemy party's AI is fairly deterministic and predictable. The enemy should also have a unique toolset that the player may be unfamiliar with, and should develop a unique strategy for. The player should enjoy outmanuevering the enemy. (Having the enemy anticipate player patterns seemingly requires a specialized field of programming I am not familiar with, so that is out-of-scope.)
- Multiple victory conditions: The implementation of multiple victory conditions hopefully de-emphasizes the importance of damage-dealing skills. However, I feel the players themselves will not feel it is "fair" to win by any means other than the enemy's total defat.
- Stamina: This is part of the "lenient" philosophy. Rather than force players away from skills, they may still use certain costly, but potent, skills so long as they understand the disadvantages. It may be that they have another character in their party that can mitigate the disadvantage.
- Stagger threshold: I'm not sure about this metric. It may inspire more innovative tactics, but it is possible it will punish players/enemies too much.

The overall concept is to make the user's input more meaningful.