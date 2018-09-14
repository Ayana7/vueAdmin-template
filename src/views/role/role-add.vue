<template>
  <div class="app-container managerIndex">
    <el-container>
      <el-aside class="custom-tree-container" width="300px">
        <el-form ref="dataForm" :rules="rules" :model="form" label-width="120px" class="_form" label-position="left">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色模板" prop="roleTmp">
            <el-select v-model="form.roleTmp" placeholder="请选择角色模板">
              <el-option v-for="(item, index) in roleTmpOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色说明" prop="roleTips">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请用简单文字的描述此角色所拥有的权限和适用的用户类型"
              v-model="form.roleTips">
            </el-input>

          </el-form-item>
        </el-form>
      </el-aside>
      <el-main style="padding: 0px 0px 0px 20px;">
        <template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="功能模块" name="first">
              <el-row class="help-tips">
                添加了功能模块则视为该角色可以访问此功能模块，否则该角色在页面中看不到此功能模块
              </el-row>
              <el-row v-for="(action, index) in actionAuthority">
                <el-row class="_title">
                  <span class="_tags"></span>
                  <span>{{action.authorityName}}</span>
                </el-row>
                <el-dropdown :hide-on-click="false" v-for="(moduleList, i) in action.actionModuleList" class="_dropdown">
                  <button type="button" class="el-button el-button--default el-button--small">
                    <span>{{moduleList.moduleName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                  </button>
                  <sup class="el-error__content is-fixed" @click="deleteModule(index, i)"><i class="el-icon-error el-icon--right"></i></sup>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, iindex) in moduleList.actionOptions">
                      <el-checkbox v-model="item.checked" :disabled="item.disabled">{{item.name}}</el-checkbox>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <button type="button" class="el-button el-button--default el-button--small _add-button" @click="addModule(index)">
                  <span>+</span>
                </button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="字段模块" name="second">
              <el-row class="help-tips">
                勾选对应字段则视为该角色在此功能模块中有此字段的查看权限，否则该角色在页面中看不到此字段
              </el-row>
              <el-row v-for="(action, index) in actionAuthority">
                <el-row class="_title">
                  <span class="_tags"></span>
                  <span>{{action.authorityName}}</span>
                </el-row>
                <el-table :data="action.actionModuleList" border fit highlight-current-row style="width: 100%">
                  <el-table-column prop="moduleName" label="功能模块／受限字段"> </el-table-column>
                  <el-table-column :label="'字段'+ (index + 1)" v-for="(filed, index) in 4">
                    <template slot-scope="scope">
                      <el-row>
                        <el-checkbox v-if="scope.row.fieldOptions[index].name" v-model="scope.row.fieldOptions[index].checked">{{scope.row.fieldOptions[index].name}}</el-checkbox>
                        <el-row v-else>
                          --
                        </el-row>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="数据模块" name="third">
              <el-row class="help-tips">
                勾选对应权限则该角色在此功能模块中／应用app中按照此数据权限查看数据
              </el-row>
              <el-row v-for="(action, index) in actionAuthority">
                <el-row class="_title">
                  <span class="_tags"></span>
                  <span>{{action.authorityName}}</span>
                </el-row>
                <el-table :data="action.actionModuleList" border fit highlight-current-row style="width: 100%">
                  <el-table-column label="功能模块／数据权限">
                    <template slot-scope="scope">
                      {{scope.row.dataOptions[index].name}}
                    </template>
                  </el-table-column>
                  <el-table-column label="仅个人">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.dataOptions[index].filed1"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="本组织">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.dataOptions[index].filed2"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="本组织及以下">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.dataOptions[index].filed3"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="自定义">
                    <template slot-scope="scope">
                      <el-checkbox @change="definedData(scope.row.dataOptions[index].filed4)" v-model="scope.row.dataOptions[index].filed4"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="应用模块" name="fourth">
              <el-row class="help-tips">
                勾选对应权限则该角色可以登陆对应的应用，并且使用全部功能，如果需要限制查看数据请在数据权限中勾选对应的权限
              </el-row>
              <el-table :data="applyOptions" border fit highlight-current-row style="width: 100%">
                <el-table-column label="应用">
                  <template slot-scope="scope">
                    {{scope.row.name}}
                  </template>
                </el-table-column>
                <el-table-column label="权限">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.apply1"></el-checkbox>
                    使用
                    <span class="link-type" @click='dialogTipsVisible = true'>权限说明</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-main>
    </el-container>
    <el-dialog
      title="选择需要添加的集团后台功能权限"
      :visible.sync="addDialogVisible"
      width="30%"
      center>
      <el-form style="text-align: center;">
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="请选择需要查看哪些组织的数据" :visible.sync="dialogDdVisible">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDdVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirm2()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogTipsVisible">
      <el-row>勾选了应用的使用权限则后，即可以使用应用内的所有功能</el-row>
      <el-row>
        应用内的功能模块如下:<br/>
        1.xxx<br/>
        1.xxx<br/>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTipsVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  let roleTmpOptions = [
    { key: 'a', display_name: 'sup1' },
    { key: 'b', display_name: 'sup2' },
    { key: 'c', display_name: 'sup3' },
  ]
  let actionOptions = [
    {name:'查看', checked: true, disabled: true},
    {name:'新增', checked: false, disabled: false},
    {name:'删除', checked: false, disabled: false},
    {name:'编辑', checked: false, disabled: false}
  ]
  let actionAuthority = [
    {
      authorityName: '集团后台',
      actionModuleList: [
        {
          moduleName: '潜客管理',
          actionOptions: [
            { name:'查看', checked: true, disabled: true },
            { name:'新增', checked: false, disabled: false },
            { name:'删除', checked: false, disabled: false },
            { name:'编辑', checked: false, disabled: false }
          ],
          fieldOptions: [
            { name: '组织编号', checked: true },
            { name: '成员名称', checked: false },
            { name: '联系方式', checked: false },
            { name: '', checked: false},
          ],
          dataOptions: [
            { name: '报价管理2', filed1: false, filed2: true, filed3: false, filed4: false },
            { name: '客户管理3', filed1: false, filed2: false, filed3: false, filed4: false }
          ]
        },
        {
          moduleName: '客流管理',
          actionOptions: [
            { name:'查看', checked: true, disabled: true },
            { name:'新增', checked: false, disabled: false },
            { name:'删除', checked: false, disabled: false },
            { name:'编辑', checked: false, disabled: false }
          ],
          fieldOptions: [
            { name: '组织编号', checked: true },
            { name: '成员名称', checked: false },
            { name: '联系方式', checked: false },
            { name: '', checked: false},
          ],
          dataOptions: [
            { name: '报价管理', filed1: true, filed2: false, filed3: false, filed4: false },
            { name: '客户管理', filed1: false, filed2: false, filed3: false, filed4: false }
          ]
        }
      ]
    },
    {
      authorityName: '单店后台',
      actionModuleList: []
    }
  ]
  let options = [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '榴莲糕'
    }
  ]

  let applyOptions = [
    { name: '汽车销冠app（顾问端）', apply2: true },
    { name: '汽车销冠app（管理端）', apply2: false },
    { name: '云客服app（客服端）', apply2: false },
    { name: '云客服app（服务顾问端）', apply2: false},
  ]
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },


    data() {
      return {
        roleTmpOptions,
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 20, message: '最多20个字符', trigger: 'blur' }
          ],
          roleTmp: [{ required: true, message: '角色模板', trigger: 'change' }],
          roleTips: [
            { required: false, message: '请输入角色名称', trigger: 'blur' },
            { min: 0, max: 20, message: '最多20个字符', trigger: 'blur' }
          ],
        },
        form: {
          name: '',
          roleTmp: '',
          roleTips: ''
        },
        activeName: 'first',
        checked1: false,
        checked2: false,
        actionOptions,
        actionAuthority,
        options,
        value: '',
        selectIndex: -1,
        addDialogVisible: false,
        dialogDdVisible: false,
        dialogTipsVisible: false,
        applyOptions,
        treeData: [{
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
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
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      addModule(index) {
        console.log(index)
        this.addDialogVisible = true;
        this.selectIndex = index;
      },
      deleteModule(index, i) {
        this.actionAuthority[index].actionModuleList.splice(i, 1)
      },
      comfirm() {
        this.addDialogVisible = false;
        let name;
        this.options.forEach(item => {
          if(item.value == this.value){
            name = item.label
          }
        })
        this.actionAuthority[this.selectIndex].actionModuleList.push({
          moduleName: name,
          actionOptions: [
            {name:'查看', checked: true, disabled: true},
            {name:'新增', checked: false, disabled: false},
            {name:'删除', checked: false, disabled: false},
            {name:'编辑', checked: false, disabled: false}
          ]
        })
      },
      definedData(status) {
        console.log(status)
        this.dialogDdVisible = true;
      },
      comfirm2() {
        this.dialogDdVisible = false;
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
  .help-tips{
    color: #606266;
    font-size: 14px;
  }
  ._title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
    color: #303133;
  }
  ._tags{
    width: 3px;
    display: inline-block;
    height: 18px;
    background: #ccc;
    margin-right: 5px;
  }
  ._dropdown{
    margin-right: 16px;
  }
  .el-error__content{
    position: absolute;
    top: 2px;
    cursor: pointer;
    font-size: 14px;
    right: 14px;
    transform: translateY(-50%) translateX(100%);
  }
  ._add-button{
    width: 97px;
    height: 34px;
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

