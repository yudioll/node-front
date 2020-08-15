<template>
  <div class="writeArtical">
    <div class="write-main">
      <h2 class="write-head">添加文章</h2>
      <div class="write-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章描述" prop="des">
            <el-input v-model="ruleForm.des"></el-input>
          </el-form-item>
          <el-form-item label="文章预览图" prop="preview">
            <el-upload
              class="upload-demo"
              action=""
              :disabled="ruleForm.preview === '' ? false : true"
              :before-upload="beforeAvatarUpload"
              :limit="1"
            >
              <img
                v-if="ruleForm.preview"
                :src="ruleForm.preview"
                class="avatar"
              />
              <el-button size="small" style="margin-left:20px;" type="primary"
                >点击上传</el-button
              >
            </el-upload>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <mark-down @on-save="handleSave" :height="editHeight"></mark-down>
          </el-form-item>
          <el-form-item label="时间" required>
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { upLoadImg, articalAdd } from "@/api/artical";
import MarkDown from "vue-meditor";
export default {
  name: "writeArtical",
  components: {
    MarkDown,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      editHeight: 400,
      options: [
        {
          label: "前端",
          value: 1,
        },
        {
          label: "node",
          value: 2,
        },
        {
          label: "vue",
          value: 3,
        },
        {
          label: "react",
          value: 4,
        },
        {
          label: "算法",
          value: 5,
        },
      ],
      ruleForm: {
        title: "",
        des: "",
        preview: "",
        type: "",
        content: "",
        date: "",
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        des: [{ required: true, message: "请输入文章描述", trigger: "blur" }],
        preview: [
          { required: true, message: "请上传预览图", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "change" },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        type: [
          {
            required: true,
            message: "请至少选择一个文章标签",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    console.log(this.userInfo);
  },
  methods: {
    handleSave(value) {
      if (value.html == "") {
        this.$message({
          type: "error",
          message: "请输入文章内容",
        });
      } else {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.ruleForm.content = value.html;
      }
    },
    submitForm(formName) {
      this.ruleForm = { ...this.ruleForm, author_id: this.userInfo._id };
      console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          articalAdd(this.ruleForm)
            .then((res) => {
              if (res.code === 200) {
                this.$router.push("/home");
              } else {
                this.$message.error("服务正在升级, 稍后请重试");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async uploadImg(file, type) {
      const fd = new FormData();
      fd.append("img", file);
      return upLoadImg(fd)
        .then((res) => {
          console.log(res);
          if (res.code === 200 && type === "preview") {
            this.ruleForm.preview = res.data.img;
          }
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beforeAvatarUpload(file) {
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        this.$message.error("请上传图片类型文件");
        return false;
      }
      this.uploadImg(file, "preview");
      // upLoadImg
      return false;
    },
    handleAvatarSuccess() {},
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        this.$message.error("请上传图片类型文件");
        return false;
      }
      const res = await this.uploadImg(file, "content");
      Editor.insertEmbed(cursorLocation, "image", res.data.img);
      resetUploader();
    },
  },
};
</script>

<style lang="scss" scoped>
.writeArtical {
  border-radius: 20px;
  width: 1600px;
  height: 900px;
  margin: 0 auto;
  background: white;
  margin: 30px auto;
  overflow-y: hidden;
  ::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 300px;
  }

  .write-head {
    text-align: center;
    padding: 15px 0;
    font-size: 26px;
  }
  .write-content {
    width: 80%;
    margin: 20px auto;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>
