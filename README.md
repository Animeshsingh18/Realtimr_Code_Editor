# Real-time Collaborative Code Editor

![Demo Screenshot](https://via.placeholder.com/800x400?text=Real-time+Collaborative+Editor+Demo) 
*(Replace with actual screenshot)*

A powerful web application that enables multiple developers to write, edit, and execute code together in synchronized rooms. Built with modern web technologies, it provides seamless real-time collaboration with live code synchronization, multi-language support, and integrated code execution capabilities.

## 🌟 Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously with instant synchronization
- **Multi-language Support**: JavaScript, Python, Java, and C++ with syntax highlighting
- **Code Execution**: Execute code directly in the browser using Piston API
- **Room Management**: Create/join custom rooms with user presence indicators
- **Live Typing Indicators**: Visual feedback showing active typers
- **Professional Editor**: VS Code-powered Monaco Editor with IntelliSense
- **Graceful Disconnect Handling**: Automatic cleanup on user disconnect

## 🛠 Technologies Used

| Component        | Technology |
|------------------|------------|
| Frontend         | React, Monaco Editor |
| Backend          | Node.js, Express |
| Real-time        | Socket.IO |
| Code Execution   | Piston API |
| HTTP Client      | Axios |

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/realtime-code-editor.git
cd realtime-code-editor

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Build the frontend
cd frontend
npm run build
cd ..

# Start the development server
npm start
