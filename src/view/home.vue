<template>
  <div class="home">
    <div class="home-aside animate__animated animate__backInLeft">
      <div class="home-aside-top">
        <img :src="userInfo.avator" alt="" />
        <div class="home-aside-top-info">
          <div>
            {{ userInfo.username }}
          </div>
          <div class="home-aside-top-info-link">
            <a
              :href="userInfo.github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img class="" src="@/assets/github.png" alt="" />
            </a>
            <div>
              <el-tooltip class="item" effect="dark" placement="top">
                <img src="@/assets/email.png" alt="" />
                <div slot="content">
                  {{ userInfo.email }}
                </div>
              </el-tooltip>
            </div>
            <div>
              <el-tooltip class="item" effect="dark" placement="top">
                <img src="@/assets/qq.png" alt="" />
                <div slot="content">
                  1227795790
                </div>
              </el-tooltip>
            </div>
            <div>
              <el-tooltip class="item" effect="dark" placement="top">
                <img src="@/assets/weixin.png" alt="" />
                <div slot="content">
                  wechat
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="home-aside-tags">
        <h2>文章标签</h2>
        <div class="home-aside-tagClas">
          <el-tag
            v-for="item in tags"
            @click="handleTypeSearch(item)"
            :key="item.id"
            :type="item.type"
            >{{ item.name }}</el-tag
          >
        </div>
      </div>
      <div v-if="isLogin" class="login-write">
        <router-link to="/writeArtical">写文章</router-link>
      </div>
    </div>
    <div
      class="home-main animate__animated animate__backInRight"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中"
    >
      <div class="block" v-if="articals && articals.length > 0">
        <el-timeline>
          <el-timeline-item
            v-for="art in articals"
            :key="art._id"
            :timestamp="art.date"
            placement="top"
            hide-timestamp
          >
            <el-card>
              <router-link :to="'/preview?id=' + art._id">
                <div class="artical-item">
                  <div class="artical-item-head">
                    <div class="head-l">
                      <span>{{ art.title }}</span>
                    </div>
                    <div class="head-r">
                      <div>
                        <i class="hot"></i>
                        <span>({{ art.see }})</span>
                      </div>
                      <div>
                        <i class="fav"></i>
                        <span>({{ art.fav }})</span>
                      </div>
                    </div>
                  </div>
                  <div class="artical-item-main">
                    <img :src="art.preview" alt="" />
                  </div>
                </div>
              </router-link>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="block-center" v-else>
        <div class="block-center-noData">
          <img src="@/assets/noData.png" alt="" />
          <span style="color:#ff6e07"
            >正在冥想中。。。（可能一会过几天才能想出来）</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { articalSearch } from "@/api/artical";
export default {
  name: "home",
  computed: {
    ...mapGetters(["userInfo", "isLogin"]),
  },
  data() {
    return {
      // 列表loading
      loading: true,
      articals: [],
      tags: [
        {
          name: "前端",
          type: "success",
          id: 1,
        },
        {
          name: "node",
          type: "info",
          id: 2,
        },
        {
          name: "vue",
          type: "warning",
          id: 3,
        },
        {
          name: "react",
          type: "danger",
          id: 4,
        },
        {
          name: "算法",
          type: "info",
          id: 5,
        },
        {
          name: "全部",
          type: "info",
          id: "",
        },
      ],
    };
  },
  mounted() {
    this.getArtical();
  },
  methods: {
    //   获取所有文章
    getArtical() {
      this.loading = true;
      articalSearch()
        .then((res) => {
          if (res.code === 200) {
            setTimeout(() => {
              this.loading = false;
              this.articals = res.data;
            }, 2000);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // 点击左侧type 查找文章
    handleTypeSearch(item) {
      this.loading = true;
      if (item.id === "") {
        this.getArtical();
      } else {
        articalSearch({ type: item.id })
          .then((res) => {
            if (res.code === 200) {
              setTimeout(() => {
                this.loading = false;
                this.articals = res.data;
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
a {
  color: black;
  text-decoration: none;
  :active,
  :hover,
  :link {
    color: black;
    text-decoration: none;
  }
}
.home {
  width: 1600px;
  margin: 0 auto;
  color: black;
  margin: 30px auto;
  display: flex;
  // align-items: center;
  justify-content: center;
  .home-aside {
    width: 400px;
    height: 800px;
    background: white;
    border: 20px;
    border-radius: 20px;
    margin-right: 20px;
    .login-write {
      text-align: center;
      margin-top: 20px;
      a {
        color: white;
        background: #44bbaa;
        padding: 10px 15px;
        border-radius: 10px;
      }
    }
    .home-aside-top {
      padding: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      .home-aside-top-info {
        margin-top: 20px;
        font-size: 20px;
        width: 100%;
        .home-aside-top-info-link {
          display: flex;
          align-items: center;
          justify-content: space-around;
          img {
            width: 40px;
            height: 40px;
          }
        }
        div {
          margin: 15px 0;
          display: flex;
          justify-content: center;
        }
      }
    }
    .home-aside-tags {
      padding: 0 20px;
      .home-aside-tagClas {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 20px;
      }
    }
  }
  .home-main {
    flex: 1;
    padding: 20px;
    display: flex;
    background: white;
    border-radius: 20px;
    height: 800px;
    overflow: auto;
    .block-center {
      width: 95%;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .block-center-noData {
        display: flex;
        align-items: center;
        flex-direction: column;
        img {
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
        }
      }
    }
    .block {
      width: 95%;
      padding: 20px;
      .artical-item-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .head-l {
          font-size: 26px;
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .head-r {
          display: flex;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            margin: 0 20px;
            span {
              color: #ccc;
              margin-left: 10px;
            }
            .hot {
              width: 20px;
              height: 20px;
              background: url("../assets/hot.png") no-repeat center center;
              background-size: 100% 100%;
            }
            .fav {
              width: 20px;
              height: 20px;
              background: url("../assets/fav.png") no-repeat center center;
              background-size: 100% 100%;
            }
          }
        }
      }
      .artical-item-main {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 290px;
          border-radius: 20px;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
