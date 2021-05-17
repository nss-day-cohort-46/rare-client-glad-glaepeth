import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const CommentContext = createContext()

// This component establishes what data can be used.
export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8000/comments")
        .then(res => res.json())
        .then(setComments)
    }

    const addComment = commentObj => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(getComments)
    }

    //function to get comment by ID
    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`)
            .then(res => res.json())
    }

    //function to delete a comment
    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComments)
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(comment)
        })
          .then(getComments)
      }

    const [ searchTerms, setSearchTerms ] = useState("")

    /*
        You return a context provider which has the
        `comments` state, `getComments` function,
        and the `addComment` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CommentContext.Provider value={{
            comments, getComments, addComment, getCommentById, deleteComment, updateComment, searchTerms, setSearchTerms
        }}>
            {props.children}
        </CommentContext.Provider>
    )

}