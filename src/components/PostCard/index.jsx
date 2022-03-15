import React from 'react';
import './styles.css';
import P from 'prop-types';

export default function PostCard({ post }) {
  return (
    <div className="post">
      <img src={post.cover} alt={post.title} className="post-photo" />
      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        {/* <p>Oi</p> componente não bate snapshot */}
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: P.shape({
    cover: P.string.isRequired,
    title: P.string.isRequired,
    body: P.string.isRequired,
    id: P.number.isRequired,
  }),
};
