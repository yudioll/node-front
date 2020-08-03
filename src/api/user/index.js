import fetch from '@/util/fetch'

export function addUser (data) {
    return fetch({
        url: '/desktop/adduser',
        method: 'post',
        data
    })
}