# ChatFlow - Real-time Chat Application

A modern, real-time chat application built with React, TypeScript, Tailwind CSS, and Supabase. Features include user authentication, real-time messaging, room-based conversations, and a beautiful blue gradient theme with smooth animations.

## Features

✨ **Authentication**
- Email/password authentication with Supabase Auth
- Social login with Google and GitHub (setup required)
- Protected routes and user management
- Automatic profile creation

💬 **Chat System**
- Room-based conversations
- Real-time message polling
- User profiles and avatars
- Message history
- Create and join rooms

🎨 **Modern UI/UX**
- Beautiful blue gradient theme
- Smooth animations with Framer Motion
- Responsive design for all devices
- Progressive loading animations
- Hover effects and micro-interactions

🏗️ **Architecture**
- React with TypeScript
- Supabase for authentication
- Edge Functions with KV store for chat data
- Tailwind CSS for styling
- Motion/React for animations

## Getting Started

This application is pre-configured with Supabase and ready to run! The chat system uses a KV store backend for simplicity and immediate functionality.

### Quick Start

1. **The app is ready to use immediately!**
   - Authentication is already configured
   - Default chat rooms are created automatically
   - No additional setup required

2. **To use social login (optional):**
   - Go to [supabase.com](https://supabase.com/dashboard/project/zlfpplxnuudvefjcimsw)
   - Navigate to Authentication > Providers
   - Enable and configure Google/GitHub with your OAuth credentials

### How It Works

1. **Landing Page**: Beautiful animated introduction
2. **Authentication**: Sign up or log in with email/password
3. **Auto Setup**: Profile and room access configured automatically
4. **Chat Interface**: 
   - Three default rooms: General, Random, and Help
   - Real-time message updates via polling
   - Create additional rooms as needed

### Default Rooms

The app comes with three pre-configured rooms:
- **General**: General discussion for everyone
- **Random**: Off-topic conversations  
- **Help**: Get help and support

### User Features

- ✅ Email/password authentication
- ✅ Automatic profile creation
- ✅ Room-based messaging
- ✅ Real-time message updates
- ✅ Create new rooms
- ✅ Responsive design
- ✅ Beautiful animations

## Database Schema

The application uses the following main tables:

- **profiles**: User profile information
- **rooms**: Chat rooms/channels
- **room_members**: User membership in rooms
- **messages**: Chat messages

All tables have Row Level Security (RLS) enabled for secure data access.

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Key Features Walkthrough

### Authentication Flow
1. Users land on an animated landing page
2. Can sign up or log in with email/password or social providers
3. Automatic profile creation and room assignment
4. Protected chat interface

### Chat Interface
1. **Sidebar**: Shows available rooms with search functionality
2. **Header**: Displays current room info with call/video buttons
3. **Messages**: Real-time message display with animations
4. **Input**: Rich message input with emoji picker and attachments

### Real-time Features
- Messages appear instantly across all connected clients
- Online presence indicators
- Real-time room updates
- Optimistic UI updates

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Motion/React (Framer Motion)
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: Lucide React
- **Notifications**: Sonner

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help setting up the project, please open an issue or contact the maintainers.

---

Built with ❤️ using modern web technologies