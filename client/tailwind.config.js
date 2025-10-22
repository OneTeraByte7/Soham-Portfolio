/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Futuristic color palette
        cyber: {
          blue: {
            50: '#e6f7ff',
            100: '#b3e5ff',
            200: '#80d4ff',
            300: '#4dc2ff',
            400: '#1ab1ff',
            500: '#00a0ff', // Primary blue
            600: '#0080cc',
            700: '#006099',
            800: '#004066',
            900: '#002033',
          },
          green: {
            50: '#e6fff2',
            100: '#b3ffd9',
            200: '#80ffc0',
            300: '#4dffa7',
            400: '#1aff8e',
            500: '#00ff75', // Neon green
            600: '#00cc5e',
            700: '#009947',
            800: '#00662f',
            900: '#003318',
          },
          orange: {
            50: '#fff4e6',
            100: '#ffd9b3',
            200: '#ffbf80',
            300: '#ffa44d',
            400: '#ff8a1a',
            500: '#ff6f00', // Vibrant orange
            600: '#cc5900',
            700: '#994200',
            800: '#662c00',
            900: '#331600',
          },
          purple: {
            50: '#f4e6ff',
            100: '#d9b3ff',
            200: '#bf80ff',
            300: '#a44dff',
            400: '#8a1aff',
            500: '#7000ff', // Electric purple
            600: '#5a00cc',
            700: '#430099',
            800: '#2d0066',
            900: '#160033',
          },
        },
        // Dark theme colors
        dark: {
          bg: '#0a0a0f',
          surface: '#14141f',
          elevated: '#1e1e2e',
          border: '#2a2a3e',
        },
        // Light theme colors
        light: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          elevated: '#ffffff',
          border: '#e0e0e0',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cosmic': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ff6f00 0%, #ff8a1a 50%, #ffa44d 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #00a0ff 0%, #00ff75 100%)',
        'gradient-purple': 'linear-gradient(135deg, #7000ff 0%, #a44dff 100%)',
        'gradient-cyber': 'linear-gradient(135deg, #00a0ff 0%, #00ff75 25%, #ff6f00 50%, #7000ff 75%, #00a0ff 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 160, 255, 0.5), 0 0 40px rgba(0, 160, 255, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 117, 0.5), 0 0 40px rgba(0, 255, 117, 0.3)',
        'neon-orange': '0 0 20px rgba(255, 111, 0, 0.5), 0 0 40px rgba(255, 111, 0, 0.3)',
        'neon-purple': '0 0 20px rgba(112, 0, 255, 0.5), 0 0 40px rgba(112, 0, 255, 0.3)',
        'cyber': '0 8px 32px 0 rgba(0, 160, 255, 0.2)',
        'cyber-lg': '0 12px 48px 0 rgba(0, 160, 255, 0.3)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
