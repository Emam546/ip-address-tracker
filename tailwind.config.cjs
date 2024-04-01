/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "very-dark-gray": " hsl(0, 0%, 17%)",
                "dark-gray": "hsl(0, 0%, 59%)",
                white: "#fff",
                warning: "#c9202e",
            },
        },
    },
    mode: "jit",
    plugins: [],
};
