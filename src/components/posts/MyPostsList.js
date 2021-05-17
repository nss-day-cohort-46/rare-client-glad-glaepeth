import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"

import { PostCard } from "./PostCard"
import "./Post.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"


export const MyPostsList = () => {
    const { posts, searchTerms, getPostsByUserId } = useContext(PostContext)
    const { getUsers, users } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)

    // useState to return filtered posts
    const [filteredPosts, setFiltered] = useState([])
    const history = useHistory()

    const rareUser = parseInt(localStorage.getItem('rare_user_id'))
    
    

    // get USER posts on page load
    useEffect(() => {
        getPostsByUserId(rareUser)
            .then(setFiltered)
        getUsers()
        getCategories()
    }, [])


    //search user posts
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching posts
            const subset = posts.filter(post => post.title.toLowerCase().includes(searchTerms.toLowerCase))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all posts
            setFiltered(posts)
        }
    }, [searchTerms, posts])

    return (
        <>
            <h1>My Posts</h1>

            <button onClick={() => history.push("/posts/create")}>
                New Post
            </button>
            <div className="posts">
                {
                    filteredPosts.map(postObject => {


                        const author = users.find(u => parseInt(u.id) === parseInt(postObject.user_id))
                        const category = categories.find(c => parseInt(c.id) === parseInt(postObject.category_id))
                        

                        return <PostCard key={postObject.id} postInstance={postObject}
                            postAuthor={author}
                            postCategory={category}
                        />
                    })
                }
            </div>
        </>
    )


}