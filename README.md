## Running the code

Clone and cd into the repo folder and run the following commands:

```bash
pnpm install
```

This project is built using [Astro](https://astro.build/), so port is 4321 by default

To start the development server, run:

```bash
pnpm dev
```

The **Manage creators** listing page is available at `admin` route. Alternatively, you can click on the _Explore Creators_ link in the nav.

## Explanation of the design decisions

#### Astro as static site generator

Used Astro because its a lot faster to setup, it allows me to just start prototyping without thinking about framework constraints. When I need to have a feature that requires a framework, I can just add it in. Also I can mix and match different frameworks if I want to. For example, there is a library that I want to use that is only available in React or compatible with Vue, I can just add React or Vue to the project and use it.

#### Tailwind CSS

Used TailwindCSS instead of hardcoding CSS because it is a lot faster to prototype with. I can just add classes to the HTML and see the changes immediately. Also, it is a lot easier to maintain because I can see all the styles that are being used in the HTML file. Also I don't miss the traditional CSS because I can still use it if I want to.

#### React for complexity

I would normally would reach out to Vue as it makes things easier and the syntax is closer to HTML. We no need to specify className, htmlFor, etc also we can write css in a single file because of SFC. But here I chose React because I didn't use it for a long time. I reached out to React for the table listing, using the incredible Tanstack Query to setup infinite loading and managing the cache during form submission. Also on the auto play slider, I used React when my initial effort to get it working with HTML/TailwindCSS didn't played out well.

#### What could have done better

Ofc there are always things that could have been improved here, from animating the svg on the hero and the feature section, making the nav sticky, adding a dark mode, showing drawer bottom sheets on mobile instead of dialog modal, empty screen, error screen, loading screen etc. Also, I could have added more functionalities to the table such as selecting multiple rows, sorting, filtering, search etc but I wanted to keep it simple and focused on the main features.
