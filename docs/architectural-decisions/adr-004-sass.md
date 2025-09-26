# ADR 004: Use SASS as our Theming engine

- **Date created**: 01/06/2024
- **Driver**: Alex Foxleigh (Foxy)

## Status

![accepted]

## Context

Choosing a suitable CSS stack for our theming engine.

## Advice

I recommend using [SASS](https://sass-lang.com/). SASS is a mature and powerful
CSS preprocessor and when combined with (S)CSS-modules, it can be used to create
a modular CSS system, ensuring that our CSS is as modular and reusable as possible.

SASS also has a lot of powerful features, such as mixins, nesting and functions,
which can be used to create a robust and comprehensive theming engine.

We would be specifically using the 'SCSS' syntax for SASS as this is more closely
aligned with the CSS specification.

## Alternatives

Another contender for this decision was [TailwindCSS](https://tailwindcss.com/).
Whilst TailwindCSS is a very powerful CSS framework, it adds a lot of bloat to
the project (Polluting the DOM with huge lists of classes) and is not as mature
as SASS. Whilst it is growing in popularity, it is still not anywhere near as widely
adopted as SASS so does not have the same level of support and I would be
concerned about the longevity of the project.

Another downside of Tailwind is that locking down the design system is not as
easy as it is with SASS. This is because Tailwind is a utility-class based
framework, meaning that users may end up using classes that are not part of
the design system. This is not a problem with SASS as it is a preprocessor and
therefore does not have any classes.

## Discussions

- This is the place to discuss the ADR. Please keep the discussion
  on topic and try to avoid repeating the same points. Please put your name next to
  any points you make. - Foxy

## Decision

Implement SCSS as our Theming engine.

## Consequences

- All components will be modular and reusable with standalone SCSS-modules
  whilst still having access to the variables, mixins and functions from the main theme.
- We will be adopting a robust and well supported CSS framework with a huge
  ecosystem of plugins and extensions. As well as a solid number of developers who
  will be able to work with this technology for years to come.
- Encourages separation of concerns and modularity.
- We will have a large community of developers who are willing to help with
  any issues we may have.
- Hiring and onboarding new developers will be easier as there is a large
  community of developers who are familiar with SASS.

[proposed]: https://img.shields.io/badge/Proposed-yellow?style=for-the-badge
[accepted]: https://img.shields.io/badge/Accepted-green?style=for-the-badge
[superceded]: https://img.shields.io/badge/Superceded-orange?style=for-the-badge
[rejected]: https://img.shields.io/badge/Rejected-red?style=for-the-badge
[deprecated]: https://img.shields.io/badge/Deprecated-grey?style=for-the-badge
