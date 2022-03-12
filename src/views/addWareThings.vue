<template>
  <div class="addWareThings">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="wareName">
        <el-input v-model="ruleForm.wareName"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="thingType">
        <el-select v-model="ruleForm.thingType" placeholder="请选择商品类型">
          <el-option label="数码产品" value="digitalProducts"></el-option>
          <el-option label="食品生鲜" value="foodHouse"></el-option>
          <el-option label="生活用品" value="lifeThings"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="颜色类型">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </el-form-item>
      <el-form-item label="商品套餐">
        <el-button type="info" @click="dialogFormVisible = true" plain
          >添加套餐</el-button
        >
        <br />
        <div v-for="(ele, index) in ruleForm.setMeal" :key="index">
          <span>{{ ele.price }} {{ ele.set }}¥</span>
        </div>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number
          v-model="ruleForm.num"
          :min="1"
          label="请输入商品库存"
        ></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="商品简介" prop="wareIntroduce">
        <el-input type="textarea" v-model="ruleForm.wareIntroduce"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹框 -->
    <el-dialog title="套餐信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="套餐名称" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="套餐价格" :label-width="formLabelWidth">
          <el-input v-model="form.set" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSetMeal">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",

      ruleForm: {
        wareName: "",
        thingType: "",
        wareType: [],
        setMeal: [],
        wareIntroduce: "",
        num: 1,
      },
      rules: {
        wareName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, message: "长度在 2 个字符以上", trigger: "blur" },
        ],
        thingType: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        wareIntroduce: [
          { required: true, message: "请填写商品简介", trigger: "blur" },
        ],
      },

      // 弹框数据
      dialogFormVisible: false,
      form: {
        price: "",
        set: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    submitForm(formName) {
      this.ruleForm.wareType = this.dynamicTags;
      console.log(this.ruleForm);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          this.$notify.error({
            title: "错误",
            message: "请完善相关信息",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    addSetMeal() {
      if (this.form.price === "") {
        this.$notify.error({
          title: "错误",
          message: "请输入套餐名称",
        });
      } else if (this.form.set === "") {
        this.$notify.error({
          title: "错误",
          message: "请输入套餐价格",
        });
      } else {
        this.ruleForm.setMeal.push(this.form);
        this.form = {
          price: "",
          set: "",
        };
        console.log(this.ruleForm);

        this.dialogFormVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.addWareThings {
  padding: 15px;
  padding-top: 30px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>