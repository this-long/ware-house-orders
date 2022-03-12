<template>
  <div>
    <div class="WareHouseList">
      <div class="WareHouseList-top">
        <el-input
          v-model="inputName"
          placeholder="请输入内容"
          clearable
          style="width: 400px"
        ></el-input>
        <el-button style="margin-left: 15px" type="info"
          >查找商品信息</el-button
        >

        <el-button type="info" style="margin-left: 15px" plain @click="addThing"
          >添加商品</el-button
        >
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="wareName" label="商品名"> </el-table-column>
        <el-table-column label="商品型号" width="250">
          <template slot-scope="scope">
            <el-tag
              style="margin-left: 10px; margin-bottom: 10px"
              v-for="ele in scope.row.wareType"
              :key="ele"
              type="info"
              >{{ ele }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="商品套餐">
          <template slot-scope="scope">
            <el-tag
              style="margin-left: 10px; margin-bottom: 10px"
              v-for="ele in scope.row.setMeal"
              :key="ele"
              type="info"
              effect="plain"
              >{{ ele.price }} {{ ele.set }}¥</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="num" label="商品库存" align="center" width="100">
        </el-table-column>
        <el-table-column label="商品简介" width="120" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              title="商品简介"
              width="350"
              trigger="click"
              :content="scope.row.wareIntroduce"
            >
              <el-button size="mini " slot="reference">查看简介</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini " @click="editBtn(scope)" type="warning" plain
              >编辑</el-button
            >
            <el-button size="mini " @click="delBtn(scope)" type="danger" plain
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputName: "",
      tableData: [],
    };
  },

  async created() {
    console.log(this.$route);
    var res = null;
    if (this.$route.query.type === "digitalProducts") {
      res = await this.$axios.get("/getData/getData");
      console.log("接口测试1", res);
    } else if (this.$route.query.type === "foodHouse") {
      res = await this.$axios.get("/getFoodData/getFoodData");
      console.log("接口测试2", res);
    } else if (this.$route.query.type === "lifeThings") {
      res = await this.$axios.get("/getLifeThingsData/getLifeThingsData");
      console.log("接口测试3", res);
    }

    this.tableData = res.data.data;
  },

  methods: {
    editBtn(row) {
      console.log(row);
    },
    delBtn(row) {
      console.log(row);
    },

    addThing() {
      this.$router.push("/addWareThings");
    },
  },
};
</script>

<style scoped>
.WareHouseList {
  padding: 15px;
}
.WareHouseList .WareHouseList-top {
  padding-bottom: 15px;
}
</style>