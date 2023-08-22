import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../components/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'



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
      <div className="" >
        {!session ? <Auth /> 
        : 
        <>
        <Account key={session.user.id} session={session} />
        </>
        }
      </div>
    )
}
