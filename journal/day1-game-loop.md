The first reasonable challenge was to tackle the game loop.

From the onset, the loop looked like this:

- Input stage: User provides input. This is event-driven.
- Calculation stage: The game calculates the sequence of steps that are the result of the user's input. The sequence is then executed.
    - A step can be: animation, stat calculation (ex. applying damage, status effects). For example, a character's attack would involve its own animation and the receiver's animation and damage calculation.

All of these tasks need tight coordination of time.

My first instinct was to use RxJS, because I knew how usefulness its transformation were.

A naive implementation of a task loop looks like this:

```
import { of } from 'rxjs';
import { delay, expand } from 'rxjs/operators';

of(0).pipe(
    expand(i => of(++i)),
    delay(100)
).subscribe({
    next: value => console.log(value),
    error: error => console.log(error),
    complete: () => console.log('done'),
});
```

Yet at first glance this is a non-starter. It is secretly a performance hog.

JS's "dumb" recursion saves the context of each function call, so a particularly long game may potentially cause a stack overflow. This is worse for RxJS where behind the scenes an operator is a complex chain of calls.

The reality is that this program fails; worse, it fails silently, not executing the error callback.

After research, I found the iterative approach for RxJS:

```
import { of, queueScheduler } from 'rxjs';
import { delay, expand, observeOn } from 'rxjs/operators';

of(0).pipe(
    expand(i => of(++i)),
    delay(100),
    observeOn(queueScheduler)
).subscribe({
    next: value => console.log(value),
    error: error => console.log(error),
    complete: () => console.log('done'),
});
```

So subsequent tasks - I assume, emissions - are not executed until the current one is complete, and thus each call does not depend on the prior call's context to complete. This is RxJS's equivalent to tail call optimization.

Yet while I was walking through the park, not entirely satisfied with RxJS's solution - because the call stack was actually quite big, just to increment and print a number, and also because I found internally RxJS is huge, even if using only a few operators - I realized this could be accomplished natively, using async/await syntax.

The current solution is much, much more expressive and the call stack is very, very small.

```
async function foo(i) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(++i);
        }, 100);
    });
}

async function gameLoop() {
    let i = 0;

    while (true) {
        console.log(i);
        i = await foo(i);
    }
}

gameLoop();
```

This is better for my use case too because the engine is meant to demonstrate, and ought to be simple and small; it will not be a final product.