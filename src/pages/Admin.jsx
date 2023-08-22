import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../components/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import ThemeSwitch from '../components/ThemeSwitch'


export default function Admin() {
    const [session, setSession] = useState(null)
    
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  
    return (
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> 
        : 
        <>
        <Account key={session.user.id} session={session} />
        <ThemeSwitch />
        </>
        }
      </div>
    )
}
