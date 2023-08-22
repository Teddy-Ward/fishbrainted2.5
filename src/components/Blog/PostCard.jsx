
import { useState } from "react";


const CDN = import.meta.env.VITE_SUPABASE_IMAGES_CDN;

export default function PostCard(props) {
  
  const post = props.post;

  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [tagline, setTagline] = useState(post.tagline);
  const [date, setDate] = useState(post.date);
  const [content, setContent] = useState(post.content);
  const [image_url, setImage_url] = useState(post.image_url);

  function formatDate(input) {
    let date = input;
    const myDate = date.split("-");
    return myDate[2] + "/" + myDate[1] + "/" + myDate[0];
  }

  const imageLink = CDN + image_url;

  return (
    <>
      <div className="max-w-5xl mb-10 mx-auto ">
        <div className="card w-full mx-auto rounded-none text-left">
          <div className="w-full">
            <h2 className="py-0">{title}</h2>
            <span className="banner"></span>
            <div>
              {category} - {tagline}
            </div>
            {image_url ? <img src={imageLink} className="w-1/2 mx-auto" /> : ""}
            <div dangerouslySetInnerHTML={{__html: content}} />
            <div className="text-right">{formatDate(date)}</div>
          </div>
        </div>
        <div className="stroke">
          <a href="/blog" className="p-2 w-16 mt-5 ml-auto text-center">
            Back
          </a>
        </div>
      </div>
    </>
  );
}
