import fetch from '@/util/fetch'

export function Login(data) {
    return fetch({
        url:'/desktop/login',
        method:'post',
        data
    })
}