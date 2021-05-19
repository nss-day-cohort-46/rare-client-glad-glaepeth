import React from "react"
import { Link } from "react-router-dom"

//Checks if user is admin => can navigate to edit/delete tags
export default ({ tag }) => (
    <section className="singleTag">
        <h3 className="tag__title" id={tag.id}>
        {
            localStorage.getItem("admin") === "true" 
            
            ?
            
            <Link to={`/tags/detail/${tag.id}`}>
            {tag.label}
            </Link>

            :

            <p>{tag.label}</p>

        }
        </h3>
    </section>
)