<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="form" label-width="120px" class="_form" label-position="left">
      <div class="_row">
        <el-row>
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="form.name" placeholder="请填写用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" placeholder="请填写手机号码"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="form.pwd" placeholder="默认手机号后6位"></el-input>
          </el-form-item>
            <el-form-item label="用户性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-progress="handleProgress">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="margin-top:0px;">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="review_img"><a href="javascript:void(0)" style="text-decoration:underline;">预览</a></div>
          </el-form-item>
          <el-form-item label="所属组织" prop="org">
            <el-select v-model="form.org" placeholder="请选择所属组织">
              <el-option v-for="(item, index) in orgOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色" prop="role">
            <el-select v-model="form.role" placeholder="请选择所属角色">
              <el-option v-for="(item, index) in roleOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-button @click="addJob" style="width: 320px;">添加兼职</el-button>
          </el-row>
        </el-row>
        <el-row style="padding-left: 30px;" >
          <el-row v-for="(list, index) in extraJobsOptions">
            <el-tag
              :key="index"
              closable
              :disable-transitions="false"
              @close="handleClose(index)">
              {{index}}
            </el-tag>
            <el-form-item label="兼职组织" prop="org">
              <el-select v-model="form.extraOrg[index]" placeholder="请选择兼职组织">
                <el-option v-for="(item, index) in list.extraOrgOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兼职角色" prop="role">
              <el-select v-model="form.extraRole[index]" placeholder="请选择兼职角色">
                <el-option v-for="(item, index) in list.extraRoleOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-row>

        </el-row>
      </div>

      <el-button @click="createData"  type="primary" style="width: 320px;">完成</el-button>
    </el-form>

  </div>
</template>

