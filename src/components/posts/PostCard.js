import React from "react"
import "./Post.css"
import { Link } from "react-router-dom"



export const PostCard = ({ postInstance, postAuthor, postCategory }) => (
    <section className="post">
        <h3 className="postTitle">
          <Link to={`/posts/detail/${postInstance.id}`}>
            { postInstance.title }
          </Link>
        </h3>
        <div className="postPublicationDate">Category: { postCategory?.label }</div>
        <div className="postPublicationAuthor">Author: { postAuthor?.id.first_name } { postAuthor?.last_name }</div>
    </section>
)