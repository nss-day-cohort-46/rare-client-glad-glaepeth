import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { CategoryContext } from './CategoryProvider'

export const CategoryForm = () => {
    const { getCategories, addCategory, getCategoryById, updateCategory } = useContext(CategoryContext)
    const { categoryId } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    //Define the intial state of the Category with useState()
    const [category, setCategory] = useState("")

    //track changes to form, update state variable with setCategory
    const handleInputChange = e => {
        setCategory(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (categoryId) {
            updateCategory({ id: categoryId, label: category })
                .then(() => history.push(`/categories`))
        } else {
            addCategory({ label: category })
            history.push("/categories")
        }
    }

    const handleClickCancel = () => {
        history.push(`/categories/detail/${categoryId}`)
    }

    useEffect(() => {
        getCategories().then(() => {
            if (categoryId) {
                getCategoryById(categoryId)
                    .then(category => {
                        setCategory(category.label)
                        setIsLoading(false)
                    })
            } else {
                // else there is no data
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <section className="category_form">
            <form className="categoryForm">
                <h2>{categoryId ? "Edit Category" : "Create Category"}</h2>
                <fieldset className="form">
                    <div className="form-group">
                        <label htmlFor="categoryLabel">Category</label>
                        <input type="text"
                            placeholder={categoryId ? category : "Enter new category"}
                            id="categoryLabel"
                            onChange={handleInputChange}
                            className="form-control"
                            value={category}></input>
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        {categoryId ? <button className="btn btn-primary"
                            disabled={isLoading}
                            onClick={handleClickCancel}>
                            Cancel
                        </button> : ""}
                    </div>
                </fieldset>
            </form>
        </section>
    )
}