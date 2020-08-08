import fetch from '@/util/fetch'

export function Login(data) {
    return fetch({
        url:'/user/login',
        method:'post',
        data
    })
}