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

## What I learned

This project helped me practice:

- Algorithms
- JavaScript
- Debugging
- Problem-solving
- Thinking about basic robot navigation
