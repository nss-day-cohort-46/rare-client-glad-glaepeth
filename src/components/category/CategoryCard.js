import React from "react"
import { Link } from "react-router-dom"

export const CategoryCard = ({ categoryInstance }) => (
    <section className="Category">
        <h3 className="CategoryTitle" id={categoryInstance.id}>
            {
                localStorage.getItem("admin") === "true"
                ?
                <Link to={`/categories/detail/${categoryInstance.id}`}>
                    {categoryInstance.label}
                </Link>
                :
                <p> {categoryInstance.label} </p>
            }
        </h3>
    </section>
)