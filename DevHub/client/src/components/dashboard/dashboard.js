import React, { useEffect, Fragment } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from "../../actions/profile";
import { Spinner } from '../layouts/spinner'
import { DashboardActions } from './dashboargActions'

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading }
}) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])

    return (
        loading && profile === null ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fa fa-user"></i>Welcome {user && user.name}
            </p>
            {profile !== null ?
                <Fragment>
                    <DashboardActions />
                </Fragment> :
                <Fragment>
                    <p>You have no setup a profile, Please add some info</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateProps, { getCurrentProfile })(Dashboard)
