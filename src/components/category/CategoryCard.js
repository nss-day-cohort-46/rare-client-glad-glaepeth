import React from "react"
import { Link } from "react-router-dom"

export const CategoryCard = ({categoryInstance}) => (
    <section className="Category">   
        <h3 className="CategoryTitle" id={categoryInstance.id}> 
        <Link to={`/categories/detail/${categoryInstance.id}`}>
            { categoryInstance.label }
          </Link></h3>
    </section>
)