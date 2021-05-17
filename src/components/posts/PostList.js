import React, { useState, useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"

import { PostCard } from "./PostCard"
import "./Post.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"
import { TagContext } from "../tags/TagsProvider"



export const PostList = () => {
    const { getPosts, posts, searchTerms } = useContext(PostContext)
    const { getUsers, users } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const { tags, getTags, getPostTags } = useContext(TagContext)

    // useState to return filtered posts
    const [ filteredPosts, setFiltered ] = useState([])
    const history = useHistory()
  
    
    //state variable for post-tags
    const [postTags, setPostTags] = useState([])

    //state variable for sorting posts
    const [postsSorted, setPostsSorted] = useState([])

    // Initialization effect hook -> Go get post data
    useEffect(()=>{
      getPosts().then(setFiltered)
      getUsers()
      getCategories()
      getTags()
      getPostTags().then(setPostTags)
    }, [])
  

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


    //watch filteredPosts for sorting
    useEffect(() => {
        const sorted = filteredPosts.sort(
        (currentPost, nextPost) =>
            Date.parse(nextPost.publication_date) - Date.parse(currentPost.publication_date)
      )
        setPostsSorted(sorted)
    }, [filteredPosts])
    


    //filter by tags
    const handleTagFilter = (e) => {
      const tagId = parseInt(e.target.id.split("--")[1])
      const postsWithThisTag = postTags.filter(pt => pt.tag_id === tagId)
      const matchingPosts = []
      postsWithThisTag.map(item => {
        posts.find(post => {
          if (post.id === item.post_id) {
            matchingPosts.push(post)
          }
        })
      })
      setFiltered(matchingPosts)
    }




      return (
        <>
            <h1>Posts</h1>

            <button onClick={() => history.push("/posts/create")}>
                New Post
            </button>
            <div className="posts">
                {
                    postsSorted.map(postObject => {
                      
                        const author = users.find(u => parseInt(u.id) === parseInt(postObject.user_id))
                        const category = categories.find(c => parseInt(c.id) === parseInt(postObject.category_id))

                        return <PostCard key={postObject.id} postInstance={postObject} 
                        postAuthor = {author}
                        postCategory = {category}
                        />
                    })
                }
            </div>
            <div className="tags">
                <h3> Tags: </h3>
                {tags.map(tag => {
                  return <button key={tag.id} id={`tagBtn--${tag.id}`} onClick={e => {
                    handleTagFilter(e)
                  }}>{tag.label}</button>
                })}
            </div>
        </>
    )
}