# DMS Redevelopment

This is a Next.js project with Storybook integration and various addons.

## Project Structure

- `package-lock.json`: Contains the dependency tree and versions.
- `.storybook/main.js`: Configuration for Storybook.
- `src/`: Contains the source code.
    - `components/`: Contains the components.
    - `pages/`: Contains the pages.
    - `styles/`: Contains the styles.

## Technologies Used

- **JavaScript**
- **Next.js**
- **Storybook**
- **npm**

## Getting Started

### Prerequisites

- Node.js
    - [Download Node.js](https://nodejs.org/en/download/)
    - [Install Node.js](https://nodejs.org/en/download/package-manager/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Create a file named `.env.local` in the root directory of the project and add the following environment variables:
   ```sh
   REACT_EDITOR=code
   FONTAWESOME_TOKEN=<fontawesome-token>
   ```
   ###### _The fontawesome token is provided to the developers by the project manager._

3. Install the dependencies:
   ```sh
    npm install
    ```

## Apps

This project provides the following apps for developement:

* ### DMS App
    ```sh
    npm run dms
    ```
  _Open [http://localhost:3000](http://localhost:3000) in your browser._


* ### Storybook
    ```sh
    npm run storybook
    ```
  _Open [http://localhost:3001](http://localhost:3001) in your browser._

The apps have been configured to run on different ports to avoid conflicts. For any specific requirements, the ports can
be changed in the `package.json` file.

## Environment Variables

- `REACT_EDITOR`: Specifies the editor to use (e.g., VSCode, WebStorm) for debugging with NextJs and React.
- `FONTAWESOME_TOKEN`: Token for FontAwesome pro kit.

## Storybook Configuration

Storybook is configured in `.storybook/main.js` with the following addons:

- `@storybook/addon-links`
- `@storybook/addon-essentials`
- `@storybook/addon-postcss`
- `@storybook/addon-webpack5-compiler-babel`
- `@storybook/addon-themes`
- `@storybook/addon-styling-webpack`
- `storybook-dark-mode`
- `@chromatic-com/storybook`

## Aliases

Path aliases are configured in the Storybook as well as NextJs configuration:

- `@` -> `/src`
- `~` -> `/src/components`