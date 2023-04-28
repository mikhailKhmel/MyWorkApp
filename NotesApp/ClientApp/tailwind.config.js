/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      keyframes: {
        drop: {
          '0%': {
            'transform': 'translateX(500px)',
            'opacity': 0,
          },
          '100%': {'transform': 'translateX(0px)', 'opacity': 1},
        },
        slide: {
          '0%': {'transform': 'translateX(-300px)', 'color': 'white'},
          '100%': {'transform': 'translateX(0px)'},
        },
        dialog: {
          '0%': {'transform': 'translateX(-500px)', 'opacity': 0},
          '100%': {'transform': 'translateX(0px)'},
        },
        bgdialog: {
          '0%': {'opacity': '0'},
          '100%': {'opacity': '0.5'},
        },
      },
      animation: {
        'drop': 'drop .2s',
        'slide': 'slide .2s ease-out',
        'dialog': 'dialog .2s ease-out',
        'bgdialog': 'bgdialog .2s ease-out',
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};