<template>
  <div class="container">
    <div class="desc">
      <span>支出说明</span>
      <!-- <textarea v-model="text_value"
                placeholder="请输入支出说明"
                placeholder-class="placeholder"
                cols="5"></textarea> -->
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
      <span>支出金钱</span>
      <el-input type="text"
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
                   :value="item.id">
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
      <!-- <textarea v-model="text_value"
                placeholder="请输入支出说明"
                placeholder-class="placeholder"
                cols="5"></textarea> -->
      <!-- <el-upload action="#"
                 list-type="picture-card"
                 :on-preview="handlePictureCardPreview"
                 :on-remove="handleRemove"
                 :http-request="uploadAvatar"
                 :before-upload="beforeAvatarUpload"
                 :file-list="fileList"
                 class="uploader">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </el-dialog> -->
      <UploadList :list="proofList"
                  style="margin-top:10px;"></UploadList>

    </div>
    <div class="btn">
      <el-button type="primary"
                 round
                 @click="confirm">提交</el-button>
    </div>
  </div>
</template>

<script>
import UploadList from '@/components/UploadList'
import { saveData, getTypeList } from '@/network/home'
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
        content: '',
        pay_proof: [],
      },
      typeList: null,
      proofList: [],
      btnLoading: false,
      listLoading: false,
    }
  },
  components: {
    UploadList,
  },
  created () {
    this.getList()
  },
  methods: {
    confirm () {
      this.btnLoading = true;
      console.log(this.form);
      if (this.proofList) {
        this.form.pay_proof = this.proofList
      }
      this.form.pay_datetime = moment(this.form.pay_datetime).format('YYYY-M-DD h:mm:ss')
      saveData(this.form).then(() => {
        // this.getTypeList();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.backIndex()
      })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    getList () {
      this.listLoading = true;
      getTypeList().then(response => {
        this.length = response.data.length
        this.typeList = response.data.data;
        this.listLoading = false;
        console.log(this.typeList);
      });
      for (let i = 0; i < this.length; i++) {
        this.type.push(this.typeList[i].title)
      }
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