import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="w-full">
      <div className="col-6 form-widget">
        <h1 className="">Supabase + React</h1>
        <p className="description">Sign in</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField mt-1"
              type="password"
              placeholder="Your Pass"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block mx-auto mt-2'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}