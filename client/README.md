# Soham J Suryawanshi - Portfolio

A futuristic, modern portfolio website with dark/light themes, glassmorphism effects, and advanced animations built with TypeScript and Tailwind CSS v3.

## Features

### Design & UI
- **Futuristic Design**: Modern glassmorphism effects with backdrop blur
- **Dark/Light Mode**: Fully functional theme toggle with persistent storage
- **Gradient Accents**: Eye-catching gradient text and animated backgrounds
- **Neon Color Palette**: Vibrant accent colors for a modern tech feel

### Animations & Motion
- **Parallax Scrolling**: Hero section with subtle parallax effect
- **Floating Profile Picture**: Smooth floating animation on profile image
- **Staggered Fade-ins**: Elements animate in sequence as you scroll
- **3D Card Tilt**: Interactive card hover effects with perspective transforms
- **Cursor Trail Effect**: Futuristic cursor trail animation
- **Smooth Transitions**: All interactions feature polished transitions

### User Experience
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Scrolling**: Butter-smooth navigation between sections
- **Interactive Elements**: Hover effects, scale animations, and glow effects
- **Optimized Performance**: Fast loading with Vite bundler
- **Professional Sections**: About, Experience, Projects, Skills, Contact

## Tech Stack

- TypeScript
- Tailwind CSS v3
- Vite
- HTML5
- CSS3

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/OneTeraByte7/sohamjs.git
cd sohamjs
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Adding Your Images

Please read the [IMAGE_GUIDE.md](IMAGE_GUIDE.md) file for detailed instructions on where to place your images.

Quick summary:
- Profile photo: `public/images/profile/profile.jpg`
- Project 1 image: `public/images/projects/project1.jpg`
- Project 2 image: `public/images/projects/project2.jpg`
- Project 3 image: `public/images/projects/project3.jpg`

## Customization

### Updating Content

All content is in the `index.html` file. You can easily update:
- Personal information
- Experience details
- Project descriptions
- Skills
- Contact information

### Changing Colors

Edit the `tailwind.config.js` file to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3b82f6',    // Light mode primary
        dark: '#60a5fa',       // Dark mode primary
      },
      secondary: {
        DEFAULT: '#1e293b',    // Light mode secondary
        dark: '#0f172a',       // Dark mode secondary
      },
      accent: {
        DEFAULT: '#06b6d4',    // Light mode accent
        dark: '#22d3ee',       // Dark mode accent
      },
      neon: {
        blue: '#00f0ff',       // Neon accents
        purple: '#a855f7',
        pink: '#ec4899',
        green: '#10b981',
      },
    },
  },
}
```

### Theme Toggle

The theme toggle automatically:
- Detects system preference on first visit
- Saves user preference in localStorage
- Syncs between desktop and mobile toggles
- Applies smooth transitions when switching

## Project Structure

```
sohamjs/
├── public/
│   └── images/
│       ├── profile/
│       │   └── profile.jpg
│       └── projects/
│           ├── project1.jpg
│           ├── project2.jpg
│           └── project3.jpg
├── src/
│   ├── main.ts
│   └── style.css
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

## Deployment

You can deploy this portfolio to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply build the project and upload the `dist` folder.

## License

ISC

## Author

Soham J Suryawanshi
- Email: justforcoding13@gmail.com
- GitHub: [@OneTeraByte7](https://github.com/OneTeraByte7)
- LinkedIn: [soham-suryawanshi](https://linkedin.com/in/soham-suryawanshi)
