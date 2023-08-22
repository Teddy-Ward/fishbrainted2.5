import { useState } from "react";

const CDN = import.meta.env.VITE_SUPABASE_IMAGES_CDN;

export default function MainPost(props) {
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
      <div className="grid grid-cols-2 gap-8 gap-y-0 w-full pb-20">
        <div className="row-span-3">
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
        </div>
        <div className="text-left h-24 row-span-2">
          <h1 className="drop-shadow-md">{title}</h1>
          <span className="banner"></span>
          <div className="text-left ">
            <p className="opacity-50 pb-2">
              {category} - {formatDate(date)}
            </p>
            <p className="">{tagline}</p>
          </div>
        </div>
        <div className="stroke bottom">
          <a
            href={postLink(slug_title)}
            className="pb-1 w-28 b-0 ml-auto text-center"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
}
