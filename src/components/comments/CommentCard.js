import React, { useContext, useEffect, useState } from "react"
import "./Comment.css"
import { useParams, useHistory } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import { UserContext } from "../users/UserProvider"

export const CommentCard = ({ commentInstance, commentAuthor }) => {
    const history = useHistory()
    const { deleteComment, updateComment, getComments } = useContext(CommentContext)
    const { getUsers, users } = useContext(UserContext)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const postId = useParams()
    console.log(commentAuthor)


    useEffect(() => {
        getUsers()
        getComments()
    }, [])

    const confirmDelete = e => {
        setDeleteModalOpen(true)
    }

    // const handleUpdate = () => {
    //     updateComment(commentInstance)
    //     .then(() => {
    //         history.push(`${postId.postId}`)
    //     })
    // }

    const handleDelete = () => {
        deleteComment(commentInstance.id)
            .then(() => {
                history.push(`/posts/detail/${postId.postId}`)
            })
    }

    const currentUser = parseInt(localStorage.getItem("rare_user_id"))
    const author = users.find(u => parseInt(u.id) === parseInt(commentInstance.author.id))
    

    let is_user = ""

    if (currentUser === author.id) {
        is_user = 1
    }

    return (
        <>
            <section className="comment">
                <p className="commentContent">{commentInstance?.content}</p>
                <p className="commentContent">Author: {commentAuthor?.user.first_name} {commentAuthor?.user.last_name}</p>
                <div className="commentPublicationDate">-{commentInstance?.created_on}</div>

                {is_user ? <button className="btn btn-primary"
                    onClick={confirmDelete}>
                    Delete
                    </button> : ""}

                {/* {commentInstance.id ? <button className="btn btn-primary"
                    onClick={handleUpdate}>
                    Edit
            </button> : "" } */}

            </section>

            <dialog open={deleteModalOpen}>{`Are you sure you want to delete ${commentInstance?.content}?`}
                <button className="confirmDeleteButton" onClick={handleDelete}> Yes </button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}> X </button>
            </dialog>
        </>
    )
}