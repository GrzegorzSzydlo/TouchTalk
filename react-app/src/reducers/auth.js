import {
    SIGNIN, 
    SIGNUP, 
    SIGNIN_ERROR, 
    SIGNUP_ERROR, 
    SIGNUP_RESET,
    SIGNIN_RESET,
    LOGOUT
} from './../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    login: true,
    user: user,
    userData: {
        image: null
    }
} : {
    login: false,
    user: null,
    register_error: false
};


const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("id", JSON.stringify(action.payload.first));
            localStorage.setItem("token", JSON.stringify(action.payload.second));
            return {
                ...state, auth: action.payload, login: true, login_error: false,  userData: {
                    avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                }
            }
        case SIGNIN_ERROR:
            return {
                ...state, login_error: true,
            }
        case SIGNIN_RESET:
            return {
                ...state, login_error: false,
            }
        case SIGNUP:
            return {
                ...state, register_error: false, register_success: true
            }
        case SIGNUP_ERROR:
            return {
                ...state, register_error: true, register_success: false
            }
        case SIGNUP_RESET:
            return {
                ...state, register_error: false
            }
        case 'USERDATA':
            return {
                ...state, userData: action.payload
            }
        case 'USERDATA_UPDATE':
            return {
                ...state, userData: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('user');
            return {
                ...state, login: false
            }
        case 'SIGNOUT': {
            localStorage.removeItem("user");
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            state.login = false;
            return state;
        }
            default:
                return state;
    }
}

export default auth;