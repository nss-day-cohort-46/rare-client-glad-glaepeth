import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"
import { CategoryCard } from "./CategoryCard"

export const CategoryList = () => {
    const { categories, getCategories, addCategory, getCategoryById, deleteCategory, updateCategory, searchTerms} = useContext(CategoryContext)

    // useState to return filtered categories
    const history = useHistory()
  
    // Initialization effect hook -> Go get Category data
    useEffect(() => {
      getCategories()
    }, [])

    return (
      <>
        <section className="CategoryList">
          <h1> Category List </h1>
          <button className="btn btn-primary" onClick={() => history.push("/categories/create")}> Create Category </button>
          <div className="Categories">
            {
            categories.map(category => {
              return <CategoryCard key={category.id} categoryInstance={category} />
            })
            }
            </div>
        </section>
      </>
      )}