# Professional React Components Library

A collection of reusable UI components built with React, TypeScript, and Tailwind CSS, featuring comprehensive Storybook documentation.

## 🚀 Components

### InputField
A versatile input field component with:
- **Multiple variants**: default, filled, outline
- **Different sizes**: small, medium, large  
- **Built-in validation**: error and success states
- **Icon support**: left and right icons
- **Password toggle**: show/hide functionality
- **Accessibility**: ARIA labels, keyboard navigation
- **TypeScript**: Full type safety

### DataTable
A powerful data table component with:
- **Sorting**: Click headers to sort by column
- **Pagination**: Configurable page sizes
- **Search**: Global search across columns
- **Row selection**: Single or multiple selection
- **Custom rendering**: Custom cell renderers
- **Responsive**: Mobile-friendly design
- **Loading states**: Built-in loading indicators
- **TypeScript**: Generic support for type safety

## 🎨 Design System

- **Professional color palette** with HSL values
- **Semantic design tokens** for consistency
- **Dark/light mode support** via CSS custom properties
- **Accessible contrast ratios** meeting WCAG guidelines
- **Smooth animations** and transitions

## 📦 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-components-library

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Usage

```tsx import { InputField, DataTable } from './components';

// InputField example
<InputField
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  leftIcon={<Mail />}
  required
/>

// DataTable example
<DataTable
  data={users}
  columns={columns}
  searchable
  selectable
  pagination
/>
```

## 📚 Storybook Documentation

Access comprehensive component documentation and interactive examples:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` with:
- **Interactive controls** for all props
- **Multiple examples** showing different use cases
- **Documentation** with prop tables
- **Dark/light mode** toggle
- **Responsive testing** tools

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── InputField.tsx          # Input component
│   ├── InputField.stories.tsx  # Input Storybook stories
│   ├── DataTable.tsx           # Table component
│   └── DataTable.stories.tsx   # Table Storybook stories
├── pages/
│   └── Index.tsx               # Demo page
├── index.css                   # Design system tokens
└── main.tsx                    # App entry point
```

## 🎯 Features

- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **Accessibility** - WCAG compliant components
- ✅ **Responsive** - Mobile-first design approach
- ✅ **Customizable** - Extensive prop APIs
- ✅ **Documented** - Comprehensive Storybook docs
- ✅ **Tested** - Interactive testing in Storybook
- ✅ **Design System** - Consistent theming approach
- ✅ **Performance** - Optimized React components

## 🎨 Customization

All components use the design system defined in `src/index.css`. Customize colors, spacing, and other design tokens:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... other tokens */
}
```

## 📱 Responsive Design

Components are built mobile-first with responsive breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## ♿ Accessibility

- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Proper ARIA labels and roles
- **Focus Management** - Visible focus indicators
- **Color Contrast** - WCAG AA compliant ratios
- **Semantic HTML** - Proper HTML structure

## 🚀 Deployment

### Storybook Deployment

Deploy Storybook to showcase your components:

```bash
npm run build-storybook
# Deploy the storybook-static folder to your hosting provider
```

### Production Build

```bash
npm run build
# Deploy the dist folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update Storybook stories
5. Test your changes
6. Submit a pull request

## 📄 License

MIT License - feel free to use these components in your projects!

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Storybook Documentation](https://your-storybook-url.com)
- [GitHub Repository](https://github.com/your-username/react-components-library)