import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import Posts from '../components/Blog/Posts';

export default async function Blog() {



  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
    <Posts session={session}/>
    </>

  )
  
}