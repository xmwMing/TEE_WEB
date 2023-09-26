<template>
  <div class="main" style="display: flex;">
    <div class="leftContent" style="height: 100%; flex: 1; margin-right: 10px;">
      <div class="lefTop">
        <span style="color: #409EFF; font-size: 20px;">数据导入</span>
        <div style="display: flex; margin-top: 20px;">
          <el-input placeholder="姓名" v-model="newEntry.name" clearable>
          </el-input>
          <el-input
            placeholder="电话号码"
            v-model="newEntry.phoneNumber"
            clearable
          >
          </el-input>
          <el-button type="primary" @click="addEntry">输入</el-button>
        </div>
      </div>
      <div class="leftBottom">
        <span style="color: #409EFF; font-size: 20px;">脱密显示</span>
        <ul style="padding-top: 15px;">
          <li
            v-for="(entry, index) in showBook"
            :key="index"
            style="margin-top: 10px; margin-left: 10px;"
          >
            {{ entry.showName }} &nbsp;&nbsp;&nbsp; {{ entry.showNumber }}
          </li>
        </ul>
      </div>
    </div>
    <div class="right" style="margin-left: 10px;">
      <span style="color: #409EFF; font-size: 20px;">匿踪查询</span>
      <div style="display: flex; margin-top: 20px;">
        <el-input placeholder="电话号码" v-model="queryNmuber" clearable>
        </el-input>
        <el-button type="primary" @click="query(queryNmuber)">查询</el-button>
      </div>
      <div style="padding-top: 40px;">
        <span style="color: #409EFF; font-size: 20px; ">数据显示</span>
        <ul style="padding-top: 15px;" v-if="showData">
          <li style="margin-top: 10px; margin-left: 10px;">
            {{ queryName }} &nbsp;&nbsp;&nbsp; {{ queryNmuber }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stealthInquiry",
  data() {
    return {
      //返回v-model中绑定的值！
      newEntry: {
        name: "",
        phoneNumber: ""
      },
      showEntry: {
        showName: "",
        showNumber: ""
      },
      phoneBook: [],
      showBook: [],
      queryNmuber: "",
      queryName: "",
      showData: false
    };
  },
  methods: {
    addEntry() {
      this.$message({
        message: "输入成功。",
        type: "success"
      }); 
      // 将新数据添加到phoneBook数组中
      this.phoneBook.push({ ...this.newEntry });
      this.showEntry.showName = this.maskName(this.newEntry.name);
      this.showEntry.showNumber = this.maskPhoneNumber(
        this.newEntry.phoneNumber
      );
      this.showBook.push({ ...this.showEntry });
      // 清空输入框
      this.newEntry.name = "";
      this.newEntry.phoneNumber = "";

      // 将数据保存到localStorage中
      localStorage.setItem("phoneBook", JSON.stringify(this.phoneBook));
      localStorage.setItem("showBook", JSON.stringify(this.showBook));
    },
    maskPhoneNumber(phoneNumber) {
      // 将电话号码的后四位用X代替
      return phoneNumber.replace(phoneNumber.substring(3, 7), "****");
    },
    maskName(realName) {
      // 将姓名显示为*
      return realName.replace(/./g, "*");
    },
    query(queryNmuber) {
      this.showData = true;
      const storedData = JSON.parse(localStorage.getItem("phoneBook"));
      if (storedData) {
        storedData.forEach(enrty => {
          if (enrty.phoneNumber == queryNmuber) {
            this.queryName = enrty.name;
          }
        });
      }
    }
  },
  created() {
    // 从localStorage中获取之前保存的数据（如果有的话）
    const storedData = localStorage.getItem("showBook");
    if (storedData) {
      this.showBook = JSON.parse(storedData);
    }
  }
};
</script>

<style scoped>
.lefTop {
  height: 100px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 20px;
}

.leftBottom {
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 20px;
  height: calc(100vh - 240px);
}

.el-input {
  margin-right: 20px;
  width: 100%;
}

.right {
  height: calc(100vh - 80px);
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
}
</style>
