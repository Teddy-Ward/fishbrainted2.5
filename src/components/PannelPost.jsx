
import { useState } from "react";

const CDN = import.meta.env.VITE_SUPABASE_IMAGES_CDN;

export default function PannelPost(props) {
  const post = props.post;

  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [tagline, setTagline] = useState(post.tagline);
  const [date, setDate] = useState(post.date);
  const [content, setContent] = useState(post.content);
  const [image_url, setImage_url] = useState(post.image_url);
  const [slug_title, setSlug_title] = useState(post.slug_title);

  function formatDate(input) {
    let date = input;
    const myDate = date.split("-");
    return myDate[2] + "/" + myDate[1] + "/" + myDate[0];
  }

  const imageLink = CDN + image_url;

  function postLink(input) {
    let link = "blog/" + input;
    return link;
  }

  return (
    <>
      <div className="text-left">
        {!image_url ? (
          <img
            src="random.png"
            className="shadow main-img"
            alt="random orange image"
          />
        ) : (
          <img
            src={imageLink}
            className="shadow main-img bg-[var(--link-color)]"
            alt="post image"
          />
        )}
        <h1 className="drop-shadow-md pt-4 h-16 overflow-hidden">{title}</h1>
        <span className="banner"></span>
        <div className="h-36  overflow-hidden">
          <p className="opacity-50 pb-2">
            {category} - {formatDate(date)}
          </p>
          <p className="">{tagline}</p>
        </div>
        <div className="stroke">
          <a
            href={postLink(slug_title)}
            className="pb-2 w-28 mt-2 ml-auto text-center"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
}
