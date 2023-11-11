const LOGIN = "login"
const LOGOUT = "logout"

export const LoginUser = (payload) => {

    return {
        type:LOGIN,
        payload:{
            ...payload,
        }
    }
}

export const LogOutUser = () => {
    return {
        type:LOGOUT
    }
}

