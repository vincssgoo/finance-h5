<template>
  <div class="container">
    <div class="desc">
      <span>支出说明</span>
      <el-input type="textarea"
                v-model="form.desc"
                placeholder="请输入支出说明"
                class="desc_input"></el-input>
    </div>
    <div class="time">
      <span>支出时间</span>
      <el-date-picker v-model="form.pay_datetime"
                      type="datetime"
                      placeholder="请选择支出时间"
                      class="picker">
      </el-date-picker>
    </div>
    <div class="money">
      <span>支出金额</span>
      <el-input type="number"
                v-model="form.price"
                placeholder="请输入支出金额"
                class="money_input"></el-input>
    </div>
    <div class="type">
      <span>支出类型</span>
      <el-select placeholder="请选择类型"
                 v-model="form.type_id"
                 class="selecter">
        <el-option v-for="item in typeList"
                   :label="item.title"
                   :value="item.id"
                   :key="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="apply">
      <span>申请人</span>
      <el-input type="text"
                v-model="form.applicant"
                placeholder="请输入申请人"
                class="apply_input"></el-input>
    </div>
    <div class="remark">
      <span>备注</span>
      <!-- <textarea v-model="text_value"
                placeholder="请输入支出说明"
                placeholder-class="placeholder"
                cols="5"></textarea> -->
      <el-input type="textarea"
                v-model="form.content"
                placeholder="请输入备注"
                class="remark_input"></el-input>
    </div>
    <div class="proof">
      <span>支出凭证</span>
      <UploadList v-model="form.pay_proof"
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
      <!-- <confirm
      v-model="questionStatus"
      title="提醒"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
        <p style="text-align:center;">确认提交</p>
      </confirm> -->
    </div>
  </div>
</template>

<script>
import UploadList from '@/components/UploadList'
import { saveData, getTypeList } from '@/network/home'
import { MessageBox } from 'mint-ui';
var moment = require("moment");
export default {
  name: '',
  data () {
    return {
      // text_value: `100亿元项目，世界500强、中国500强及跨国公司投构100亿元项目，世界500强、中国500强及跨国公司机构`,
      form: {
        desc: '',
        pay_datetime: '',
        price: '',
        type_id: '',
        applicant: '',
        pay_proof: [],
      },
      formExplain: {
        desc: '支出说明',
        pay_datetime: '支出时间',
        price: '支出金额',
        type_id: '支出类型',
        applicant: '申请人',
        pay_proof: '支出凭证',
      },
      content: '',
      typeList: null,
      btnLoading: false,
      listLoading: false,
      questionStatus: false,
    }
  },
  components: {
    UploadList,
  },
  created () {
    this.getList()
  },
  methods: {
    resetForm () {
      this.form = {
        desc: '',
        pay_datetime: '',
        price: '',
        type_id: '',
        applicant: '',
        pay_proof: [],
      }
      this.content = ''
    },
    confirm () {
      for (let i in this.form) {
        if (this.form[i] === '' || this.form[i].length == 0) {
          this.$message({
            type: "error",
            message: this.formExplain[i] + "不能为空",
            duration: 1500,
            showClose: true,
          });
          return
        }
      }
      this.form.content = this.content ? this.content : ''
      this.form.price = parseFloat(this.form.price).toFixed(2)
      this.form.pay_datetime = moment(this.form.pay_datetime).format('YYYY-M-DD h:mm:ss')
      this.btnLoading = true;
      // this.onConfirm()
      this.$confirm('确定上传吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveData(this.form).then(res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "提交成功!",
              duration: 1500,
              showClose: true,
            });
            this.resetForm()
          }
          else {
            // this.$message({
            //   showClose: true,
            //   message: 'res.msg',
            //   type: 'error'
            // });
            this.$message.error(res.msg)
          }

        })
          .finally(() => {
            this.btnLoading = false;
            this.questionStatus = false
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    onCancel () {
      this.questionStatus = false
      this.btnLoading = false;
    },
    onConfirm () {
      saveData(this.form).then(res => {
        this.$message({
          type: "success",
          message: "提交成功!",
          duration: 1500,
          showClose: true,
        });
        this.resetForm()
      })
        .finally(() => {
          this.btnLoading = false;
          this.questionStatus = false
        });
    },
    getList () {
      this.listLoading = true;
      getTypeList().then(response => {
        this.typeList = response.data.data;
        this.listLoading = false;
        console.log(this.typeList);
        for (let i = 0; i < this.typeList.length; i++) {
          if (this.typeList[i].status == 2) {
            this.typeList.splice(i, 1)
          }
        }
      });
    },
  }
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