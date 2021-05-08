import axios from 'axios';
import {SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR} from './types'

export const signin = (signinData) => async (dispatch) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/login?email=${signinData.email}&password=${signinData.password}`)
        console.log(res)
        dispatch({
            type: SIGNIN,
            payload: res.data // res.data.token ??
        })
    } catch (error) {
        dispatch({
            type: SIGNIN_ERROR
        })
    }
}
export const signup = (signupData) => async (dispatch) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/register`, signupData)
        dispatch({
            type: SIGNUP,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: SIGNUP_ERROR
        })
    }
};

export const signout = () => async (dispatch) => {
    const url = "http://localhost:8080/api/logout?userId="+localStorage.getItem("id");
    await axios.put(url);
    dispatch({
        type: 'SIGNOUT'
    })
}