import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"

export const CategoryDetail = () => {
    const { getCategories, getCategoryById, deleteCategory, updateCategory } = useContext(CategoryContext)
    const [category, setCategory] = useState({})
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const { categoryId } = useParams()
    const history = useHistory()

    const confirmDelete = e => {
        setDeleteModalOpen(true)
    }

    const handleDelete = () => {
        deleteCategory(categoryId)
            .then(() => {
                history.push("/categories")
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getCategoryById(categoryId)
            .then((response) => {
                setCategory(response)
            })
    }, [])

    return (
        <>
            <section className="category">
                <div className="categoryLabel">Category: {category?.label}</div>
                <button className="btn btn-primary" onClick={confirmDelete}>Delete Category</button>
                <button className="btn btn-primary" onClick={() => { history.push(`/categories/edit/${category?.id}`) }}>Edit</button>
            </section>

            <dialog open={deleteModalOpen}>{`Are you sure you want to delete ${category?.label}?`}
                <button className="confirmDeleteButton" onClick={handleDelete}> Yes </button>
                <button className="closeModalButton" onClick={() => setDeleteModalOpen(false)}> X </button>
            </dialog>
        </>
    )
}