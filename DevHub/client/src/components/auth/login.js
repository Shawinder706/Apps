import React, { Fragment, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {

    const [formsData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formsData;

    const onChange = e =>
        setFormData({ ...formsData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        login({ email, password })
        console.log('login' + email, password);
    }

    //Redirect if loggin in
    if (isAuthenticated === true) {
        console.log(isAuthenticated)
        return <Redirect to="/dashboard" />
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
};

Login.propTypes = {
    login: PropTypes.func.isRequired
}

const mapStateProps = state => ({
    isAuthenticated: PropTypes.bool
});

export default connect(mapStateProps, { login })(Login);