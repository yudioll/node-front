<template>
    <div class="preview">
        preview
    </div>
</template>
<script>
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
    methods: {}
}
</script>
<style lang="scss" scoped>
.preview {
  width: 1600px;
  margin: 0 auto;
  color: black;
  margin: 30px auto;
  display: flex;
}
</style>