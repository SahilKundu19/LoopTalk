import React, { createContext, useContext, useEffect, useState } from 'react'
import { Message, Room, Profile } from '../utils/supabase/client'
import { useAuth } from './AuthContext'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface ChatContextType {
  messages: (Message & { profiles?: Profile })[]
  rooms: Room[]
  currentRoom: Room | null
  loading: boolean
  sendMessage: (content: string) => Promise<void>
  setCurrentRoom: (room: Room | null) => void
  createRoom: (name: string, description?: string, isPrivate?: boolean) => Promise<Room | null>
  joinRoom: (roomId: string) => Promise<void>
  leaveRoom: (roomId: string) => Promise<void>
  onlineUsers: Profile[]
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<(Message & { profiles?: Profile })[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<Profile[]>([])
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-4528d5a9`

  // Load initial data
  useEffect(() => {
    if (user) {
      loadRooms()
    }
  }, [user])

  // Setup message polling when room changes
  useEffect(() => {
    if (currentRoom && user) {
      loadMessages(currentRoom.id)
      startMessagePolling(currentRoom.id)
    }

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [currentRoom, user])

  const startMessagePolling = (roomId: string) => {
    // Clear existing interval
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }

    // Start polling for new messages every 2 seconds
    const interval = setInterval(() => {
      loadMessages(roomId)
    }, 2000)

    setPollingInterval(interval)
  }

  const loadRooms = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/rooms/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })

      if (response.ok) {
        const userRooms = await response.json()
        setRooms(userRooms)

        // Set first room as current if none selected
        if (userRooms.length > 0 && !currentRoom) {
          setCurrentRoom(userRooms[0])
        }
      }
    } catch (error) {
      console.error('Error loading rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (roomId: string) => {
    try {
      const response = await fetch(`${baseUrl}/messages/${roomId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })

      if (response.ok) {
        const roomMessages = await response.json()
        
        // Enrich messages with user profiles
        const enrichedMessages = await Promise.all(
          roomMessages.map(async (message: Message) => {
            const profile = await getUserProfile(message.user_id)
            return { ...message, profiles: profile }
          })
        )

        setMessages(enrichedMessages)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const getUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const response = await fetch(`${baseUrl}/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })

      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error('Error getting user profile:', error)
    }
    return null
  }

  const sendMessage = async (content: string) => {
    if (!user || !currentRoom || !content.trim()) return

    try {
      const response = await fetch(`${baseUrl}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          content: content.trim(),
          user_id: user.id,
          room_id: currentRoom.id,
        })
      })

      if (response.ok) {
        // Reload messages immediately to show the new message
        loadMessages(currentRoom.id)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const createRoom = async (name: string, description?: string, isPrivate: boolean = false): Promise<Room | null> => {
    if (!user) return null

    try {
      const response = await fetch(`${baseUrl}/create-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name,
          description,
          is_private: isPrivate,
          created_by: user.id,
        })
      })

      if (response.ok) {
        const room = await response.json()
        await loadRooms() // Reload rooms to include the new one
        return room
      }
    } catch (error) {
      console.error('Error creating room:', error)
    }
    return null
  }

  const joinRoom = async (roomId: string) => {
    // For now, joining is automatic when rooms are loaded
    // This would be implemented for private rooms
    console.log('Join room:', roomId)
  }

  const leaveRoom = async (roomId: string) => {
    // For now, leaving is not implemented in the KV store version
    // This would remove the user from the room membership
    console.log('Leave room:', roomId)
  }

  const value = {
    messages,
    rooms,
    currentRoom,
    loading,
    sendMessage,
    setCurrentRoom,
    createRoom,
    joinRoom,
    leaveRoom,
    onlineUsers,
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}