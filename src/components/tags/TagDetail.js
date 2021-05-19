import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { TagContext } from "./TagsProvider"

export const TagDetail = () => {
    const { getTags, getTagById, deleteTag, updateTag } = useContext(TagContext)
    const [tag, setTag] = useState({})
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const { tagId } = useParams()
    const history = useHistory()

    const confirmDelete = e => {
        setDeleteModalOpen(true)
    }

    const handleDelete = () => {
        deleteTag(tagId)
            .then(() => {
                history.push("/tags")
            })
    }

    useEffect(() => {
        getTags()
        
    }, [])

    useEffect(() => {
        getTagById(tagId)
            .then((response) => {
                setTag(response)
            })
    }, [])

    return (
        <>
            <section className="tag">
                <div className="tagLabel">Tag: {tag?.label}</div>
                <button className="btn btn-primary" onClick={confirmDelete}>Delete Tag</button>
                <button className="btn btn-primary" onClick={() => { history.push(`/tags/edit/${tag?.id}`) }}>Edit</button>
            </section>

            <dialog open={deleteModalOpen}>{`Are you sure you want to delete ${tag?.label}?`}
                <button className="confirmDeleteButton" onClick={handleDelete}> Yes </button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}> X </button>
            </dialog>
        </>
    )
}