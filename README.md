# OpticShield Landing Page

A modern, dark-themed landing page built with React and Vite.

## 📁 Project Structure

```
Landing-Page/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Top navigation bar
│   │   ├── Header.css       # Header styles
│   │   ├── HeroSection.jsx  # Main "System Failure" section
│   │   ├── HeroSection.css  # Hero section styles
│   │   ├── AddPerson.jsx    # Add person form
│   │   ├── AddPerson.css    # Form styles
│   │   ├── Footer.jsx       # Bottom footer with CTA
│   │   └── Footer.css       # Footer styles
│   ├── App.jsx              # Main app component (layout orchestration)
│   ├── App.css              # Global layout styles
│   ├── index.css            # Global base styles
│   └── main.jsx             # React entry point
├── public/                  # Static assets
├── index.html               # HTML template
└── package.json             # Dependencies

```

## 🧩 Component Overview

### Header (`Header.jsx`)
- **Purpose**: Top navigation bar with logo and menu items
- **Features**: 
  - OpticShield™ branding
  - Navigation links: Studio, Packages, Contact
  - Glassmorphism effect with backdrop blur
  - Fixed positioning

### HeroSection (`HeroSection.jsx`)
- **Purpose**: Main content area showcasing the problem statement
- **Features**:
  - Large "System Failure" title
  - Problem description with ERR_01 label
  - Animated progress bar
  - Section numbering [002]

### AddPerson (`AddPerson.jsx`)
- **Purpose**: Form for adding new person entries
- **Features**:
  - Input fields: Name, Person ID, Flag, Metadata
  - File upload for images
  - Action buttons: Use Camera, Submit, Reset
  - Dark theme glassmorphism card

### Footer (`Footer.jsx`)
- **Purpose**: Bottom action bar with status and CTA
- **Features**:
  - Client acceptance status indicator
  - Animated scroll indicator
  - Book appointment CTA button
  - Fixed positioning

## 🎨 Styling Architecture

Each component has its own CSS file following these principles:

- **Scoped Styles**: Component-specific styles in individual CSS files
- **App.css**: Only layout and grid styles
- **index.css**: Global resets and base styles
- **Naming Convention**: BEM-inspired class names for clarity

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Server runs at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

## 🎯 Design Principles

1. **Component Modularity**: Each UI section is a separate, reusable component
2. **Separation of Concerns**: JSX logic separated from CSS styling
3. **Dark Theme**: Consistent dark color palette with glassmorphism
4. **Responsive Design**: Mobile-friendly with media queries
5. **Accessibility**: Semantic HTML and proper ARIA labels

## 🔧 Technology Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **CSS3**: Styling with modern features (backdrop-filter, grid, animations)
- **ESLint**: Code quality and consistency

## 📝 Code Style Guidelines

- Use functional components with hooks
- Import CSS at the top of each component file
- Keep components focused and single-purpose
- Use descriptive class names
- Comment complex logic

## 🤝 For New Team Members

1. **Understanding the Layout**: Start by reviewing `App.jsx` to see how components are composed
2. **Component Structure**: Each component follows the pattern:
   - Import CSS
   - Define component function
   - Return JSX
   - Export default
3. **Styling**: Modify component-specific CSS files, not global styles
4. **Adding Features**: Create new components in `/src/components/` with matching CSS files

## 📄 License

Private project for OpticShield
