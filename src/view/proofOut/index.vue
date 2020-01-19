<template>
  <div class="container">
    <div class="proof">
      <span>凭证</span>
      <UploadList :list="proofList"
                  style="margin-top:10px;"></UploadList>

    </div>
    <div class="btn">
      <el-button type="primary"
                 round
                 :loading="btnLoading"
                 @click="confirm">提交</el-button>
      <!-- <mt-button @click.native="confirm" size="large">提交</mt-button> -->
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import UploadList from '@/components/UploadList'
import { getOutcomeProof, postOutcomeProof } from '@/network/home'

var moment = require("moment");
export default {
  name: '',
  data () {
    return {
      proofList: [],
      // text_value: `100亿元项目，世界500强、中国500强及跨国公司投构100亿元项目，世界500强、中国500强及跨国公司机构`,
      form: {
        pay_proof: [],
        id: null,
        user_id: null,
      },
      btnLoading: false

    }
  },
  components: {
    UploadList,
  },
  created () {
    // console.log(window.location);
    var reg = new RegExp("(^|&)" + 'id' + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var reg2 = new RegExp("(^|&)" + 'user_id' + "=([^&]*)(&|$)", "i");
    var r2 = window.location.search.substr(1).match(reg2);
    console.log(r2);

    this.form.id = r[2]
    this.form.user_id = r2[2]
    console.log(this.form.id);
    console.log(this.form.user_id);
    this.getProof()
  },
  methods: {
    getProof () {
      getOutcomeProof(this.form.id).then(res => {
        console.log(res);
        if (res.data == null) {
          this.proofList = []
        }
        else {
          this.proofList = res.data
        }
      })
    },
    confirm () {
      if (!this.proofList) {
        this.$message({
          type: "error",
          message: "请上传凭证!",
          duration: 1500,
          showClose: true,
        });
      }
      this.form.pay_proof = this.proofList
      this.btnLoading = true;
      // this.onConfirm()
      this.$confirm('确定上传吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postOutcomeProof(this.form).then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "提交成功!",
              duration: 1500,
              showClose: true,
            });
          }
          else {
            this.$message({
              type: "error",
              message: res.msg,
              duration: 1500,
              showClose: true,
            });
          }

        })
          .finally(() => {
            this.btnLoading = false;
          });
      }).catch(() => {
        this.btnLoading = false;
        this.$message({
          type: 'info',
          message: '已取消上传',
        });
      });
    },

  },
}

</script>

<style lang="scss">
body {
  span {
    color: #222222;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 8px;
  }
  .el-message-box {
    width: 300px;
  }
}
.container {
  .desc {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    .desc_input {
      width: 345px;
      margin-top: 10px;
      margin-left: 8px;
      // border: 0.5px solid #dedede;
      // height: 95px;
      color: #666666;
      font-size: 14px;
    }
  }
  .time {
    display: flex;
    flex-direction: column;
    .picker {
      margin-left: 8px;
      margin-top: 10px;
    }
    [class*=" el-icon-"],
    [class^="el-icon-"] {
      display: none;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 15px;
    }
  }
  .money {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    .money_input {
      margin-left: 8px;
      margin-top: 10px;
    }
  }
  .type {
    display: flex;
    flex-direction: column;
    // margin-right: 15px;
    .selecter {
      margin-left: 8px;
      margin-top: 10px;
      width: 96%;
    }
    [class*=" el-icon-"],
    [class^="el-icon-"] {
      display: none;
    }
  }
  .apply {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    .apply_input {
      margin-left: 8px;
      margin-top: 10px;
    }
  }
  .remark {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    .remark_input {
      width: 345px;
      margin-top: 10px;
      margin-left: 8px;
      // border: 0.5px solid #dedede;
      // height: 95px;
      color: #666666;
      font-size: 14px;
    }
  }
  .proof {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    .uploader {
      margin-left: 8px;
      margin-top: 10px;
    }
    .avatar-uploader .el-upload {
      margin-left: 8px;
      border: 2px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    button {
      width: 345px;
      height: 42px;
      padding: 0;
      span {
        font-size: 18px;
        color: #fff;
        line-height: 42px;
        text-align: center;
        height: 42px;
      }
    }
  }
}
</style>