<template>
  <div class="app-container managerIndex">
    <el-container>
      <el-aside class="custom-tree-container" width="300px">
        <div class="block">
          <el-input
            placeholder="搜索"
            v-model="filterText">
          </el-input>
          <el-row style="margin: 20px 0px;">
            <router-link to="/manager/mumber/add"><el-button plain>增加子组织</el-button></router-link>
            <el-button type="primary" plain>筛选组织</el-button>
          </el-row>
          <el-tree
            class="filter-tree"
            :data="data2"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree2">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                    <el-dropdown-item command="b">狮子头</el-dropdown-item>
                    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-main style="padding: 0px 0px 0px 20px;">
        <el-input v-model="input" placeholder="搜索"></el-input>
        <el-row style="margin: 20px 0px;">
          <router-link to="/manager/organization/add"><el-button type="primary" plain>新建成员</el-button></router-link>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="name"
            label="成员名称"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">停用</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },

    data() {
      return {
        filterText: '',
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        input: '',
        tableData: [{
          name: '王小虎',
          phone: '15033442222',
          role: '销售顾问',
          status: '启用',
        }, {
          name: '王小虎',
          phone: '15033442222',
          role: '销售顾问',
          status: '启用',
        }, {
          name: '王小虎',
          phone: '15033442222',
          role: '销售顾问',
          status: '启用',
        }, {
          name: '王小虎',
          phone: '15033442222',
          role: '销售顾问',
          status: '启用',
        }]
      };
    },

    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

