import React from 'react';
import PropTypes from 'prop-types';

const AuthProvider = ({ children }) => <>{children}</>
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AuthProvider;
