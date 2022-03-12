<template>
  <!-- 仓库图层 -->
  <div class="WareHouseMain">
    <div id="container" class="container"></div>
    <!-- 工具条start -->
    <div class="input-card-box">
      <div class="input-item">
        <input type="checkbox" @click="toggleScale()" />比例尺
      </div>
      <div class="input-item">
        <input type="checkbox" id="toolbar" @click="toggleToolBar()" />工具条
      </div>

      <!-- <div class="input-item">
        <input
          type="checkbox"
          id="overview"
          onclick="toggleOverViewShow(this)"
        />显示鹰眼
      </div> -->
    </div>
    <!-- 工具条end -->
  </div>
</template>
<script type="text/javascript">
window._AMapSecurityConfig = {
  securityJsCode: "5885da62a0da2ca7cf5d212e6b671140",
};
</script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=84f61226c5c3819011a303ef5c321e5f&plugin=AMap.MouseTool,AMap.HawkEye,AMap.DistrictSearch,AMap.Scale,AMap.ToolBar,AMap.ControlBar"></script>

<script>
export default {
  name: "WareHouseMain",
  data() {
    return {
      map: "", //地图实例
      lang: "zh_cn",
      // 弹框内容
      zoom: 10,
      title: "",
      content: [],
      infoWindow: null,
      markers: [],

      wareHouse: [
        {
          wareName: "钢铁物流园仓库",
          coordinate: [118.504165, 39.02162],
          type: "digitalProducts",
          typeName: "数码产品仓库",
          address: "唐山市曹妃甸区",
        },
        {
          wareName: "曹妃甸统一仓库",
          coordinate: [118.420319, 39.274479],
          type: "lifeThings",
          typeName: "生活用品仓库",
          address: "兴海大街西石化加油站西行",
        },
        {
          wareName: "浙江物产浙金物流滦州市仓库",
          coordinate: [118.485262, 39.598436],
          type: "foodHouse",
          typeName: "食品生鲜仓库",
          address: "茨榆坨镇连创制钢科技有限公司对面",
        },
      ], //仓库数组

      //工具条
      scale: null,
      isScale: false,
      toolBar: null,
      isToolBar: false,
      overView: null,
      isoverView: false,
    };
  },
  components: {},

  mounted() {
    this.initMap();

    this.addMarker();
  },
  async created() {
    // var res = null;
  },

  methods: {
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: this.zoom, //级别
        zooms: [9, 30],
        center: [118.420319, 39.274479], //中心点坐标
        viewMode: "3D", //使用3D视图
        lang: this.lang,
        mapStyle: "amap://styles/light",
        infoWindow: null,
      });

      this.scale = new AMap.Scale({
        visible: false,
      });
      this.map.addControl(this.scale);

      this.toolBar = new AMap.ToolBar({
        visible: false,
        position: {
          top: "110px",
          right: "40px",
        },
      });
      this.map.addControl(this.toolBar);

      // this.overView = new AMap.HawkEye({
      //   visible: true,
      // });
      // this.map.addControl(this.overView);
    },

    toggleScale() {
      // console.log(111, this.isScale);
      if (!this.isScale) {
        this.isScale = true;
        this.scale.show();
      } else {
        this.isScale = false;
        this.scale.hide();
      }
    },
    toggleToolBar() {
      // console.log(111, this.isToolBar);

      if (!this.isToolBar) {
        this.isToolBar = true;
        this.toolBar.show();
      } else {
        this.isToolBar = false;
        this.toolBar.hide();
      }
    },
    // toggleOverViewShow() {
    //   if (!this.isoverView) {
    //     this.overView.show();
    //   } else {
    //     this.overView.hide();
    //   }
    // },

    // 添加工业遗产点集
    async addMarker() {
      // var res = await this.$axios.get(
      //   "/getHeritageMainData/getHeritageMainData"
      // );
      // console.log("请求结果", res);
      // this.dataList = res.data.data;
      // this.restaurants = res.data.data; //绑定输入建议数据
      // console.log("请求结果", this.dataList);

      for (let i = 0; i < this.wareHouse.length; i++) {
        // 循环点坐标
        // 注意这里一定得用 let
        let marker = new AMap.Marker({
          map: this.map,
          position: this.wareHouse[i].coordinate,
          extData: this.wareHouse[i],
        });

        this.markers.push(marker);

        AMap.event.addListener(marker, "click", () => {
          // this.nowMarker = marker;

          // console.log(this.infoWindow);
          this.title = this.wareHouse[i].wareName;

          (this.content = [
            "地址：" + this.wareHouse[i].address,
            // "单位名称：" + this.wareHouse[i].company,
            "仓库类别：" + this.wareHouse[i].typeName,
            '<a href="/#/WareHouseList?type=' +
              this.wareHouse[i].type +
              '">查看详情</a>',
            // `<a href="#/heritage/industry/main/` +
            //   this.wareHouse[i]._id +
            //   `" class="xiangxi">详细信息</a>`,
          ]),
            (this.infoWindow = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              // content: '  <div style="background-color:white">111</div>',
              content: this.createInfoWindow(
                this.title,
                this.content.join("<br/>")
              ),
              offset: new AMap.Pixel(16, -45),
            }));
          this.infoWindow.open(this.map, marker.getPosition());
          // console.log(marker.getPosition());
        });
      }
    },

    //渲染遗产弹框
    createInfoWindow(title, content) {
      // console.log("11111111");
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },

    // 关闭遗产弹框
    closeInfoWindow() {
      this.map.clearInfoWindow();
      // this.searchIndustry = null;
    },
  },
};
</script>

<style >
/* 弹框样式 */
.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
  width: 280px;
  background-color: white;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}
div.info-middle img {
  width: 100px;
  height: 70px;
  padding-bottom: 10px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

span {
  margin-left: 5px;
  font-size: 11px;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}

.xiangxi {
  color: #555;
}

/*工具条样式*/
.input-card-box {
  width: 130px;
  top: 10px;
  left: 10px;
  bottom: auto;
  z-index: 999;
  position: absolute;
  top: 85px;
  left: 15px;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  font-size: 12px;
  border-width: 0;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  padding: 8px 8px;
}
.input-card-box .input-item {
  display: flex;
  align-items: center;
  height: 30px;
  /* line-height: 30px; */
}

.amap-toolbar {
  position: absolute;
  top: 15px;
  right: 15px;
}
.amap-scalecontrol {
  position: fixed;
  /* position: absolute; */
  bottom: 15px;
  left: 15px !important;
}
</style>
