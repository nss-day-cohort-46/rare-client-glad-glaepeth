import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { CategoryContext } from "../category/CategoryProvider"
import { CommentForm } from "../comments/CommentForm"
import { CommentList } from "../comments/CommentList"
import { SubscriptionContext } from "../subscriptions/SubscriptionProvider"


export const PostDetail = () => {

  
    const { getPostById, deletePost, getPosts, posts, updatePost} = useContext(PostContext)
    const { deleteSubscription, addSubscription, subscriptions, getSubscriptions } = useContext(SubscriptionContext)

    const { users, getUsers } = useContext(UserContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const [post, setPost] = useState({})
    const { postId } = useParams();
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("id"))
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date
    const author_id = post?.user_id
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)


    const subscription = {
        author_id,
        follower_id: parseInt(localStorage.getItem("id")),
        created_on: date.toLocaleString(),
        ended_on: ""
    }

    const confirmDelete = e => {
        setDeleteModalOpen(true)
    }

    const handleDelete = () => {
        deletePost(post.id)
            .then(() => {
                history.push("/mypostlist")
            })
    }

    const handleEdit = () => {
        updatePost(post)
        history.push(`/posts/edit/${post?.id}`)
    }
    
    const handleUnsubscribe = () => {    
        
    }

    const handleSubscribe = () => {    
        addSubscription(subscription)
    }



    useEffect(() => {
        getUsers()
        getPosts()
        getCategories()
        getSubscriptions()
    }, [])



    useEffect(() => {

        getPostById(postId)
            .then((response) => {
                setPost(response)
            })
    }, [])

    const author = users.find(u => parseInt(u.id) === parseInt(post?.user?.user?.id))
    const category = categories.find(c => parseInt(c.id) === parseInt(post?.category?.id))
    const subed = subscriptions.filter(s => parseInt(s.follower_id) === parseInt(currentUser))
    const is_subed = subed.find(s => parseInt(s?.author_id) === parseInt(author?.id))
   
    



    let is_user = ""
    if (currentUser === post?.user?.user?.id) {
        is_user = 1
    }
    
    return (

        <>

            <section className="post">
                <h3 className="postTitle">{post?.title}</h3>
                <div className="postId">Post ID: {post?.id}</div>
                <div className="postAuthor">Author: {author?.user.first_name} {author?.user.last_name}</div>
                <div className="postCategory">Category: {category?.label}</div>
                <div className="postPublicationDate">Publication Date: {post?.publication_date}</div>
                <div className="postContent">Content: {post?.content}</div>


                { is_user ? <button className="btn btn-primary"                
                    onClick={handleEdit}>
                    Edit
                </button> : "" }

                { is_user ? <button className="btn btn-primary"                    
                    onClick={handleDelete}>
                    Delete
                </button> : "" }

                
                { is_user ? "" : is_subed ? <button className="btn btn-primary"
                    
                    onClick={handleUnsubscribe}>
                    Unsubscribe
                </button> :  <button className="btn btn-primary"
                    
                    onClick={handleSubscribe}>
                    Subscribe
                </button> }

                <CommentForm />
                <CommentList />

            </section>

            <dialog open={deleteModalOpen}>{`Are you sure you want to delete ${post?.title}?`}
                <button className="confirmDeleteButton" onClick={handleDelete}> Yes </button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}> X </button>
            </dialog>

        </>
    )
}