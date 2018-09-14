<template>
  <div class="app-container">
    <el-row>
      <span class="_lable">关键字实时搜索</span>
      <el-autocomplete
        v-model="state4"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
    </el-row>
    <el-row style="margin: 20px 0px;">
      <router-link to="/role/role/add"><el-button plain>新建角色</el-button></router-link>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="name"
        label="角色名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleTmp"
        label="角色模板"
        sortable
        width="180">
      </el-table-column>
      <!-- <el-table-column
        prop="number"
        label="使用人数"
        sortable
        width="180">
      </el-table-column> -->
      <el-table-column align="center" prop="number" sortable label="使用人数">
        <template slot-scope="scope">
          <span v-if="scope.row.number" class="link-type" @click='handleFetchNum(scope.row.number)'>{{scope.row.number}}人</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == '1'">启用</span>
          <span v-else>停用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <router-link to="/role/role/edit"><el-button
            size="mini">编辑</el-button></router-link>
          <el-button v-if="scope.row.status == '1'"
            size="mini"
            @click="handleStatus(scope.row, '0')">停用</el-button>
          <el-button v-if="scope.row.status == '0'"
            size="mini"
            @click="handleStatus(scope.row, '1')">启用</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="使用成员列表" :visible.sync="dialogNumVisible">
      <el-row style="margin-bottom: 22px;">角色说明：xxxxxxxxxxxxxxxxxxxxxxx</el-row>
      <el-table :data="numData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="name" label="成员姓名"> </el-table-column>
        <el-table-column prop="role" label="所属组织"> </el-table-column>
        <el-table-column prop="status" label="成员状态"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      key: '',
      tableData: [{
        name: '王小虎1',
        roleTmp: '销售顾问5',
        number: '70',
        status: '0',
      }, {
        name: '王小虎2',
        roleTmp: '销售顾问3',
        number: '70',
        status: '0',
      }, {
        name: '王小虎3',
        roleTmp: '销售顾问8',
        number: '7',
        status: '1',
      }, {
        name: '王小虎5',
        roleTmp: '销售顾问2',
        number: '70',
        status: '1',
      }],
      dialogNumVisible: false,
      numData: [
        {name: '王胖子', role: '广州番薯店销售', status: '启用'},
        {name: '王胖子', role: '广州番薯店销售', status: '启用'},
        {name: '王胖子', role: '广州番薯店销售', status: '启用'},
        {name: '王胖子', role: '广州番薯店销售', status: '启用'},
      ],
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {

    },
    handleSelect(item) {
      console.log(item);
    },
    handleFetchNum(num) {
      /* fetchPv(num).then(response => {
        this.numData = response.data.numData
        this.dialogNumVisible = true
      }) */
      this.dialogNumVisible = true
    },
    handleStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    }
  }
}
</script>

<style lang="scss" scoped>
  ._lable{
    color: #606266;
    font-size: 14px;
    font-weight: 700;
    display: inline-block;
    width: 120px;
  }
  .link-type,
  .link-type:focus {
    color: #337ab7;
    cursor: pointer;
    &:hover {
      color: rgb(32, 160, 255);
    }
  }
</style>

