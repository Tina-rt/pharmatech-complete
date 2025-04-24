/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    plugins: [
      require('daisyui'),
    ],
    daisyUi:{
      themes: ['emerald', 'cupcake'],
      base: false
    }
};
