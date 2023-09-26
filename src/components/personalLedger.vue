<template>
  <div class="container">
    <div class="top">
      <div
        style="margin-top: 20px;display: flex; justify-content: center; align-items: center;"
      >
        <el-button type="primary" style="font-size: 30px;">登录</el-button>
      </div>
    </div>
    <div class="mideele">
      <span style="color: #409EFF; font-size: 20px;">消费数据输入</span>
      <div style="display: flex; margin-top: 20px;">
        <el-input
          placeholder="公钥"
          v-model="consumData.publicKey"
          clearable
        ></el-input>
        <el-date-picker
          v-model="consumData.date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div style="display: flex; margin: 20px 0px">
        <el-input
          placeholder="金额"
          v-model="consumData.monkey"
          clearable
        ></el-input>
        <el-input
          placeholder="说明hash"
          v-model="consumData.hash"
          clearable
        ></el-input>
      </div>
      <div
        style="display: flex; justify-content: flex-end; padding-right: 20px;"
      >
        <el-button type="primary" @click="addConsumData">输入</el-button>
      </div>
    </div>
    <div class="bottom" style="margin-top: 20px;">
      <span style="color: #409EFF; font-size: 20px;">数据显示</span>
      <div style="display: flex; margin-top: 20px;">
        <el-date-picker
          v-model="queryDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" @click="filter(queryDate)">查询</el-button>
        <el-button type="primary" @click="sortByMonkey">按金额排序</el-button>
      </div>
      <div style="padding-top: 30px;">
        <ul>
          <li
            v-for="(data, index) in showDataList"
            :key="index"
            style="margin-top: 10px; margin-left: 10px;"
          >
            {{ data.publicKey }} &nbsp;&nbsp;&nbsp;
            {{ data.date }} &nbsp;&nbsp;&nbsp;
            {{ data.monkey }} &nbsp;&nbsp;&nbsp; {{ data.hash }}
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
      consumData: {
        publicKey: "",
        date: "",
        monkey: "",
        hash: ""
      },
      consumDataList: [],
      showDataList: [],
      queryDate: ""
    };
  },
  methods: {
    addConsumData() {
      this.$message({
        message: "输入成功",
        type: "success"
      });
      this.consumDataList.push({ ...this.consumData });
      localStorage.setItem("consumData", JSON.stringify(this.consumDataList));
    },
    filter(queryDate) {
      this.showDataList = [];
      const storedData = JSON.parse(localStorage.getItem("consumData"));
      if (storedData) {
        storedData.forEach(enrty => {
          if (enrty.date == queryDate) {
            this.showDataList.push(enrty);
          }
        });
      }
    },
    sortByMonkey() {
      this.showDataList = this.showDataList
        .slice()
        .sort((a, b) => b.monkey - a.monkey);
    }
  }
};
</script>

<style scoped>
.top {
  height: 100px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 20px;
}

.mideele {
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 20px;
}

.el-input {
  margin-right: 20px;
  width: 100%;
}

.bottom {
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  height: calc(100vh - 500px);
  padding: 20px 20px 0 20px;
}
</style>
