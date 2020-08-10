import { Login } from '@/api/login/login'
const login = {
    state: {
        token:'',
        userInfo:  null,
        isLogin: false
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
                const { code, err_msg, data } = res
                if (code !== 200) {
                    return Promise.reject(err_msg)
                } else {
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