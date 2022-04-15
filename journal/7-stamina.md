Since every character is intended to have their own set of skills, it doesn't seem to matter if people have varying amounts of stamina - you only need to manipulate the skills' stamina usage to balance these out.

Still, for flexibility, I'll implement stamina per-character for the time being. It is a simple matter of introducing a global stamina if it ought to be standardized across characters.

### Priority calculation

For now, priority will work like this:

1. For having a deficit in stamina, the priority is bumped one place lower.
2. _Then_, calculate Math.floor(staminaDifference / 5); bump the priority down even further by the magnitude of the result.

So for each additional difference in stamina by 5, the action becomes slower.