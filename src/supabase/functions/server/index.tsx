import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize default data
async function initializeDefaults() {
  try {
    // Create default rooms in KV store if they don't exist
    const existingRooms = await kv.get('rooms') || [];
    if (existingRooms.length === 0) {
      const defaultRooms = [
        {
          id: 'general',
          name: 'General',
          description: 'General discussion for everyone',
          is_private: false,
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'random',
          name: 'Random',
          description: 'Off-topic conversations',
          is_private: false,
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'help',
          name: 'Help',
          description: 'Get help and support',
          is_private: false,
          created_by: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      await kv.set('rooms', defaultRooms);
      console.log('Default rooms created');
    }
  } catch (error) {
    console.error('Error initializing defaults:', error);
  }
}

// Initialize defaults on startup
initializeDefaults();

// Health check endpoint
app.get("/make-server-4528d5a9/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize user profile endpoint
app.post("/make-server-4528d5a9/init-user", async (c) => {
  try {
    const { email, full_name, user_id } = await c.req.json();
    
    // Store user profile in KV store
    const profile = {
      id: user_id,
      email: email,
      full_name: full_name || '',
      username: email?.split('@')[0] || '',
      avatar_url: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Store in KV store with user ID as key
    await kv.set(`profile:${user_id}`, profile);

    // Add user to all default rooms
    const rooms = await kv.get('rooms') || [];
    const userRooms = [];
    
    for (const room of rooms) {
      const membership = {
        id: `${user_id}:${room.id}`,
        room_id: room.id,
        user_id: user_id,
        role: 'member',
        joined_at: new Date().toISOString()
      };
      
      await kv.set(`membership:${user_id}:${room.id}`, membership);
      userRooms.push(room.id);
    }

    // Store user's room list
    await kv.set(`user_rooms:${user_id}`, userRooms);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error in init-user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get user profile
app.get("/make-server-4528d5a9/profile/:user_id", async (c) => {
  try {
    const user_id = c.req.param('user_id');
    const profile = await kv.get(`profile:${user_id}`);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    return c.json(profile);
  } catch (error) {
    console.error('Error getting profile:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get user rooms
app.get("/make-server-4528d5a9/rooms/:user_id", async (c) => {
  try {
    const user_id = c.req.param('user_id');
    const roomIds = await kv.get(`user_rooms:${user_id}`) || [];
    const allRooms = await kv.get('rooms') || [];
    
    const userRooms = allRooms.filter(room => roomIds.includes(room.id));
    
    return c.json(userRooms);
  } catch (error) {
    console.error('Error getting rooms:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get messages for a room
app.get("/make-server-4528d5a9/messages/:room_id", async (c) => {
  try {
    const room_id = c.req.param('room_id');
    const messages = await kv.get(`messages:${room_id}`) || [];
    
    return c.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Send a message
app.post("/make-server-4528d5a9/send-message", async (c) => {
  try {
    const { content, user_id, room_id } = await c.req.json();
    
    const message = {
      id: crypto.randomUUID(),
      content,
      user_id,
      room_id,
      created_at: new Date().toISOString()
    };

    // Get existing messages for this room
    const existingMessages = await kv.get(`messages:${room_id}`) || [];
    existingMessages.push(message);
    
    // Keep only the last 100 messages per room
    if (existingMessages.length > 100) {
      existingMessages.splice(0, existingMessages.length - 100);
    }
    
    // Store updated messages
    await kv.set(`messages:${room_id}`, existingMessages);
    
    return c.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create a new room
app.post("/make-server-4528d5a9/create-room", async (c) => {
  try {
    const { name, description, is_private, created_by } = await c.req.json();
    
    const room = {
      id: crypto.randomUUID(),
      name,
      description: description || '',
      is_private: is_private || false,
      created_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Add to rooms list
    const rooms = await kv.get('rooms') || [];
    rooms.push(room);
    await kv.set('rooms', rooms);
    
    // Add creator to room
    const membership = {
      id: `${created_by}:${room.id}`,
      room_id: room.id,
      user_id: created_by,
      role: 'admin',
      joined_at: new Date().toISOString()
    };
    
    await kv.set(`membership:${created_by}:${room.id}`, membership);
    
    // Update user's room list
    const userRooms = await kv.get(`user_rooms:${created_by}`) || [];
    userRooms.push(room.id);
    await kv.set(`user_rooms:${created_by}`, userRooms);
    
    return c.json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

Deno.serve(app.fetch);