import sendRequest from "../utils/resquest";

const AuthService = {
    login: (data) => sendRequest('post', 'auth/login', data),
    register: (data) => sendRequest('post', 'users', data),
    getOTP: (data) => sendRequest('post', 'auth/getOTP', data),
    changePassword: (data) => sendRequest('post', 'auth/changePassword', data),
    loginWithGG: (data) => sendRequest('post', 'auth/loginWithGG', data),
};
export default AuthService;