# Pokémon Report Calc Generator

The Pokémon Calc Report Generator is an application designed to assist Pokémon trainers in analyzing what Pokémon can survive a certain attack. This application allows users to input various parameters, such as Pokémon, nature, moves, EVs, IVs, and more, to generate detailed reports on survival probabilities and damage calculations. Made by [Canary255] (https://twitter.com/Canary255)

⚠️ **Please Note**: This project is currently in development and may contain bugs or incomplete features. We appreciate your understanding and patience as we work to improve the application.

## Features

- **Pokémon Selection**: Choose the Pokémon who is going to be the Attacker.
- **Nature and Move Selection**: Select the desired nature and moveset for the Pokémon under consideration. The application takes into account the effects of the chosen nature and moves during the calculations.
- **EV and IV Management**: Specify the Effort Values (EVs) and Individual Values (IVs) for the Pokémon to accurately calculate its stats.
- **Defensive change**: Choose the Boost/Drops of the defensive Pokémon.
- **Target Selection**: Select between single and double target.
- **Terrain and Field Conditions**: Consider the impact of terrain effects and field conditions on the battle. The application factors in the relevant modifiers to provide more accurate calculations.
- **Survivability Analysis**: Generate a comprehensive list of Pokémon that can survive, barely survive, or cannot survive the specified attack. This analysis helps trainers gauge their Pokémon's resilience against different threats.
- **Calculation Results**: Obtain detailed damage calculations, including expected damage output and potential OHKO (One-Hit Knock Out) scenarios. This information helps trainers make informed decisions during battles.
- **PDF Report Generation**: Create a PDF report showing analysis results. The report includes the Pokémon list, survivability analysis, and detailed calculations. Trainers can easily share and reference this report for future battles.

## Tools used

This project was created with [Vite](https://vitejs.dev/)

- ⚛️ [React](https://reactjs.org/) - v18.2.0
- ⚡ [TailwindCSS](https://tailwindcss.com/)

## Getting started

> To run the project, you must have `node` and `npm` installed on your computer.

> This project uses node `v18.13.0`.

### `npm install`

To install project dependencies.

### `npm run dev`

Runs the application in development mode.
