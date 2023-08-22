import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import PostCard from './PostCard';

import Loading from "../Loading";
import { useParams } from "react-router-dom";


export default function Page({ params }) {
  const [post, setPost] = useState([""]);
  const [loading, setLoading] = useState("block")
  const [classes, setClasses] = useState("hidden")

const {slug} = useParams

  const name = slug
  console.log(slug)

  useEffect(() => {
    getPost();
  }, );

  async function getPost() {
    try {
      const { data, error } = (await supabase.from("blog").select("*").eq("slug_title", name));
      if (error) throw error;      
      if (data != null) {
        setPost(data);
      } 

    } catch (error) {
      alert(error.message); 
    } finally {
      setLoading("hidden")
      setClasses("block")
    }
  }




  return (
    <>
     {post[0] ? (<PostCard post={post[0]} />) : (
     <>
     <div className="pt-20">
           <div className={loading}><Loading /></div>
     <div className={classes}>
      <h2>Page Not Found</h2>
      <Link href={"/"}>Go Back</Link>
     </div>
     </div>

     </>)}
    </>

  
  )
}
