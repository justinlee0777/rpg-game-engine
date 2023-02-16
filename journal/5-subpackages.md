### Subpackages.

I really want to use React. I need to create meaningful groups of elements.

I'm not going to saddle my engine with a rendering engine. But I don't want to get into the hassle of splitting my packages up into repositories, then building them into artifacts...yet.

So for now both things will be developed side-by-side in the same codebase, but I will organize them like subpackages.

The way it works now is that, since _engine_ is the most important package, it is the first built; _ui-implementation_ is only concerned with the UI contracts in _engine_.

It is possible to separate the UI contracts into their own subpackage, but I really do want to split these out someday, as much of a pain as it is for development. Splitting out the contracts seems...excessive at the moment.

### Angular

Damn do I miss Angular.

My day job involves heavy usage of Angular. It's a fine framework.

I always find the debate over what is the best frontend framework amusing. One can't help but think only evangelists even bother to enter the debate, with the minority of people who, poor souls, are trying to weigh in a personal opinion on the matter getting skewered.

Angular, React and Vue are all fine. (People are getting into a tizzy about Svelte but I really don't see any substantial improvement.) They all work. People who want to finagle with the definition of "work" should look at the literature from Dijkstra's "Go To Statement Considered Harmful", concluding: code comes primarily from programmers; code works only in a context; so the only thing that matters is the context, if we assume the programmer is a rational agent (99 times out of 100 this is not true though).

I will concede I would never want to work with AngularJS again.

I've found that React works great for progressive web apps and Angular works great for stateful applications like user dashboards. Angular is just too big for someone's phone; I can say I have spent a lot of time getting Angular Universal to work so some of the cost is taken away from the end consumer. (The re-hydration still breaks the experience.) Vue I have not tried, to be honest.

The reason why Angular wins out for stateful applications is due entirely to the injection engine. Being able to create and swap out singletons is pretty powerful. There are many cases where, given a specific state of the application, I want to generate a set of utility functions. The minimum thing Angular guarantees is that these get initialized at the right time (unless you do something funny). That's great, because I don't want to have to.

And so in breaking down the engine and the user interface into separate packages, I realized I missed Angular's default lazy-loading of singletons.

For example, the engine needs to connect with endpoints of the UI.

If you needed to implement this with Angular, the engine could easily take in a token - anything unique, usually a constructor function or an API-provided InjectionToken - and Angular would simply create the UI implementation when the engine needs it. Easy-peasy.

I tried a similar approach without Angular - the engine depends on an object that meets a contract (see engine/src/index.ts). As the engine is not referencing the UI implementation directly, the circular dependency is resolved.

It's pretty lame. Some say it's easy for me to rebuild Angular's injection engine, but... I'm lazy. And I doubt it's easy. I've been promised a lot of things in my lifetime.
