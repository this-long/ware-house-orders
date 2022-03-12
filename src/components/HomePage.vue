<template>
  <div class="MainPage">
    <!-- 导航菜单 -->
    <div class="MenuTop">
      <div class="logo">
        <span class="logoSpan" style="fons-size: 18px" @click="goHome"
          >仓库订单处理系统</span
        >
      </div>
      <el-menu
        router
        style="width: 80%"
        default-active="WareHouseMain"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="WareHouseMain">仓库图层</el-menu-item>
        <!-- <el-menu-item index="2">仓库订单</el-menu-item> -->
        <el-submenu index="Order">
          <template slot="title">仓库订单</template>
          <el-menu-item index="CustomerLocation">客户位置</el-menu-item>
          <el-menu-item index="OrderLists">订单列表</el-menu-item>
          <el-menu-item index="CharList">数据可视化</el-menu-item>
        </el-submenu>
        <el-menu-item index="PathPlan">路径规划</el-menu-item>
        <el-menu-item index="WareInventory">仓库库存</el-menu-item>
        <el-menu-item index="SetPage">设置</el-menu-item>
        <el-menu-item @click="signOut" index="signOut">退出登录</el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>
<script type="text/javascript">
window._AMapSecurityConfig = {
  securityJsCode: "5885da62a0da2ca7cf5d212e6b671140",
};
</script>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    signOut() {
      sessionStorage.removeItem("username");
      this.$notify({
        title: "成功",
        message: "账户退出成功",
        type: "success",
      });
      this.$router.push("/login");
    },

    goHome() {
      this.$router.push("/WareHouseMain");
    },
  },
};
</script>

<style >
.logo {
  width: 20%;
  background-color: #545c64;
  height: 60px;
}
.MenuTop {
  color: white;
  line-height: 60px;
  display: flex;
}
.MenuTop .logo span {
  font-size: 18px !important;
  cursor: pointer;
  padding-left: 15px;
}
</style>
