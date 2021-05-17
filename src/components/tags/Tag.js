import React from "react"
import { Link } from "react-router-dom"

export default ({ tag }) => (
    <section className="singleTag">
        <h3 className="tag__title" id={tag.id}>
        <Link to={`/tags/detail/${tag.id}`}>
            {tag.label}
        </Link>
        </h3>
    </section>
)