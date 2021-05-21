//import statements
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { CategoryContext } from "../category/CategoryProvider";
import { PostContext } from "../posts/PostProvider";
import { Multiselect } from 'multiselect-react-dropdown'
import { TagContext } from "../tags/TagsProvider";


//export function to display form for new post
export const PostForm = () => {
    
    const { addPost, getPostById, updatePost, getPosts } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tags, getTags } = useContext(TagContext)
    const { postId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true);
    const history = useHistory();
    const date = new Date
    
    

    //Define the intial state of the Post with useState()
    const [post, setPost] = useState({
        user_id: parseInt(localStorage.getItem("id")),
        category: "",
        title: "",
        publication_date: date,
        content: "",
        image_url: "",
        approved: true,
        tags: []      
    });




    //when something changes, save it with setPost
    const handleControlledInputChange = (event) => {
        //make a new copy of post
        const newPost = { ...post }
        //the value of the event
        let selectedVal = event.target.value

        /* Set the property to the new value
        using object bracket notation. */
        newPost[event.target.id] = selectedVal
        
        // update state
        setPost(newPost)   
    }

    //handle save function
    const handleClickSavePost = (event) => {
        //Prevents the browser from submitting the form
        event.preventDefault() 
        
       //if in the edit page, editPost() then navigate to inspections 
       if (postId) {
        post.tags = post.tags.map(t => t.id)
        updatePost(post)
        .then(history.goBack)
        
        } else {
       
        //create a new Post then move to post details
        post.tags = post.tags.map(t => t.id)
        addPost(post)
        .then( p => {
            p = p
            history.push(`/posts/detail/${p.id}`)
        })   
      
    }}
    //handle cancel function
    const handleClickCancel = () => {
        history.push(`/posts/detail/${postId}`)
    }

    const handleControlledSelect = (e) => {
        let newPost = {...post}
        newPost.tags = e
        
        setPost(newPost)
    }




    useEffect(() => {
        //get all Categories
        getCategories()
        getTags()
        
        //get all Posts
        getPosts().then(() => {

        // if postID exists
        if (postId) {
            //get that post
            getPostById(postId)
            //then setPost to that found Post
            .then(Post => {
                
                setPost(Post)
                
                setIsLoading(false)
            })
        } else {
            // else there is no data
            setIsLoading(false)
        }
        })
    }, [])

    //Return this HTML
    return (
        <>
        <article className="postContainer">
        <form className="postForm">
            <h2 className="formTitle">Post</h2>
            <div id="posts">
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Title" value={post.title}/>
                </div>
            </fieldset>
            <fieldset className="form">
                <div className="form-group">
                    
                    
                    <select value={post?.category?.id} id="category" className="form-control" onChange={handleControlledInputChange} htmlFor="category">Category:
                        <option value="0" >Categories</option>
                        {
                            categories.map(category => (
                                <option key={category.id} id={category.id} value={category.id}>{category.label}</option>
                            ))
                        }
                    </select>
                    


                </div>
            </fieldset>
            {/* <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="publication_date">Publication Date: </label>
                    <input type="text" id="publication_date" onChange={handleControlledInputChange} className="form-control" placeholder="Publication Date" value={post.publication_date}/>
                </div>
            </fieldset> */}
            <fieldset className="form">
                <div className="form-group">
                    <label htmlFor="content">Content: </label>
                    <input type="text" id="content" onChange={handleControlledInputChange} className="form-control" placeholder="Content" value={post.content}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tags">Tags: </label>
                    <Multiselect 
                        id="tag" options={tags} selectedValues={post.tags} displayValue="label" 
                        onSelect={ handleControlledSelect } onRemove={ handleControlledSelect }>
                    </Multiselect>
                    
                </div>
            </fieldset> 
            </div>
            
            
            <button className="btn btn-primary"
                
                onClick={handleClickSavePost}>
                Save Post
            </button>
            
            { postId ? <button className="btn btn-primary"
                
                onClick={handleClickCancel}>
                Cancel
            </button> : "" }
            
            
        </form>
        </article>
        </>
    )
}
