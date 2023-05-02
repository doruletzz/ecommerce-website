/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '256': '48rem',
      },
      aspectRatio: {
        'card': '6 / 7'
      },
      keyframes: {
        'infiniteScroll': {
          '0%': { transform: 'translateX(var(--infinite-scroll-total-width))'},
          '100%': { transform: 'translateX(0)'},
        },
        'slideUp': {
          '0%': {
            opacity: '0', 
            transform: 'translateY(1rem)'},
          '66': {
            opacity: '100%', 
          },
          '100%': {
            opacity: '100%', 
            transform: 'translateY(0)'
          },
        },
        'slideRight': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)'
          },
        },
        'slideLeft': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        }
      },
      fontFamily: {
        'display': ['Space Mono', 'serif'],
        'body': ['Spline Sans', 'sans-serif'],
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(.88,-0.01,.12,1)',
        'in-expo': 'cubic-bezier(0,.77,.12,1)',
        'out-expo': 'cubic-bezier(.69,-0.01,.96,.49)',
      },
      transitionProperty: {
        'width': 'width'
      },
      animation: {
        'inifinte-scroll': 'infiniteScroll 40s linear infinite',
        'slide-up': 'slideUp 1.3s cubic-bezier(.88,-0.01,.12,1)',
        'slide-right': 'slideRight 1.3s cubic-bezier(.88,-0.01,.12,1)',
        'slide-left': 'slideLeft 1.3s cubic-bezier(.88,-0.01,.12,1)'
      },
    },
  },
  plugins: [],
}

