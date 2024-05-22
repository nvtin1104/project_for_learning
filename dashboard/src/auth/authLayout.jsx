import React from 'react'
import { PropTypes } from 'prop-types';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const AuthLayout = ({ authenticated }) => {
    const location = useLocation();
    if (authenticated) {
        return <Outlet />;
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
}
AuthLayout.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default AuthLayout