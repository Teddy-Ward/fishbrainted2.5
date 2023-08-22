import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";
import MainPost from "./MainPost";
import PannelPost from "./PannelPost";
import Loading from "./Loading";

export default function Front() {
  const [post, setPost] = useState([""]);
  const [loading, setLoading] = useState("loading");
  const [classes, setClasses] = useState("hidden");

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    try {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, 3);
      if (error) throw error;
      if (data != null) {
        setPost(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading("Not Found");
      setClasses("block");
    }
  }

  console.log(post);

  return (
    <>
    <div className="pt-10 max-w-5xl mx-auto ">


      {post[0] ? (
        <>
          <MainPost post={post[0]} />
          <div className="grid grid-cols-3 gap-8 w-full">
            <PannelPost post={post[1]} />
            <PannelPost post={post[2]} />
            <PannelPost post={post[3]} />
          </div>
        </>
      ) : (
        <>
          <div><Loading /></div>
        </>
      )}    
      </div>
    </>
  );
}
