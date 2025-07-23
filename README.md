# Amber AI - Dunhuang Cultural Exploration Platform

![Amber AI Logo](./attached_assets/logo_1753228482637.png)

An advanced AI-powered cultural exploration platform that provides immersive, interactive educational experiences about Dunhuang art and heritage through intelligent conversation and multimedia engagement.

## Features

- **AI-Powered Conversations**: Interactive exploration of Dunhuang culture using OpenAI GPT-4o
- **Modern Design**: Clean, professional interface with turquoise blue and yellow-orange theme
- **Structured Responses**: Educational content organized into:
  - Introduction to topics
  - Artistic features analysis
  - Historical significance
  - Cultural context with Buddhist tales and folklore
  - Follow-up exploration questions
- **Multilingual Support**: Available in English and Chinese
- **Responsive Design**: Mobile-first approach with modern UI components

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** components built on Radix UI
- **TanStack Query** for server state management
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **OpenAI API** integration for cultural content generation
- **Zod** for schema validation
- **Drizzle ORM** ready for PostgreSQL integration

## Getting Started

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/amber-ai-dunhuang.git
cd amber-ai-dunhuang
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and types
├── server/                 # Express.js backend
│   ├── services/           # Business logic
│   └── routes.ts           # API routes
├── shared/                 # Shared schemas and types
└── attached_assets/        # Static assets and logos
```

## API Integration

The platform integrates with OpenAI's GPT-4o model to generate structured educational content about Dunhuang culture. Responses are organized into distinct sections with word limits to ensure concise, focused information.

## Cultural Focus

Amber AI specializes in:
- Dunhuang cave art and Buddhist heritage
- Chinese cultural traditions and folklore
- Historical context of the Silk Road
- Buddhist tales and spiritual narratives
- Art analysis and cultural significance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4o API
- The Dunhuang cultural heritage for inspiration
- Replit for the development environment

---

Built with ❤️ for cultural education and exploration