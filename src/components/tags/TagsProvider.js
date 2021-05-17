import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const TagContext = createContext()

// This component establishes what data can be used.
export const TagsProvider = (props) => {
    const [tags, setTags] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getTags = () => {
        return fetch("http://localhost:8000/tags")
        .then(res => res.json())
        .then(setTags)
    }

    const addTag = tagObj => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getTags)
    }

    //function to get tag by ID
    const getTagById = (id) => {
        return fetch(`http://localhost:8000/tags/${id}`)
            .then(res => res.json())
    }

    //function to delete a tag
    const deleteTag = tagId => {
        return fetch(`http://localhost:8000/tags/${tagId}`, {
            method: "DELETE"
        })
            .then(getTags)
    }

    const updateTag = tag => {
        return fetch(`http://localhost:8000/tags/${tag.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tag)
        })
          .then(getTags)
      }

    const getPostTags = () => {
        return fetch("http://localhost:8000/post_tags")
        .then(res => res.json())
    }
    

    /*
        You return a context provider which has the
        `tags` state, `getTags` function,
        and the `addTag` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TagContext.Provider value={{
            tags, getTags, addTag, getTagById, deleteTag, updateTag, searchTerms, setSearchTerms, getPostTags
        }}>
            {props.children}
        </TagContext.Provider>
    )

}