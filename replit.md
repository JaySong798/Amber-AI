# Amber AI - Dunhuang Cultural Exploration Platform

## Overview

Amber AI is a web-based cultural exploration platform that uses OpenAI's API to provide interactive conversations about Dunhuang art, history, and spiritual heritage. The application is built as a full-stack TypeScript application with a React frontend and Express.js backend, designed to make Chinese cultural heritage accessible through AI-powered educational content.

## Recent Changes (December 2024)

- **Complete UI Modernization**: Transformed entire interface from ancient-themed design to modern, professional company website aesthetic
- **Color Block Layout**: Implemented concise color-block design inspired by modern company websites with dark turquoise blue (#0891b2) and yellow-orange (#f97316) theme colors
- **Enhanced Visual Hierarchy**: Created distinct sections using strategic color contrast - primary content in colored blocks, secondary content in white cards
- **Grid-Based Response Layout**: Restructured AI responses into organized grid layout with Overview, Visual Elements, Cultural Context, Historical Timeline, and exploration sections
- **Simplified Navigation**: Streamlined interface removing complex sidebar in favor of clean single-page layout with embedded quick-start suggestions
- **Modern Typography**: Updated section titles and improved content organization for better readability
- **Brand Integration**: Added official hexagonal logo with deer silhouette to header and welcome sections, complementing the modern color scheme

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme for Amber AI branding
- **State Management**: TanStack Query for server state and local React state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured chat endpoints
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with Vite integration in development mode

### Data Flow
1. User submits questions about Dunhuang culture through the chat interface
2. Frontend validates input and sends structured requests to `/api/chat`
3. Backend processes requests using OpenAI API with specialized prompts
4. AI responses are structured into educational sections (introduction, artistic features, historical significance, cultural background, follow-up questions)
5. Frontend renders structured responses with interactive elements

## Key Components

### Chat System
- **ChatInterface**: Main conversation component with message history
- **Message**: Renders both user and AI messages with structured content display
- **LoadingMessage**: Shows thinking state while AI generates responses
- **Sidebar**: Provides quick-start questions and topic navigation

### AI Integration
- **Sequential Generation**: Introduction first, then other sections build upon it to avoid repetition
- **Overarching Style Guide**: Universal storytelling approach emphasizing vivid descriptions and accessibility
- **Summary-Based Introduction**: Introduction serves as captivating gateway into Dunhuang's world
- **Distinct Section Content**: Each section focuses exclusively on its domain without overlap
- **Storytelling Focus**: Rich, descriptive language that brings ancient Dunhuang to life
- **Accessibility-First**: Designed for users with no prior knowledge, using engaging analogies
- **Cultural Immersion**: Transport readers to ancient caves through sensory details and narratives
- **Concise Follow-ups**: Short, specific questions (8-10 words) based on section content
- **Multi-language Support**: Supports English and Chinese conversations

### UI Components
- **Modern Design System**: Dark turquoise blue and yellow-orange theme colors with proper contrast
- **Contemporary Aesthetics**: Clean, modern interface moving away from ancient styling
- **Enhanced Visual Hierarchy**: Distinct section styling with hover effects and smooth transitions
- **Responsive Layout**: Mobile-first design with collapsible sidebar
- **Accessibility**: ARIA-compliant components from Radix UI

## External Dependencies

### Core Dependencies
- **OpenAI API**: Primary AI service for generating cultural content
- **Neon Database**: PostgreSQL database (configured but not actively used yet)
- **Drizzle ORM**: Database toolkit for PostgreSQL integration

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling with Zod validation

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and development experience
- **ESBuild**: Production bundling for server code
- **Replit Integration**: Development environment integration

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with hot reload
- **Environment**: NODE_ENV=development with Replit-specific optimizations
- **API Integration**: Direct OpenAI API calls with environment variable configuration

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Environment**: NODE_ENV=production for optimized performance

### Configuration
- **Database**: PostgreSQL with Drizzle migrations ready for future expansion
- **API Keys**: OpenAI API key required via environment variables
- **TypeScript**: Strict mode enabled with comprehensive type checking

The application is designed to be easily deployable on various platforms while maintaining development-friendly hot reload capabilities in the Replit environment.