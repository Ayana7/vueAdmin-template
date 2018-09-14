<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="form" label-width="120px" class="_form" label-position="left">
      <div class="_row">
        <el-row>
          <el-form-item label="组织名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入组织名称"></el-input>
          </el-form-item>
          <el-form-item label="上级组织" prop="sup">
            <el-select v-model="form.sup" placeholder="请选择上级组织">
              <el-option v-for="(item, index) in supOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="组织属性" prop="resource">
              <!-- <el-radio-group v-model="form.resource">
                <el-radio label="4s店"></el-radio>
                <el-radio label="部门"></el-radio>
              </el-radio-group> -->
              <el-radio-group v-model="form.resource" size="medium" :disabled="isDisabled">
                <el-radio v-model="form.resource" label="1" border size="medium">4s店</el-radio>
                <el-radio v-model="form.resource" label="2" border size="medium">部门</el-radio>
              </el-radio-group>
            </el-form-item>
          <el-form-item label="所属品牌" prop="brands">
            <!-- <el-row style="margin-bottom: 10px;" v-for="(brandsOption, index) in form.brandsOptions">
              <el-select v-model="brandsOption.brands.value" placeholder="请选择品牌" >
                <el-option v-for="(brand, index) in brandsOption.brands" :label="brand.label" :value="brand.value"></el-option>
              </el-select>
              <i class="el-icon-error" @click.prevent="removeBrand(brandsOption)"></i>
            </el-row> -->
            <el-row style="margin-bottom: 10px;" v-for="(brandsOption, index) in brandsOptions">
              <el-select v-model="form.brands[index]" placeholder="请选择品牌" :disabled="!form.sup">
                <el-option v-for="(brand, index) in brandsOption.brands" :key="brand.key" :label="brand.display_name" :value="brand.key"></el-option>
              </el-select>
              <i class="el-icon-error" @click.prevent="removeBrand(brandsOption)"></i>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button  @click="addBrand" style="width: 200px;">+</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.checked" :disabled="!form.name || !form.sup || !form.resource || form.brands.length <= 0">业务委托设置</el-checkbox>
          </el-form-item>
        </el-row>
        <el-row style="padding-left: 30px;" v-if="form.checked">
          <el-row style="margin-bottom: 22px;">
            <el-col style="width: 120px; padding: 0px;font-weight: 700;" class="el-form-item__label">需要委托的职能
              <i class="el-icon-question" @click="open"></i>
            </el-col>
            <el-col class="el-form-item__content" style="width: 50%;text-align: right;font-weight: 700;color: #606266;">被委托组织</el-col>
          </el-row>
          <!-- <el-form-item label="需要委托的职能">
            <el-row>被委托组织</el-row>
          </el-form-item> -->
            <el-form-item :label="organizeOption.name" v-for="(organizeOption, index) in organizeOptions">
              <el-select v-model="form.organize[index]" placeholder="请选择组织">
                <el-option v-for="(item, index) in organizeOption.organize" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
              </el-select>
              <i class="el-icon-error" @click.prevent="removeOrganize(organizeOption)"></i>

            </el-form-item>
            <el-select v-if="show" @change="businessSelected" v-model="form.businessCatch" placeholder="请选择业务职能" style="width: 320px; margin-bottom: 22px;">
              <el-option v-for="(item, index) in businessOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
            </el-select>

          <el-row  v-if="!show">
            <el-button @click="addEntrust" style="width: 320px;">+添加委托</el-button>
          </el-row>
        </el-row>
      </div>

      <el-button @click="createData"  type="primary" style="width: 320px;">完成</el-button>
    </el-form>

  </div>
</template>

<script>
let supOptions = [
  { key: 'a', display_name: 'sup1' },
  { key: 'b', display_name: 'sup2' },
  { key: 'c', display_name: 'sup3' },

]
/* let brandsOptions = [
  {
    brands: [
      { key: 'a', display_name: 'brand1' },
      { key: 'b', display_name: 'brand2' },
      { key: 'c', display_name: 'brand3' },
      { key: 'd', display_name: 'brand4' }
    ]
  }
] */
let businessOptions = [  //业务职能
  { key: '0', display_name: '财务中心' },
  { key: '1', display_name: '整车库存' },
  { key: '2', display_name: '整车销售' },
  { key: '3', display_name: '售后维修' }
]
let organizeOptions = []
export default {
  data() {
    return {
      supOptions,
      brandsOptions: [
  {
    brands: [
      { key: 'a', display_name: 'brand1' },
      { key: 'b', display_name: 'brand2' },
      { key: 'c', display_name: 'brand3' },
      { key: 'd', display_name: 'brand4' }
    ]
  }
],
      businessOptions,
      organizeOptions,
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 1, max: 400, message: '最多20个字符', trigger: 'blur' }
        ],
        sup: [{ required: true, message: '请选择上级组织', trigger: 'change' }],
        resource: [{ required: true, message: '请选择组织属性', trigger: 'change' }],
        brands: [{ required: true, message: '请选择品牌', trigger: 'blur' }]
      },
      isDisabled: false,
      show: false,
      form: {
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
        organize: []
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
        organize:[
            { key: 'a', display_name: 'organize1' },
            { key: 'b', display_name: 'organize2' },
            { key: 'c', display_name: 'organize3' },
            { key: 'd', display_name: 'organize4' }
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



</style>

