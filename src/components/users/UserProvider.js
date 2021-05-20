import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const UserContext = createContext()

//user token from session storage
const userToken = localStorage.getItem("rare_user_id")

// This component establishes what data can be used.
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            }
        })
            .then(res => res.json())
            .then(setUsers)

    }

    const addUser = userObj => {
        return fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
            .then(getUsers)
    }

    //function to get user by ID
    const getUserById = (id) => {
        return fetch(`http://localhost:8000/users/${id}`)
            .then(res => res.json())
    }

    //function to delete a user
    const deleteUser = userId => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    const updateUser = user => {
        return fetch(`http://localhost:8000/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    const [admin, setAdmin] = useState(false)

    const adminCheck = userToken => {
        return fetch(`http://localhost:8000/admin`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())

    }

    const [searchTerms, setSearchTerms] = useState("")

    /*
        You return a context provider which has the
        `users` state, `getUsers` function,
        and the `addUser` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserContext.Provider value={{
            users, getUsers, addUser, getUserById, deleteUser, updateUser, searchTerms, setSearchTerms
        }}>
            {props.children}
        </UserContext.Provider>
    )

}