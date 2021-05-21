import React, { useContext } from "react"
import { PostContext } from "../posts/PostProvider"
import "./Post.css"


export const PostSearch = () => {
  const { setSearchTerms } = useContext(PostContext)

  return (
    <> 
      <input type="text"
        className="input--wide search"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Posts... " />
    </>
  )
}