# Spotaroom

Spotaroom is an app that exposes an API endpoint with room data, and renders a responsive page consuming this data.

## Installation

Node is required (I used v10.13.0)

```bash
npm install
npm run start
```

## Usage

localhost:3000/ will get the responsive page

localhost:3000/api/homecards will get the data

## Decisions taken

- I created a single Express server that exposes the endpoint and also renders the page, because the complexity didn't require to use a client-side rendering framework. So the page is consuming the in the data in the desired format but is accessed directly from the server, not through a request from the browser.

- Templating tool used is Pug

- I use Sass for styles, but generated css is pushed in the code for this test case. Ideally the css wouldn't be pushed and would be created on deploy of the code.