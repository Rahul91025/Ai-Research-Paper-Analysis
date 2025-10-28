# AI Research Assistant

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**AI-Powered Research Paper Generation & Collaboration Platform**

[ Live Demo](https://your-app-url.vercel.app) • [📖 Documentation](#documentation) • [🛠️ API Reference](#api-reference)

</div>

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Key Features](#-key-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [🔧 Environment Setup](#-environment-setup)
- [📁 Project Structure](#-project-structure)
- [🔌 API Reference](#-api-reference)
- [🎨 Usage](#-usage)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Overview

AI Research Assistant is a cutting-edge platform that revolutionizes research paper analysis and generation through advanced artificial intelligence. Built for researchers, academics, and AI enthusiasts, it provides comprehensive tools for generating, analyzing, and collaborating on research papers with unprecedented efficiency.

### 🎯 Core Mission

Transform complex research workflows into streamlined, AI-powered processes that accelerate scientific discovery and collaboration.

---

## 🚀 Key Features

### 🤖 AI-Powered Analysis
- **Intelligent Paper Generation**: Generate complete research papers using Google Gemini AI
- **Advanced Summarization**: Extract key insights and summaries from complex documents
- **Smart Citation Analysis**: Automated citation graph generation and relationship mapping
- **Trend Analysis**: Real-time research trend identification and analytics

### 🎙️ Voice Integration
- **Voice Commands**: Natural language voice control for platform navigation
- **Transcription Services**: Real-time audio-to-text conversion via Vapi.ai
- **Voice Assistant**: Interactive AI assistant for research queries

### 👥 Collaboration Tools
- **Real-time Collaboration**: Multi-user editing and annotation capabilities
- **Knowledge Graphs**: Interactive visualization of research connections
- **Team Management**: Advanced collaborator management and permissions
- **Shared Workspaces**: Organized research project spaces

### 🔍 Research Intelligence
- **Plagiarism Detection**: Advanced content originality verification
- **Citation Fetching**: Automated academic citation retrieval
- **PDF Processing**: Intelligent document parsing and analysis
- **Export Capabilities**: Multi-format export (PDF, DOCX)

### 🔐 Security & Authentication
- **Clerk Authentication**: Secure user management and authentication
- **Role-based Access**: Granular permission controls
- **Data Privacy**: Enterprise-grade security measures

---

## 🛠️ Tech Stack

### Frontend
```typescript
- Next.js 15.5.6        // React Framework
- React 19.1.0          // UI Library
- TypeScript 5.0        // Type Safety
- Tailwind CSS 4.0      // Styling
- Framer Motion         // Animations
- Lucide React         // Icons
```

### Backend & Database
```typescript
- MongoDB 8.0           // NoSQL Database
- Mongoose              // ODM
- Next.js API Routes    // Backend Logic
```

### AI & External Services
```typescript
- Google Gemini AI      // AI Processing
- Vapi.ai              // Voice Services
- Clerk                // Authentication
```

### Development Tools
```typescript
- ESLint               // Code Linting
- Turbopack            // Fast Builds
- Socket.io            // Real-time Features
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Git** for version control

### Required API Keys
- Google Gemini AI API Key
- Vapi.ai API Key
- Clerk Authentication Keys

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-research-assistant.git
cd ai-research-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 4. Database Setup
```bash
# Ensure MongoDB is running locally or configure cloud connection
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-research-assistant
# Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-research-assistant

# AI Services
GEMINI_API_KEY=your_google_gemini_api_key_here
VAPI_API_KEY=your_vapi_api_key_here

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Optional: Analytics and Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
```

### Environment Variables Explanation

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `VAPI_API_KEY` | Vapi.ai voice service API key | Yes |
| `CLERK_SECRET_KEY` | Clerk authentication secret | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Yes |

---

## 📁 Project Structure

```
ai-research-assistant/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   └── clerk/            # Clerk integration
│   │   └── research/             # Research-related APIs
│   │       ├── [id]/             # Dynamic research routes
│   │       ├── advanced/         # Advanced analysis
│   │       ├── collaborators/    # Collaboration features
│   │       ├── generate/         # Paper generation
│   │       ├── insights/         # Research insights
│   │       └── voice/            # Voice integration
│   ├── dashboard/                # User dashboard
│   ├── research/                 # Research pages
│   │   ├── [id]/                 # Individual research views
│   │   │   ├── editor/           # Paper editor
│   │   │   ├── insights/         # Insights dashboard
│   │   │   ├── advanced.tsx      # Advanced analysis
│   │   │   └── layout.tsx        # Research layout
│   │   ├── generate/             # Paper generation
│   │   ├── showcase/             # Research showcase
│   │   └── page.jsx              # Research hub
│   ├── sign-in/                  # Authentication
│   ├── sign-up/                  # User registration
│   ├── about/                    # About page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # Reusable Components
│   ├── ui/                       # UI Components (shadcn/ui)
│   ├── Collaborators.tsx         # Collaboration component
│   ├── ExportButtons.tsx         # Export functionality
│   ├── KnowledgeGraph.tsx        # Graph visualization
│   ├── Navbar.jsx                # Navigation bar
│   ├── PaperCard.tsx             # Paper display card
│   ├── PromptPlayground.tsx      # AI prompt interface
│   └── VoiceAssistant.tsx        # Voice interaction
├── lib/                          # Utility Libraries
│   ├── citationFetcher.ts        # Citation retrieval
│   ├── citationGraph.ts          # Citation graph logic
│   ├── export.ts                 # Export utilities
│   ├── gemini.ts                 # Gemini AI integration
│   ├── mongodb.ts                # Database connection
│   ├── pdfParser.ts              # PDF processing
│   ├── plagiarism.ts             # Plagiarism detection
│   ├── trendAnalyzer.ts          # Trend analysis
│   ├── utils.ts                  # General utilities
│   └── vapi.ts                   # Voice API integration
├── public/                       # Static Assets
│   ├── Ai1.png                   # App logo
│   └── [other assets]            # Icons and images
├── styles/                       # Additional Styles
├── types/                        # TypeScript Definitions
│   └── index.ts                  # Global types
├── middleware.ts                 # Next.js Middleware
├── next.config.ts                # Next.js Configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS Config
├── tsconfig.json                 # TypeScript Config
├── vercel.json                   # Vercel Deployment Config
└── README.md                     # This file
```

---

## 🔌 API Reference

### Authentication Endpoints

#### POST `/api/auth/clerk`
Handles Clerk authentication webhooks.

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication processed"
}
```

### Research Endpoints

#### GET `/api/research`
Retrieve all research papers for authenticated user.

**Response:**
```json
{
  "papers": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### POST `/api/research`
Create a new research paper.

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "tags": ["string"]
}
```

#### GET `/api/research/[id]`
Get specific research paper details.

#### PUT `/api/research/[id]`
Update research paper.

#### DELETE `/api/research/[id]`
Delete research paper.

#### POST `/api/research/generate`
Generate new research paper using AI.

**Request Body:**
```json
{
  "topic": "string",
  "length": "number",
  "style": "string"
}
```

#### POST `/api/research/insights`
Extract insights from research paper.

#### POST `/api/research/voice`
Process voice commands.

#### POST `/api/research/advanced`
Perform advanced analysis.

#### GET `/api/research/collaborators`
Get collaborators for a research project.

---

## 🎨 Usage

### For Researchers

1. **Sign Up/Login**: Create account using Clerk authentication
2. **Dashboard Access**: Navigate to your personalized dashboard
3. **Paper Generation**: Use AI to generate research papers
4. **Analysis**: Upload PDFs for intelligent analysis
5. **Collaboration**: Invite team members to collaborate
6. **Export**: Download papers in multiple formats

### For Developers

```typescript
// Example: Generate research paper
const response = await fetch('/api/research/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: 'Machine Learning in Healthcare',
    length: 5000,
    style: 'academic'
  })
});

const paper = await response.json();
```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Push code to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables on Vercel**
   ```
   MONGODB_URI
   GEMINI_API_KEY
   VAPI_API_KEY
   CLERK_SECRET_KEY
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   ```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write comprehensive tests
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 AI Research Assistant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powering our AI capabilities
- **Vapi.ai** for voice integration
- **Clerk** for authentication services
- **MongoDB** for database solutions
- **Vercel** for hosting platform
- **Next.js** team for the amazing framework

### Special Thanks

- Research community for inspiration
- Open source contributors
- Beta testers and early adopters

---

<div align="center">

**Made with ❤️ for the research community**

[⬆️ Back to Top](#-ai-research-assistant)

</div>
