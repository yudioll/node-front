<template>
  <div class="preview">
    <div class="main ">
      <div class="view-title">
        <div style="display:flex;align-items: center;font-size: 20px;">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2663414481,1671634133&fm=26&gp=0.jpg" alt="">
          <span style="margin-left:10px">yudioll</span>
        </div>
        <span style="font-size:28px;">{{ articalInfo.title }}</span>
        <span style="margin-right:20px">{{time}}</span>
      </div>
      <div
        class="view-content animate__animated animate__lightSpeedInLeft"
      >
       <MarkDown :isPreview="true" :height="790" :value="articalInfo.content"/>
      </div>
    </div>
  </div>
</template>
<script>
import { articalSearchById } from "@/api/artical";
import { dateFormat } from '@/util/validate'
import MarkDown from "vue-meditor";
export default {
  name: "preview",
  components: {
      MarkDown,
  },
  computed: {
    time() {
      return dateFormat('YYYY-mm-dd HH:MM',new Date(this.articalInfo.date))
    }
  },
  data() {
    return {
      // 文章id
      id: "",
      articalInfo: {
        title: "",
        des: "",
        ahthor: "yudioll",
        date: "",
        content: "",
      },
      options: {
        isPreview:true
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {
    this.articalSearchById();
  },
  methods: {
    articalSearchById() {
      articalSearchById({ id: this.id })
        .then((res) => {
          if (res.code === 200) {
            this.articalInfo = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.preview {
  width: 1600px;
  height: 900px;
  margin: 0 auto;
  background: white;
  margin: 30px auto;
  overflow-y: hidden;
  overflow-x: hidden;
  border-radius: 20px;
  .main {
    height: 860px;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 20px 0;
    .view-title {
      text-align: center;
      font-weight: 400;
      padding: 20px 0 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 40px;
        height: 40px;
        margin-left: 20px;
        border-radius: 50%;
      }
    }
    .view-content {
      padding: 0 20px;
      img {
        display: inline-block !important;
        margin: 0 auto !important;
      }
    }
  }
}

.hljs {
  font-size: 20px !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>
