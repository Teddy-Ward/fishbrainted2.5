import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import PostCard from "./PostCard";

import Loading from "../Loading";

const CDN = import.meta.env.VITE_SUPABASE_IMAGES_CDN;

export default function BlogPost({ params }) {
  let { slug } = useParams();
  const [post, setPost] = useState([""]);
  const [loading, setLoading] = useState("block");
  const [classes, setClasses] = useState("hidden");

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    try {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("slug_title", slug);
      if (error) throw error;
      if (data != null) {
        setPost(data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading("hidden");
      setClasses("block");
    }
  }

  console.log(post);

  return (
    <>
      {/* <div>Now showing post {slug}</div> */}

      {post[0] ? (
        <PostCard post={post[0]} />
      ) : (
        <div className="pt-20">
          <div className={loading}>
            <Loading />
          </div>
          <div className={classes}>
            <h2>Page Not Found</h2>
            <a href={"/"}>Go Back</a>
          </div>
        </div>
      )}
    </>
  );
}
