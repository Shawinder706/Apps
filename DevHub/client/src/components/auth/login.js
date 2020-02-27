import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom";

const Login = () => {

    const [formsData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formsData;

    const onChange = e =>
        setFormData({ ...formsData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();

        console.log("Success");


    }


    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In  Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        autoComplete="username" />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                        required
                        autoComplete="current-password"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login;