<script>
let orgOptions = [
  { key: 'a', display_name: 'org1' },
  { key: 'b', display_name: 'org2' },
  { key: 'c', display_name: 'org3' }
]
let roleOptions = [
  { key: 'a', display_name: 'role1' },
  { key: 'b', display_name: 'role2' },
  { key: 'c', display_name: 'role3' }
]
let extraOptions = [
  { key: 'a', display_name: 'role1' },
  { key: 'b', display_name: 'role2' },
  { key: 'c', display_name: 'role3' }
]
let extraOrgOptions = [
  { key: 'a', display_name: 'org1' },
  { key: 'b', display_name: 'org2' },
  { key: 'c', display_name: 'org3' }
]
let extraRoleOptions = [
  { key: 'a', display_name: 'role1' },
  { key: 'b', display_name: 'role2' },
  { key: 'c', display_name: 'role3' }
]
let brandsOptions = [
  {
    brands: [
      { key: 'a', display_name: 'brand1' },
      { key: 'b', display_name: 'brand2' },
      { key: 'c', display_name: 'brand3' },
      { key: 'd', display_name: 'brand4' }
    ]
  }
]
let businessOptions = [  //业务职能
  { key: '0', display_name: '财务中心' },
  { key: '1', display_name: '整车库存' },
  { key: '2', display_name: '整车销售' },
  { key: '3', display_name: '售后维修' }
]
let organizeOptions = []
let extraJobsOptions = []
export default {
  data() {
    return {
      brandsOptions,
      businessOptions,
      organizeOptions,
      extraJobsOptions,
      orgOptions,
      roleOptions,
      rules: {
        name: [
          { required: true, message: '请填写用户姓名', trigger: 'blur' },
          { min: 1, max: 18, message: '最多18个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { min: 1, max: 11, message: '数字，11个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 5, message: '必须大于5位', trigger: 'blur' }
        ],
        org: [{ required: true, message: '请选择上级组织', trigger: 'change' }],
        role: [{ required: true, message: '请选择上级组织', trigger: 'change' }]
      },
      isDisabled: false,
      show: false,
      form: {
        tag: '王胖子的兼职',
        name: '',     // 组织名称
        sup: '',      // 上级组织
        resource: '1',     // 组织属性
        checked: false,
        brandsOptions: [    //选择品牌
          {
            brands: [
              { 'value':'brand1', 'lable':'brand1' },
              { 'value':'brand2', 'lable':'brand2' }
            ]
          },
          {
            brands: [
              { 'value':'brand1', 'lable':'brand1' },
              { 'value':'brand2', 'lable':'brand2' }
            ]
          }
        ],
        businessOptions: [  //业务职能
          { 'value':'财务中心', 'lable':'0' },
          { 'value':'整车库存', 'lable':'1' },
          { 'value':'整车销售', 'lable':'3' },
          { 'value':'售后维修', 'lable':'4' },
        ],
        brands: [],
        businessCatch: [],
        business: [],
        organize: [],
        extraJobs: [],
        extraOrg: [],
        extraRole: []
      }
    }
  },
  mounted(){
    console.log(1)
  },
  created(){
    console.log(2)
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleProgress(event, file, fileList) {
      console.log(event, file, fileList)
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    removeBrand(item) {
      var index = this.brandsOptions.indexOf(item)
      if (index !== -1) {
        this.brandsOptions.splice(index, 1)
        this.form.brands.splice(index, 1)
      }
    },
    addBrand() {
      this.brandsOptions.push({
        brands:[
            { key: 'a', display_name: 'brand1' },
            { key: 'b', display_name: 'brand2' },
            { key: 'c', display_name: 'brand3' },
            { key: 'd', display_name: 'brand4' }
        ]
      });
    },
    addAgent() {
      this.form.brandsOptions.push({
        brands:[
          {
            value: 'brand2',
            lable: 'brand2',
            key: Date.now()
          }
        ]
      });
    },
    open() {
      this.$alert('业务委托指的是本组织是否要将此项业务委托他人完成，如果勾选此项，则被委托的组织可以查看本组织产生的这项业务的数据', {
        confirmButtonText: '知道了',
        callback: action => {

        }
      });
    },
    addEntrust() {
      this.show = true;
      this.form.businessCatch = [];
    },
    businessSelected(item) {
      let name;
      this.businessOptions.forEach(element => {
        if(element['key'] == item){
          name = element.display_name
        }
      });
      this.show = false;
      console.log(this.form.business)
      this.form.business.push(item)
      this.organizeOptions.push({
        name: name,
        extraOrgOptions: [
          { key: 'a', display_name: 'org1' },
          { key: 'b', display_name: 'org2' },
          { key: 'c', display_name: 'org3' }
        ],
        extraORoleOptions: [
          { key: 'a', display_name: 'role1' },
          { key: 'b', display_name: 'role2' },
          { key: 'c', display_name: 'role3' }
        ]
      });
    },
    addJob() {
      this.extraJobsOptions.push({
        // name: name,
        extraOrgOptions: [
          { key: 'a', display_name: 'org1' },
          { key: 'b', display_name: 'org2' },
          { key: 'c', display_name: 'org3' }
        ],
        extraRoleOptions: [
          { key: 'a', display_name: 'role1' },
          { key: 'b', display_name: 'role2' },
          { key: 'c', display_name: 'role3' }
        ]
      });
    },
    removeOrganize(item) {
      var index = this.organizeOptions.indexOf(item)
      if (index !== -1) {
        this.organizeOptions.splice(index, 1)
        this.form.organize.splice(index, 1)
        this.form.business.splice(index, 1)
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.form);

          /* createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }) */
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ._form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 700px;
  }
  ._form ._row{
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    ._el-form-item .el-form-item__content {
      margin-right: 10px !important;
    }
  }
  .review_img{
    position: absolute;
    top: 0;
    left: 100px;
    color: #606266;
  }
  .el-tag{
    width: 100%;
    height: 40px;
    margin-bottom: 22px;
    line-height: 40px;
  }



</style>

