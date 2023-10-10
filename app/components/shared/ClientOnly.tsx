// ClientOnly component to check if the page is rendered on the client before rendering the children
import { useEffect, useState } from 'react'

export default function ClientOnly({ children }: { children: () => React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return children()
}