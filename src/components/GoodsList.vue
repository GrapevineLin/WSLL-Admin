<template>
  <div class>
    <!-- <el-button type="primary" @click="getGoods">加载商品</el-button> -->
    <div class="items" v-for="(item,index) in goodsItems" :key="index">
      <img class="goodsImg" v-bind:src="getImgUrl(item.goods_picture_path)" />
      <div class="goodName">{{item.goods_name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsItems: "",
      staticURL: this.GLOBAL.staticURL
    };
  },
  created: function() {
    this.getGoods();
  },
  methods: {
    getGoods: function() {
      this.$http({
        method: "get",
        url: "/findGoods"
      }).then(
        response => {
          this.goodsItems = response.data.goods;
          console.log("goodsItems", this.goodsItems);
        },
        err => {
          console.log(err);
        }
      );
    },
    getImgUrl: function(e) {
      return this.staticURL + "/" + e;
    }
  }
};
</script>

<style>
.items {
  /* display:inline-block; */
  float: left;
  padding: 7px;
}
.goodsImg {
  width: 100px;
  height: 100px;
}
.goodName {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
}
</style>