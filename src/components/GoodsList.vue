<template>
  <div class>
    <div class="operation">
      <!-- 添加商品 -->
      <el-button type="primary" @click="dialogAddVisible = true" icon="el-icon-plus">添加商品</el-button>
      <el-dialog title="添加商品" :visible.sync="dialogAddVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.goods_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.goods_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" :label-width="formLabelWidth">
            <el-input v-model="form.goods_buy" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload drag action="string" :http-request="UploadImg" :limit="1">
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
        <!-- 修改商品 -->
        <el-button @click="showDialogModify(index)" type="primary" icon="el-icon-edit" circle></el-button>
        <el-dialog title="修改商品" :visible.sync="dialogModifyVisible">
          <el-form :model="modifyForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称">
              <el-input v-model="modifyForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" :label-width="formLabelWidth">
              <el-input v-model="modifyForm.goods_price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" :label-width="formLabelWidth">
              <el-input v-model="modifyForm.goods_buy" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品类别" :label-width="formLabelWidth">
              <el-select v-model="type" placeholder="请选择活动区域" @change="chooseType">
                <el-option
                  v-for="(item,index) in typeListP"
                  :key="index"
                  :label="item.type_name"
                  :value="item.type_id"
                ></el-option>
              </el-select>
              <el-select v-model="modifyForm.goods_type" placeholder="请选择活动区域">
                <el-option
                  v-for="(item,index) in typeListP[type].subGoodsTypes"
                  :key="index"
                  :label="item.type_name"
                  :value="item.type_id"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogModifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifyGood">确 定</el-button>
          </div>
        </el-dialog>
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
      dialogModifyVisible: false,
      deleteItemId: -1,
      deleteItemIndex: -1,
      addItemPicPath: "",
      form: {
        goods_name: "",
        goods_price: "",
        goods_buy: ""
      },
      modifyForm: {
        goods_name: "",
        goods_price: "",
        goods_buy: ""
      },
      rules: {},
      type: 0,
      subType: [],
      typeListP: [],
      formLabelWidth: "100px"
    };
  },
  created: function() {
    this.getGoods();
  },
  mounted() {
    this.getType();
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
    getType: function() {
      this.$http({
        method: "GET",
        url: "/getGoodsType"
      }).then(response => {
        this.typeListP = response.data.typeListP;
        console.log("typeListP", this.typeListP);
      });
    },
    chooseType(index) {
      console.log("changeIndex:", index);
      this.subType = this.typeListP[index].subGoodsTypes;
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
          goods_price: form.goods_price,
          goods_picture_path: this.addItemPicPath,
          goods_browse: form.goods_buy
        }
      }).then(
        response => {
          this.getGoods();
          this.addItemPicPath = "";
          console.log("response", response);
        },
        err => {
          console.log(err);
        }
      );
    },
    showDialogModify: function(index) {
      this.dialogModifyVisible = true;
      this.modifyForm = this.goodsItems[index];
    },
    modifyGood: function() {
      this.dialogModifyVisible = false;
      let form = this.modifyForm;
      // let form = JSON.stringify(this.modifyForm);
      this.$http({
        method: "POST",
        url: "/admin/updateGoods",
        params: {
          goods_id: form.goods_id,
          goods_name: form.goods_name,
          goods_price: form.goods_price,
          goods_buy: form.goods_buy,
          goods_type: form.goods_type,
          goods_describe: form.goods_describe,
          goods_price: form.goods_price,
          goods_enable: form.goods_enable,
          goods_browse: form.goods_browse,
          goods_picture_path: form.goods_picture_path
        }
      }).then(
        response => {
          this.getGoods();
          this.addItemPicPath = "";
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
    },
    UploadImg(content) {
      console.log("content", content);
      var self = this;
      var file = new FormData();
      file.append("file", content.file);
      return self
        .$http({
          method: "POST",
          url: "/admin/upload",
          data: file
        })
        .then(res => {
          self.addItemPicPath = res.data.img;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.items {
  /* display:inline-block; */
  float: left;
  padding: 7px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 4px 4px rgb(22, 149, 180);
  margin: 10px;
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