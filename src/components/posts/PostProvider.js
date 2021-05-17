import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const PostContext = createContext()

// This component establishes what data can be used.
export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const addPost = postObj => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
            //get the new object back
            .then(res => res.json())
            .then(post => {
                return post
            })
    }

    //function to get post by ID
    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}`)
            .then(res => res.json())
    }

    //get post by USER id
    const getPostsByUserId = (id) => {
        return fetch(`http://localhost:8000/posts?user=${id}`)
            .then(res => res.json())
    }

    //function to delete a post
    const deletePost = postId => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE"
        })
            .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const [searchTerms, setSearchTerms] = useState("")

    /*
        You return a context provider which has the
        `posts` state, `getPosts` function,
        and the `addPost` function as keys. This
        allows any child elements to access them.
    */
    return (
        <PostContext.Provider value={{
            posts, getPosts, addPost, getPostById, deletePost, updatePost, searchTerms, setSearchTerms, getPostsByUserId
        }}>
            {props.children}
        </PostContext.Provider>
    )

}