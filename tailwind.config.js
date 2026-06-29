/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Green palette
        'green-primary': '#2E7D32',
        'green-dark': '#1B5E20',
        'green-light': '#81C784',
        'green-pale': '#E8F5E9',

        // Aliases for Minahil's admin panel
        primary: '#2E7D32',
        primaryDark: '#1B5E20',
        secondary: '#81C784',

        // Text & backgrounds
        'text-dark': '#1A2E1A',
        'bg-light': '#F0FAF0',
        darkGray: '#2C3E50',
        lightGray: '#F5F5F5',

        // Hero colors
        'hero-fresh': '#5F9349',
        'hero-organic': '#9BC886',
        'cream-card': '#FBF0D9',

        // Accent colors
        tomato: '#E53935',
        'red-badge': '#E53935',
        carrot: '#F57C00',
        'orange-accent': '#F57C00',
        leaf: '#A5D6A7',
        organic: '#8D6E63',
        'organic-brown': '#8D6E63',
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
