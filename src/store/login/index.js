import { Login } from '@/api/login'
const login = {
    state: {
        token: '',
        username: '',
        avator: ''
    },
    mutations: {
        GETUSER: (state) => {
            state.username = 'aaa'
        },
        SET_TOKEN: (state, data) => {
            state.token = data.token
        }
    },
    actions: {
        handleLogin({commit}, data) {
            console.log(data)
            Login(data).then(res => {
                commit('SET_TOKEN',res)
                localStorage.setItem('token', res.token)
            }).catch(err => {
                console.error(err)
            })
        }
    },
    getters: {
        avator (state) {
            return state.avator
        }
    }
}

export default login