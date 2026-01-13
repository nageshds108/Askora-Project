

📋 Overview
Askora 🤖A modern AI-powered chat application with conversation history, built with React, Node.js, Express, and MongoDB. Features a sleek dark-themed UI similar to ChatGPT.
Askora is a full-stack AI chat application that allows users to have intelligent conversations with an AI assistant powered by Meta's Llama 3.1 model via OpenRouter.
The application features persistent conversation threads, real-time message streaming, markdown rendering with code syntax highlighting, and a responsive user interface.✨ Features
AI-Powered Conversations

Integration with Meta Llama 3.1 8B Instruct via OpenRouter
Real-time streaming responses with typewriter effect
Context-aware conversations within threads

🔗 Live Demo: https://major-project-2-z7bc.onrender.com/



Thread Management
-Create unlimited conversation threads
-Automatic thread title generation from first message
-View and switch between multiple conversation threads
-Delete individual threads
-Persistent thread history

Rich Text Support
-Markdown rendering for AI responses
-Code syntax highlighting with highlight.js
-GitHub Dark theme for code blocks
-Proper formatting for lists, headers, and links

Modern UI/UX
-Dark-themed interface with smooth animations
-Responsive design for all screen sizes
-Loading indicators during AI responses
-Highlighted active thread in sidebar
-User profile dropdown menu

Real-time Updates
-Automatic thread list updates
-Live message streaming
-Instant UI feedback

🛠️ Technologies Used
-React 18 - UI library with hooks
-React Context API - Global state management
-React Markdown - Markdown rendering
-rehype-highlight - Code syntax highlighting
-highlight.js - Syntax highlighting engine
-react-spinners - Loading animations
-UUID - Unique identifier generation
-Font Awesome - Icon library

Backend
-Node.js - Runtime environment
-Express.js - Web framework
-MongoDB - NoSQL database
-Mongoose - MongoDB ODM
-CORS - Cross-origin resource sharing

AI Integration
-OpenRouter API - AI model gateway
-OpenAI SDK - API client for OpenRouter
-Meta Llama 3.1 8B Instruct - Language model

🎨 Key Features in Detail

Conversation Threading

Each conversation is stored as a separate thread with a unique ID
Threads are automatically created on first message
Thread titles are generated from the first user message
Threads are sorted by most recently updated

Message Streaming Animation

AI responses are displayed with a typewriter effect
Words appear progressively for a natural reading experience
Smooth scrolling to keep latest messages in view
Animation speed: 40ms per word

Markdown & Code Highlighting

Full markdown support in AI responses
Syntax highlighting for code blocks
GitHub Dark theme for code
Support for inline code and code blocks
Proper rendering of lists, links, and formatting

State Management

React Context API for global state
Efficient state updates to prevent unnecessary re-renders
Persistent state across component lifecycle
Real-time synchronization between components

User Interface

Responsive design that works on desktop and mobile
Dark theme optimized for readability
Smooth transitions and hover effects
Loading indicators during API calls
Scroll-to-bottom on new messages



🚀 Future Enhancements
-User authentication and authorization
-Multiple AI model selection
-File upload and image analysis
-Voice input/output capabilities
-Thread sharing and collaboration
-Message editing and regeneration
-Dark/Light theme toggle

🌐 Deployment 
-This application is deployed on Render.com (Both Frontend And Backend)

💡 Found a bug?
-Open an issue and let's fix it together!
