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
        'bg-light': '#F0FAF0',
        'text-dark': '#1A2E1A',
        'green-primary': '#2E7D32',
        'green-dark': '#1B5E20',
        'green-light': '#81C784',
        'green-pale': '#E8F5E9',
        'hero-fresh': '#5F9349',
        'hero-organic': '#9BC886',
        'cream-card': '#FBF0D9',
        'orange-accent': '#F57C00',
        'red-badge': '#E53935',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(46, 125, 50, 0.1)',
        hover: '0 8px 32px rgba(46, 125, 50, 0.18)',
      },
    },
  },
  plugins: [],
};
