/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fresh-green': '#2E7D32',
        'fresh-green-dark': '#1B5E20',
        'light-green': '#81C784',
        'leaf-green': '#A5D6A7',
        'organic-brown': '#8D6E63',
        'dark-gray': '#2C3E50',
        'light-gray': '#F5F5F5',
        'tomato-red': '#E53935',
        'carrot-orange': '#F57C00',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
