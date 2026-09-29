# Robot Path Planner

A small browser-based robotics project that finds the shortest path between two points while avoiding obstacles.

## What it does

- Lets you choose a robot's starting position
- Lets you choose a destination
- Lets you add or remove obstacles
- Finds the shortest available path
- Animates the route on the grid
- Can generate random obstacles

## How it works

The project uses **Breadth-First Search (BFS)**.

BFS checks nearby grid cells step by step. Because every move on the grid has the same cost, the first route BFS finds to the destination is a shortest path.

The robot can move:

- Up
- Down
- Left
- Right

It cannot move through obstacles.

## Technologies

- HTML
- CSS
- JavaScript

## Run it

Just open `index.html` in a browser.

## Put it on GitHub

1. Create a new GitHub repository called something like `robot-path-planner`.
2. Upload `index.html`, `styles.css`, `script.js`, and this `README.md`.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`.
6. Save.
7. GitHub will create a public link for the project.

## What I learned

This project helped me practice:

- Algorithms
- JavaScript
- Debugging
- Problem-solving
- Thinking about basic robot navigation
