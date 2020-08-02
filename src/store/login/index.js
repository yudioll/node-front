import { Login } from '@/api/login/login'
const login = {
    state: {
        token: '',
        username: '',
        avator: ''
    },
    mutation: {
        GETUSER: (state) => {
            state.username = 'aaa'
        }
    },
    actions: {
        handleLogin(data) {
            Login(data).then( res=> {
                console.log(res)
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