import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const SubscriptionContext = createContext()

// This component establishes what data can be used.
export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])

    const getSubscriptions = () => {
        return fetch("http://localhost:8000/subscriptions")
        .then(res => res.json())
        .then(setSubscriptions)
    }

    const addSubscription = subscriptionObj => {
        return fetch("http://localhost:8000/subscriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subscriptionObj)
        })
        .then(getSubscriptions)
    }

    //function to get subscription by ID
    const getSubscriptionById = (id) => {
        return fetch(`http://localhost:8000/subscriptions/${id}`)
            .then(res => res.json())
    }

    //function to delete a subscription
    const deleteSubscription = subscriptionId => {
        return fetch(`http://localhost:8000/subscriptions/${subscriptionId}`, {
            method: "DELETE"
        })
            .then(getSubscriptions)
    }

    const updateSubscription = subscription => {
        return fetch(`http://localhost:8000/subscriptions/${subscription.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(subscription)
        })
          .then(getSubscriptions)
      }

    const [ searchTerms, setSearchTerms ] = useState("")

    /*
        You return a context provider which has the
        `subscriptions` state, `getSubscriptions` function,
        and the `addSubscription` function as keys. This
        allows any child elements to access them.
    */
    return (
        <SubscriptionContext.Provider value={{
            subscriptions, getSubscriptions, addSubscription, getSubscriptionById, deleteSubscription, updateSubscription, searchTerms, setSearchTerms
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )

}