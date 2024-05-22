import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from 'src/redux/slices/usersSlice';


const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    useMemo(() => {
        if (token) {
            setLogin(true);
            dispatch(fetchMe());
        }
    }, [token, dispatch]); 
    const value = useMemo(() => ({ user, setUser, login, setLogin }), [user, setUser, login, setLogin]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export { UserContext, UserProvider };
