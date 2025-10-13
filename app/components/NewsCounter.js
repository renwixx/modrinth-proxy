'use client'

import { useState, useEffect } from 'react'

export default function NewsCounter() {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const checkUnread = async () => {
      try {
        const lastSeenSha = localStorage.getItem('lastSeenCommitSha')
        
        const res = await fetch('https://api.github.com/repos/b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0/modrinth-proxy/commits')
        const commits = await res.json()
        
        if (!lastSeenSha) {
          setUnreadCount(0)
          return
        }
        
        const lastSeenIndex = commits.findIndex(c => c.sha === lastSeenSha)
        
        if (lastSeenIndex === -1) {
          setUnreadCount(commits.length > 20 ? 20 : commits.length)
        } else {
          setUnreadCount(lastSeenIndex)
        }
      } catch (error) {
        console.error('Error checking unread commits:', error)
      }
    }

    checkUnread()
    
    const handleCommitsRead = () => {
      setUnreadCount(0)
    }
    
    window.addEventListener('commitsRead', handleCommitsRead)
    const interval = setInterval(checkUnread, 60000)
    
    return () => {
      window.removeEventListener('commitsRead', handleCommitsRead)
      clearInterval(interval)
    }
  }, [])

  if (unreadCount === 0) return null

  return (
    <span className="absolute -top-2 -right-3 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[9px] font-bold text-white bg-red-500 rounded-full animate-pulse shadow-lg z-20">
      {unreadCount > 9 ? '9+' : `+${unreadCount}`}
    </span>
  )
}

