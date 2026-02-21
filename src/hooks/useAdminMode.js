import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useLocalStorage('adminMode', false)

  useEffect(() => {
    let buffer = ''
    const secret = 'admin'

    function handleKeyPress(e) {
      buffer += e.key.toLowerCase()
      if (buffer.length > secret.length) {
        buffer = buffer.slice(-secret.length)
      }
      if (buffer === secret) {
        setIsAdmin((prev) => !prev)
        buffer = ''
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [setIsAdmin])

  return [isAdmin, setIsAdmin]
}
