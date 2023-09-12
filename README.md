# What is Conway's Game of Life?
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

# How to run.
* Just run `docker-compose up` from the root directory
# Features
* Simulate button. (progress through generations)
* Pause/Resume button.
* Randomize button.
* Reset button that resets the grid to its initial state.
* Toggle cells between dead and alive with click.
* Dockerized.
* Authentication.

# Roadmap
* Analytics.
* CI / CD.
    * Pre commit linter.
* Make mobile friendly.
* User experiment history.
* Grid wrapping. (Toggle)
* Grid size.
* Advance single next step.
* Simulation speed input.
* [Different common patterns](https://conwaylife.com/wiki/Conway%27s_Game_of_Life)
    * Over time, various patterns with particular properties have been discovered in the Game of Life, including static patterns ("still lifes"), repeating patterns ("oscillators" – of which the "blinker" is a simple example), and patterns that move across the board ("spaceships").



# Architecture

## Folder structure.
* Our repo uses the [next.js folder structure for pages](https://nextjs.org/docs/app/building-your-application/routing), `app/{pageName}/page.tsx` 
* We also use Atomic Design because it forces the team to think about separation of concerns, reusability, and helps us work in parallel, and scale the application.

**Atomic Design uses atoms, molecules, and organisms. Each component is explained next:**
### **Atoms**
Atoms are the basic building blocks in this methodology. They're the smallest possible components, like form labels, buttons, inputs, or even design tokens such as colors, fonts, and so on. Atoms can be abstract and don't necessarily represent the final product, but they help to create a consistent interface and development process.

### **Molecules**
Molecules are combinations of two or more atoms that, together, form relatively simple components. An example could be a form label, a text input, and a button combined together to make a search form. While atoms can exist in isolation (like a button), molecules find their true meaning when their components are used in conjunction with each other.

### **Organisms**
Organisms are relatively complex UI components composed of groups of molecules (and possibly atoms). Examples might include the header of a website, with a logo (atom), a navigation menu (molecule), and a search form (molecule). Organisms provide context for the molecules and can demonstrate different ways molecules can work together.

## 

## Firestore.
We will use a serverless architecture with firestore. I made this choice simply because there's no need to set up an intermediary server to manage access to data. This will simplify app development.
Some more benefits are:
1. [Data Structure](https://www.geeksforgeeks.org/firestore-and-its-advantages/): Firestore stores data in documents that are organized into collections. This structure provides a high degree of flexibility in how data is organized and queried, making it a good fit for complex data.
2. [Integration](https://bluewhaleapps.com/blog/7-reasons-to-choose-google-cloud-firestore-as-your-database-solution): Firestore integrates with Firebase and Google Cloud services, offering benefits of both. This integration can facilitate the development of the app in the future.
3. [Security](https://blog.back4app.com/what-is-cloud-firestore/): Firestore has customizable security and data validation rules to ensure the data is always protected. It also uses Google's Cloud Identity and Access Management technology to handle authentication.
4. [Powerful Query Engine](https://blog.back4app.com/what-is-cloud-firestore/): Firestore provides a high-performance query engine. This engine allows developers to run complex queries against the NoSQL database without degrading performance
5. [ACID Transactions](https://blog.back4app.com/what-is-cloud-firestore/): Firestore supports ACID (atomicity, consistency, isolation, and durability) transactions. This means that if one part of a transaction fails, the entire transaction is terminated, ensuring data integrity.

## Backend.
There is no backend folder in this repo because we are using a serverless architecture.
> [Serverless computing is a method of providing backend services on an as-used basis. Servers are still used, but a company that gets backend services from a serverless vendor is charged based on usage, not a fixed amount of bandwidth or number of servers.](https://www.cloudflare.com/learning/serverless/what-is-serverless/)

## Next.js
We some of Next.js's features we will take advantage of are:
1. [Improved Load Times: Next.js facilitates "lazy loading" and automatic code splitting, resulting in faster load times for your application.](https://dev.to/richkurtzman/advantages-and-disadvantages-of-nextjs-5hg6)
2. [SEO-Friendly: Next.js supports server-side rendering (SSR), which allows better indexing by search engines and improves visibility in search results](https://pagepro.co/blog/pros-and-cons-of-nextjs/)
3. [Next.js also supports Incremental Static Regeneration: So even in a frontend-only setup we can benefit from regenerating static pages after they've been built, allowing us to update content without a full rebuild.](https://vercel.com/docs/incremental-static-regeneration )
4. [Next.js handles routing efficiently](https://nextjs.org/docs/app/building-your-application/routing)

## Authentication.
We use next-auth.js for authentication. This allows us to use authentication with providers like google, facebook, etc...
For this project we use google authentication.

## Docker.
This repo uses docker so it's easy to start the app and for consistency across environments.
>[There are so many more benefits to docker, like ease of deployment, portability, etc...](https://www.infoworld.com/article/3310941/why-you-should-use-docker-and-containers.html).

## Undefined state.
In our context we treat undefined state as the state before data is fetched. We should avoid using undefined everywhere except in the context of fetching data.

## Testing.
We will use jest and react testing library to test the component.
We use the [default next.js configuration](https://nextjs.org/docs/pages/building-your-application/optimizing/testing)

## CI / CD
I plan to use github actions for CI/CD. I will use it to run tests and deploy in the future.