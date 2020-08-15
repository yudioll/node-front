import fetch from '@/util/fetch'

export function articalSearch (params) {
    return fetch({
        url:'/artical/search',
        method:'get',
        params
    })
}
// 写文章接口
export function articalAdd (data) {
    return fetch({
        url:'/artical/add',
        method:'post',
        data
    })
}
// 根据id查询文章
export function articalSearchById (params) {
    return fetch({
        url:'/artical/info',
        method:'get',
        params
    })
}
// 上传图片
export function upLoadImg (data) {
    return fetch({
        url:'/artical/uploadImg',
        method:'post',
        data
    })
}
