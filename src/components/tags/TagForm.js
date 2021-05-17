import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TagContext } from "./TagsProvider";

export const TagForm = (props) => {

    const {addTag, updateTag, getTagById } = useContext(TagContext)

    const [tag, setTag] = useState({
      label: "",
    });
    
    const[isLoading, setIsLoading] = useState(true)
    
    const { tagId } = useParams();
    const history = useHistory();

    const handleControlledInputChange = (event) => {
      const newTag = { ...tag }
      newTag[event.target.id] = event.target.value
      setTag(newTag)
    }

    const handleClickCancel = () => {
        history.push(`/tags/detail/${tagId}`)
    }

    const handleSaveTag = () => {

      if (tag.label === "" ) {
          window.alert("Please enter a tag")
        } else {
          setIsLoading(true);

      if (tagId){
          
          updateTag({
              id: tag.id,
              label: tag.label
          })
          .then(() => history.push(`/tags`))
        }else {
          
          addTag({
            id: tag.id,
            label: tag.label
          })
          .then(() => history.push("/tags"))
        }
      }
    }
    useEffect(() => {
      if (tagId) {
        getTagById(tagId)
        .then(tag => {
            setTag(tag)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
    }
}, [])


    return (
      <form className="tagForm">
          <h2 className="tagForm__title">{tagId ? "Edit Tag" : "Add Tag"}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="label">Tag:</label>
                  <input type="text" id="label" required autoFocus className="form-control" placeholder="New Tag"
                  onChange={handleControlledInputChange}
                  value={tag.label}/>
              </div>
          </fieldset>

          <button className="btn btn-primary"
              disabled={isLoading}
              onClick={event => {
                  event.preventDefault()
                  handleSaveTag()
              }}>
              {tagId ? "Save Tag" : "Add Tag"}</button>
              {tagId ? <button className="btn btn-primary"
                            disabled={isLoading}
                            onClick={handleClickCancel}>
                            Cancel
                        </button> : ""}
      </form>
  )
}


