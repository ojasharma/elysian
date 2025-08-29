// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 15s linear infinite',
      },
    },
  },
  plugins: [],
};
