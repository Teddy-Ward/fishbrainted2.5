
import { useState } from "react";
import { supabase } from "../supabaseClient";


export default function EditPost(props) {
  const post = props.posts;

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [tagline, setTagline] = useState(post.tagline);
  const [date, setDate] = useState(post.date);
  const [content, setContent] = useState(post.content);
  const [image_url, setImage_url] = useState(post.image_url);

  async function updatePost() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog")
        .update({
          category: category,
          title: title,
          tagline: tagline,
          date: date,
          content: content,
          image_url: image_url,
        })
        .eq("id", post.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      alert("Post Updated");
    }
  }

  async function deletePost() {
    try {
      const { data, error } = await supabase
        .from("blog")
        .delete()
        .eq("id", post.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
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
  };
  return (
    <>
      {editing === false ? (
        <>
          <div className="card">
            <h2>{post.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="button-inverse mx-1"
                onClick={() => deletePost()}
              >
                Delete
              </button>
              <button className="button mx-1" onClick={() => setEditing(true)}>
                Edit
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            <h2>Edit Post</h2>
            <button
              className="button-inverse"
              onClick={() => setEditing(false)}
            >
              Go Back
            </button>
            <div className="grid grid-cols-3 gap-4 w-full text-left">
              <label>Category</label>
              <select category={category} onChange={listChange}>
                {categoryList.map((option) => (
                  <option key={option.id} category={option.value}>{option.label}</option>
                ))}
              </select>
              <div></div>
              <label>Title</label>
              <input
                type="text"
                id="title"
                defaultValue={post.title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-2"
              />
              <label>Tagline</label>
              <input
                type="text"
                id="tagline"
                defaultValue={post.tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="col-span-2"
              />
              <label>Date</label>
              <input
                id="date"
                className="input block mx-auto rounded-none"
                type="date"
                name="date"
                defaultValue={post.date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div></div>
              <label className="col-span-3 text-center">Content</label>
              <textarea
                id="content"
                className="input block mx-auto rounded-none col-span-3"
                type="text"
                name="content"
                rows="20"
                defaultValue={post.content}
                onChange={(e) => setContent(e.target.value)}
              />
              {/* <div className="col-span-3">
                <Editor value={content} onChange={setContent} />
              </div> */}
              <button
                className="button-inverse w-full col-span-3 mt-6"
                onClick={() => updatePost()}
                disabled={loading}
              >
                {loading ? "Adding Post" : "Edit Post"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
