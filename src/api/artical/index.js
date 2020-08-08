import fetch from '@/util/fetch'

export function articalSearch (params) {
    return fetch({
        url:'/artical/search',
        method:'get',
        params
    })
}