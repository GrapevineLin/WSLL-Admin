<template>
  <div class>
    <div class="operation">
      <!-- 添加商品 -->
      <el-button type="primary" @click="dialogAddVisible = true" icon="el-icon-edit" circle></el-button>
      <el-dialog title="添加商品" :visible.sync="dialogAddVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.goods_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.goods_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload drag action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGood">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="items" v-for="(item,index) in goodsItems" :key="index">
      <img class="goodsImg" v-bind:src="getImgUrl(item.goods_picture_path)" />
      <div class="goodName">{{item.goods_name}}</div>
      <div class="oper">
        <!-- 删除商品 -->
        <el-button
          @click="showDialog(item.goods_id,index)"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>确定删除这条商品吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delGood">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsItems: "",
      staticURL: this.GLOBAL.staticURL,
      dialogAddVisible: false,
      dialogVisible: false,
      deleteItemId: -1,
      deleteItemIndex: -1,
      form: {
        goods_name: "",
        goods_price: ""
      },
      formLabelWidth: "120px"
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
    },
    showDialog: function(id, index) {
      this.deleteItemIndex = index;
      this.deleteItemId = id;
      this.dialogVisible = true;
    },
    addGood: function(e) {
      this.dialogAddVisible = false;
      let form = this.form;
      let formData = JSON.stringify(this.form);
      this.$http({
        method: "POST",
        url: "/admin/addGood",
        params: {
          goods_name: form.goods_name,
          goods_price: form.goods_price
        }
      }).then(
        response => {
          this.getGoods();
          console.log("response", response);
        },
        err => {
          console.log(err);
        }
      );
    },
    delGood: function() {
      this.dialogVisible = false;
      this.$http({
        method: "get",
        url: "/admin/deleteGoodsById",
        params: { id: this.deleteItemId }
      }).then(
        response => {
          console.log("delete:", response);
          this.goodsItems.splice(this.deleteItemIndex, 1);
        },
        err => {
          console.log(err);
        }
      );
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>

.items {
  /* display:inline-block; */
  float: left;
  padding: 7px;
  text-align: center;
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