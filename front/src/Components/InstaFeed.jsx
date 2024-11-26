import React, { useState, useEffect } from "react";
import "../Styles/InstaFeed.css";

const InstaFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = process.env.REACT_APP_INSTA_API_ID;
  const accessToken = process.env.REACT_APP_INSTA_API_TOKEN;

  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children,like_count,comments_count&access_token=${accessToken}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data); // Traer todos los posts sin filtrarlos
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando publicaciones...</p>;
  }

  if (error) {
    return <p>Error al cargar las publicaciones: {error.message}</p>;
  }

  console.log(posts);
  return (
    <div className="insta-feed" style={{ width: "90vw" }}>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <a href={post.permalink} target="_blank" rel="noopener noreferrer">
              {post.media_type === "IMAGE" ||
              post.media_type === "CAROUSEL_ALBUM" ? (
                <img src={post.media_url} alt={post.caption} width={200} />
              ) : post.media_type === "VIDEO" || post.media_type === "REELS" ? (
                <video
                  src={post.media_url}
                  alt={post.caption}
                  width={200}
                  loop={true}
                  muted={true}
                  autoPlay={true}
                />
              ) : null}
            </a>
            {/* <p>{post.caption}</p> */}
            {/* <p>Likes: {post.like_count}</p> */}
            {/* <p>Comments: {post.comments_count}</p> */}
            {/* {post.media_type === "VIDEO" || post.media_type === "REELS" ? (
              <p>Views: {post.video_views}</p>
            ) : null} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaFeed;
