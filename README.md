# AI Research Assistant

An AI-powered research paper generation and collaboration platform built with Next.js, TypeScript, and modern web technologies.

## Features

- **AI-Powered Paper Generation**: Generate complete research papers using Google Gemini AI
- **Voice Assistant Integration**: Voice commands and transcription via Vapi.ai
- **Collaborative Research**: Real-time collaboration features
- **Citation Analysis**: Automatic citation graph generation and analysis
- **Plagiarism Detection**: Built-in plagiarism checking
- **Trend Analysis**: Research trend insights and analytics
- **Export Options**: Export papers to PDF and DOCX formats
- **Authentication**: Secure authentication with Clerk

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **AI Services**: Google Gemini AI, Vapi.ai
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- API keys for:
  - Google Gemini AI
  - Vapi.ai
  - Clerk

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
VAPI_API_KEY=your_vapi_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

### Prerequisites

- Vercel account
- GitHub repository

### Steps

1. **Connect Repository**: Connect your GitHub repository to Vercel

2. **Environment Variables**: In your Vercel dashboard, add the following environment variables:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
   - `VAPI_API_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

3. **Deploy**: Vercel will automatically build and deploy your application

### Build Commands

- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`

## Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── research/          # Research-related pages
│   └── ...
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
