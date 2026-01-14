# CV Builder

An ATS-friendly CV/Resume builder with live preview and PDF export.

**[Live Demo](https://gentritbiba.github.io/cv-builder/)**

## Features

- **ATS-Optimized**: Single-column layout with semantic HTML and labeled contact fields for maximum compatibility with Applicant Tracking Systems
- **Live Preview**: See changes in real-time as you edit
- **PDF Export**: Print to PDF with proper formatting
- **Multiple Positions**: Support for multiple roles within the same company
- **Data Portability**: Import/export your CV data as JSON
- **Local Storage**: Save your progress in the browser

## Tech Stack

- React 19
- TypeScript
- Vite

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Usage

1. Edit your CV using the left panel
2. Preview changes in real-time on the right
3. Click "Save" to store your data in the browser
4. Use "Data" menu to import/export JSON
5. Click "Print PDF" to generate a PDF

## ATS Compatibility

This builder is designed to work well with automated CV screening systems:

- Single-column layout (no multi-column confusion)
- Labeled contact fields (Email:, Phone:, Website:)
- Semantic HTML (`<article>`, `<address>`, `<main>`)
- Standard section headings
- Simple bullet points
- No icons or graphics in the output

## License

MIT
