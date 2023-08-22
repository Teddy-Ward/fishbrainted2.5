import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../components/supabaseClient'

export default function Footer() {
  const [session, setSession] = useState(null)
    
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("ERROR:", error);
    }
  }

  return (
    <header className="header">
        <a href="/" className="p-0 m-0">
          <img src="/ted_250.png" width="48px" className="fixed" />
        </a>

        <div className="pr-5">
          <nav class="fill">
            {session ? (
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/account">Account</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="#" onClick={handleSignOut}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
  )
}