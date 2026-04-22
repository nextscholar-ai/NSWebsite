# Next Scholar - Foundation Mastery Program

Next Scholar is a premium web platform for an online coaching academy focused on Mathematics, Science, and English. The application features a high-fidelity design, interactive mastery ladders, success feeds, and an integrated admission enquiry system.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd NEXT-SCHOLAR
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless CMS for hero, about, program, and partner content)
- **Email Service**: [EmailJS](https://www.emailjs.com/) (For admission enquiries)
- **Styling**: Vanilla CSS with modern Glassmorphism and CSS Variables.

---

## 🏗 Project Structure

- `src/App.jsx`: Main entry point containing the Layout and Navigation logic.
- `src/AboutSection.jsx`: Detailed information about the platform.
- `src/ProgramOverview.jsx`: Mastery progression visuals.
- `src/EnquiryForm.jsx`: Interactive modal for admissions via Email and WhatsApp.
- `src/sanityClient.js`: Connection configuration for Sanity CMS.
- `src/sanityService.js`: Data fetching logic from the headless CMS.
- `public/`: Static assets such as background images and icons.

---

## ⚙️ Configuration

### Sanity CMS
The project connects to a Sanity project for dynamic content. If you need to point to a different project, update `src/sanityClient.js` with your specific `projectId` and `dataset`.

### EmailJS
The enquiry form uses EmailJS. The service ID, template ID, and public key are initialized in `src/EnquiryForm.jsx`. Ensure you update these with your own credentials if you are deploying a fork of this project.

---

## 📦 Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Docker
The project includes a `Dockerfile` and `docker-compose.yml` for containerized environments.
```bash
docker-compose up -d
```

---

## 📄 License
Internal use for Next Scholar. All rights reserved.
