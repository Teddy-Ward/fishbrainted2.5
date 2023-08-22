
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import EditPost from "./EditPost";


const CDN = import.meta.env.VITE_SUPABASE_IMAGES_CDN


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState(null)
    
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .order("created_at");
      if (error) throw error;
      if (data != null) {
        setPosts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function formatDate(input) {
    let date = input;
    const myDate = date.split("-");
    return myDate[2] + "/" + myDate[1] + "" + myDate[0];
  }

  function postLink(input) {
    let link = "blog/" + input;
    return link;
  }

  function trimmedContent(input) {
    let string = input;
    let length = 7;
    let trimmedString = string.substring(0, length);
    return trimmedString + "...";
  }



  function imageLink(input) {
    let link = CDN + input;
    return link;
  } 
  
  return (
    <>
      {session ? (
        <>
          <button
            className="button-inverse mt-10"
            onClick={() => (window.location = "/blog/createpost")}
          >
            Create Post
          </button>
          <div className="grid grid-cols-1 gap-2">
            {posts.map((posts) => <EditPost key={posts.id} posts={posts} />).reverse()}
          </div>         
        </>
      ) : (
        <div className="pt-20">
          <div className="max-w-5xl mx-auto h-64">
            {posts
              .map((posts) => (
                <div className="grid grid-cols-2 gap-8 gap-y-0 w-full pb-20" key={posts.id}>
                  <div className="row-span-3">
                  {!posts.image_url ? (<img src="random.png" className="shadow main-img" alt="random orange image"/>) : (<img src={imageLink(posts.image_url)} className="shadow main-img bg-[var(--link-color)]" alt="post image"/>)}
                  </div>
                  <div className="text-left h-24 row-span-2">
                    <h1 className="drop-shadow-md">{posts.title}</h1>
                    <span className="banner"></span>
                    <div className="text-left ">
                      <p className="opacity-50 pb-2">{posts.category} - {formatDate(posts.date)}</p>
                    <p className="">{posts.tagline}</p>
                    </div>
                  </div>
                  <div className="stroke bottom">
                    <a
                      href={postLink(posts.slug_title)}
                      className="pb-1 w-28 b-0 ml-auto text-center"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </div>
      )}
    </>
  );
}
