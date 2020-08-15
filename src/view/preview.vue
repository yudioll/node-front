<template>
    <div class="preview" v-html="articalInfo">
        
    </div>
</template>
<script>
import { articalSearchById } from '@/api/artical'
export default {
    name: 'preview',
    data () {
        return {
            // 文章id
            id: '',
            articalInfo: null
        }
    },
    created () {
        this.id = this.$route.query.id
        console.log(this.id)
    },
    mounted () {
        this.articalSearchById()
    },
    methods: {
        articalSearchById () {
            articalSearchById({id: this.id})
            .then(res => {
               if (res.code === 200) {
                   this.articalInfo = res.data.content
               }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.preview {
  width: 1600px;
  height: 900px;
  margin: 0 auto;
  background: white;
  margin: 30px auto;
  display: flex;
  overflow-y: hidden;
  border-radius: 20px;
}
</style>