/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        'primary-dark': '#1B5E20',
        'primary-light': '#81C784',
        leaf: '#A5D6A7',
        'organic-brown': '#8D6E63',
        tomato: '#E53935',
        carrot: '#F57C00',
        'bg-light': '#F5F5F5',
        'text-dark': '#2C3E50',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
