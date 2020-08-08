import { Login } from '@/api/login/login'
const login = {
    state: {
        token: localStorage.getItem('token') || '',
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
        isLogin: localStorage.getItem('token') ? true : false
    },
    mutations: {
        SETUSER: (state, { token, userInfo }) => {
            state.token = token
            state.userInfo = userInfo
            state.isLogin = true
        }
    },
    actions: {
        handleLogin({ commit }, loginData) {
            return Login(loginData).then( res => {
                console.log(res,'111111111111')
                const { code, err_msg, data } = res
                if (code !== 200) {
                    return Promise.reject(err_msg)
                } else {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
                    commit('SETUSER', data)
                    return Promise.resolve()
                }
            }).catch(err => {
                return Promise.reject(err)
            })
        }
    },
    getters: {
        isLogin: (state) => {
            return state.isLogin
        },
        userInfo: (state) => {
            return state.userInfo
        },
        token: (state) => {
            return state.token
        }
    }
}

export default login