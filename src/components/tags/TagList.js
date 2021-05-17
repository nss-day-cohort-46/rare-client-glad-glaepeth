import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "./TagsProvider"
import Tag from "./Tag"

export const TagList = () => {
    const { getTags, tags, searchTerms } = useContext(TagContext)

    const [ filteredTags, setFilteredTags] = useState([])

    const history = useHistory()

    useEffect(() => {
        getTags()
    }, [])





    return (
        <>
            <div className="createTagButtonDiv" onClick={() => history.push("tags/create")}>
                <button className="button createTagButton">Create a Tag</button>
            </div>
            <div className="tags">
                {
                    tags.map(tag => <Tag key={tag.id} tag={tag} />)
                }
            </div>
        </>
    )
}