import React, { useState, useContext, useEffect } from "react"
import { CommentContext } from "./CommentProvider"

import { CommentCard } from "./CommentCard"
import "./Comment.css"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"



export const CommentList = () => {
    const { getComments, comments } = useContext(CommentContext)
    const { getUsers, users } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const { postId } = useParams()

    // useState to return filtered comments
    
    const history = useHistory()
  
    // Initialization effect hook -> Go get comment data
    useEffect(()=>{
        getUsers()
        getComments()
      getCategories()
    }, [])
  
    
    const commentsFiltered = comments.filter( c => c.post.id === parseInt(postId) )
    

    

    const commentsSorted = commentsFiltered.sort(
      (currentComment, nextComment) =>
          Date.parse(nextComment.created_on) - Date.parse(currentComment.created_on)
    )
  
      return (
        <>
            <div className="comments">
                {
                    commentsSorted.map(commentObject => {
                        
                        const author = users.find(u => parseInt(u.id) === parseInt(commentObject.author.id))

                        return <CommentCard key={commentObject.id} commentInstance={commentObject} 
                        commentAuthor = {author}
                        
                        />
                    })
                }
            </div>
        </>
    )
}