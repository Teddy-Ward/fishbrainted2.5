
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Editor from "./Editor";


export default function CreatePost() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [slug_title,  setSlug_title] = useState("");
  const [tagline, setTagline] = useState("");
  const [image_url, setImage_url] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
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
      const { data, error } = await supabase.from("blog").select("*");
      if (error) throw error;
      if (data != null) {
        setPosts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createPost() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("blog")
        .insert({
          category: category,
          title: title,
          slug_title: slug_title,
          tagline: tagline,
          image_url: image_url,
          date: date,
          content: content,
        })
        .single();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      alert("Post Added")
    }
  }

  async function uploadImage(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      // const filePath = file.name

      let { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      setImage_url(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
      alert("Upload Complete");
    }
  }

  const categoryList = [
    { id:1, label: "Select", value: "" },
    { id:2, label: "General", value: "General" },
    { id:3, label: "Games", value: "Games" },
    { id:4, label: "UK Politics", value: "Ukpol" },
    { id:5, label: "Life", value: "Life" },
    { id:6, label: "Opinion", value: "Opinion" },
    { id:7, label: "Random", value: "Random" },
  ];

  const listChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
  };

  function slugify(input) {
    let slug = input.toString();
    const mySlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, " ")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, " ");

    setSlug_title(mySlug)
    setTitle(input)
  }

  return (
    <>
      {session ? (
              <div className="card">
              <div className="grid grid-cols-3 gap-4 w-full text-left">
                <h2 className="w-full text-center col-span-3">Create new Blog Post</h2>
                <div>
                  <label htmlFor="category">Category</label>
                </div>
                <div className="col-span-1">
                  <select
                    category={category}
                    onChange={listChange}
                    className="input rounded-none"
                  >
                    {categoryList.map((option) => (
                      <option key={option.id} category={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div></div>
                <div>
                  <label htmlFor="title">Title</label>
                </div>
                <div className="col-span-2">
                  <input
                    id="title"
                    className="input block mx-auto rounded-none"
                    type="text"
                    name="title"
                    value={title || ""}
                    onChange={(e) => slugify(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="tagline">Tagline</label>
                </div>
                <div className="col-span-2">
                  <input
                    id="tagline"
                    className="input block mx-auto rounded-none"
                    type="text"
                    name="tagline"
                    value={tagline || ""}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>{" "}
                <div>
                  <label htmlFor="date">Date</label>
                </div>
                <div className="col-span-1">
                  <input
                    id="date"
                    className="input block mx-auto rounded-none"
                    type="date"
                    name="date"
                    value={date || ""}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="col-span-3 text-center">
                  <label htmlFor="content">Content</label>
                </div>
                <div className="col-span-3">
                  {/* <textarea
                    id="content"
                    className="input block mx-auto rounded-none"
                    type="text"
                    name="content"
                    rows="20"
                    value={content || ""}
                    onChange={(e) => setContent(e.target.value)}
                  /> */}
                  <Editor value={content} onChange={setContent} />
                </div>
                <div>
                  <label htmlFor="image">Image</label>
                </div>
                <div className="col-span-2">
                  <input
                    className="input block mx-auto rounded-none"
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={(e) => uploadImage(e)}
                  />
                </div>
                <button className="button-inverse w-full col-span-3" 
                onClick={() => createPost()}
                disabled={loading}>
                {loading ? "Adding Post" : "Create New Post"}
                </button>
              </div>
            </div>  
          


        ) : (
          <div>No Access</div> )}
    </>

  );
}
