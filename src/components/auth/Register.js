import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./Auth.css"
import "./App.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()

    const [imageUrl, setImageUrl] = useState(null)
    const [imageAlt, setImageAlt] = useState(null)

    const handleImageUpload = () => {
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        // replace this with your upload preset name
        formData.append('upload_preset', 'RareMedia');
        const options = {
            method: 'POST',
            body: formData,
        };

        // replace cloudname with your Cloudinary cloud_name
        return fetch('https://api.cloudinary.com/v1_1/nateromad/image/upload', options)
            .then(res => res.json())
            .then(res => {
                setImageUrl(res.secure_url)
                setImageAlt(res.original_filename)
            })
            .catch(err => console.log(err));
    }

    const openWidget = () => {
        // create the widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'nateromad',
                uploadPreset: 'RareMedia',
            },
            (error, result) => {
                if (result.event === 'success') {
                    setImageUrl(result.info.secure_url)
                    setImageAlt(result.info.original_filename)
                }
            }
        );
        widget.open(); // open up the widget after creation
    };

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "profile_image_url": imageUrl
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("valid" in res && res.valid) {
                        localStorage.setItem("rare_user_id", res.token)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
            <section className="App">
                <section className="left-side">
                    <form>
                        <div className="form-group">
                            <input type="file" />
                        </div>

                        <button type="button" className="btn" onClick={handleImageUpload}>Submit</button>
                        <button type="button" className="btn widget-btn" onClick={openWidget}>Upload Via Widget</button>
                    </form>
                </section>
                <section className="right-side">
                    <p>The resulting image will be displayed here</p>
                    {imageUrl && (
                        <img src={imageUrl} alt={imageAlt} className="displayed-image" />
                    )}
                </section>
            </section>
        </main>
    )
}
