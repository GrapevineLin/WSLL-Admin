<template>
  <div class='orderTable'>
    <div class="order-header"> 
      <el-button type="danger" @click="handleMultiDelete" class="del-btn">批量删除</el-button>
    </div>
    <el-table
     :data="ordersList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      stripe="true"
      style="width: 90%;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="center"></el-table-column>
      <el-table-column label="订单号" width="160" align="center">
        <template slot-scope="scope">{{scope.row.order_id}}</template> 
      </el-table-column>
      <el-table-column prop="nickname" label="下单人" width="100" align="center"></el-table-column>  
      <el-table-column prop="order_content" label="订单内容" width="240" align="center">
        <template slot-scope="scope">
          <img :src="item.goods_picture_path" v-for="(item, index) in scope.row.order_content" :key="index" class="img-box"/>
        </template>
      </el-table-column>
      <el-table-column prop="pay_status" label="订单状态" width="100" align="center"></el-table-column>
      <el-table-column prop="pay_price" label="总金额" width="100" align="center">
        <template slot-scope='scope'>￥{{scope.row.pay_price}}</template>
      </el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="240" align="center">
        <template slot-scope="scope">
          <i class='el-icon-time'></i>
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" align='center'>
          <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="order-bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"        
        layout="total,sizes, prev, pager, next, jumper"
        :total="ordersList.length">    
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { Promise } from 'q';
export default {
  data(){
    return{
      // ordersList: [
      //   {
      //     order_id: 'fdssfsfs',
      //     nickname: 'ls',
      //     order_content: [
      //       {
      //         goods_picture_path:  require('../assets/1.jpg'),
      //       },
      //       {
      //         goods_picture_path:  '../assets/logo.png',
      //       }
      //     ],
      //     pay_status: '待付款',
      //     pay_price: 12345,
      //     create_time: '2018-09-12'
      //   },
      //   {
      //     order_id: 'fdssfsfs',
      //     nickname: 'ls',
      //     order_content: [
      //       {
      //         goods_picture_path:  require('../assets/1.jpg'),
      //       },
      //       {
      //         goods_picture_path:  '../assets/logo.png',
      //       }
      //     ],
      //     pay_status: '待付款',
      //     pay_price: 12345,
      //     create_time: '2018-09-12'
      //   }
      // ],
      ordersList: [],
      tempList: [], //删除列表
      currentPage: 1,
      pagesize: 5
    }
  },
  methods: {

  async getAllOrders(){
      let _this = this;
      let result = await _this.$http({
        method: 'get',
        url: '/getAllOrdersAdmin'
      });
      let ordersList = await _this.formatArr(result.data);
      console.log(ordersList, "优化过后");
      // _this.tempList = ordersList; //所有表数据存入temp中

      //限定每页显示5条数据
      
      _this.ordersList = ordersList;
    },
    handleMultiDelete(){
      let _this = this;
      let deleteList = this.tempList;
      this.$confirm(`是否要删除${deleteList.length}条订单?`,'提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http({
          method: 'post',
          url: '/admin/deleteMultiOrders',
          header: {
            'content-type': 'application/json'
          },
          data:{
            deleteList
          }
        }).then((res) => {
            console.log(res.data, "返回的结果");
            if(res.data == 'success'){
              _this.$message({
                type: 'success',
                message: '删除成功',
              })
              _this.getAllOrders(); 
            }else{
              _this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
        }).catch((error) => {
          console.log(error);
        })
      })
    },
    handleDelete(checkedOrder){
      let _this = this;
      let order_id = checkedOrder.order_id;
      this.$confirm("是否要删除这条订单?", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$http({
          method: 'get',
          url: `/admin/deleteOrder?order_id=${order_id}`
        }).then((res) => {
            if(res.data == 'success'){
              _this.$message({
                type: 'success',
                message: '删除成功',
              })
              _this.getAllOrders(); 
            }else{
              _this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
        }).catch((error) => {
          console.log(error);
        })
      })
      
    },
    handleSelectionChange(checkedOrders){
      console.log(checkedOrders, "选中删除的订单列表");
      let newArr = [];
      for(let item of checkedOrders){
        newArr.push(item.order_id);
      }
      console.log(newArr);
      this.tempList = newArr; 
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
    },
    getImgUrl: function(e) {
      return this.GLOBAL.staticURL + "/" + e;
    },
    formatArr(list){
      let newArr = [];
      let _this = this;
      return new Promise((resolve) => {
        for(let item1 of list){
          let nickname = item1.nickname;
          for(let item2 of item1.orders){
            let order_id = item2.order_id;
            let pay_status = item2.pay_status;
            let pay_price = item2.pay_price;
            let create_time = _this.formatTimes(item2.create_time);
            let order_content = [];
            for(let item3 of item2.goodsOrdersList){
              order_content.push({goods_picture_path: _this.getImgUrl(item3.goods.goods_picture_path)});
            }
            newArr.push({
              nickname,
              order_id,
              pay_status,
              pay_price,
              create_time,
              order_content
            })
          }

        }
        resolve(newArr);
      })


    },
    formatTimes(date){
      date = new Date(date);
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const formatNumber = n => {
          n = n.toString()
          return n[1] ? n : '0' + n
        }
      console.log("dsssss");
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }   
 
  },
  created(){
    this.getAllOrders();
  }
  
};
</script>

<style scoped>
  .el-table{
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 4px 4px rgb(22, 149, 180);
  }
  .orderTable{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .order-header{
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* background-color: #ccc; */
    margin-bottom: 20px;
    width: 90%;
  }
  .img-box{
    display: flex;
    height: 30px;
    width: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    float: left;
  }
  .order-bottom{
    margin-top: 20px;
  }
</style>