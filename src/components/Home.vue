<template>
  <div class="main">
    <div class="aside">
      <!-- 导航菜单组件
      el-menu: 容器组件
      @open 监听下拉打开
      @close 监听下拉菜单打开
      default-active string 默认选中的菜单项的index的值
      text-color: 文本的颜色
      active-text-color: 菜单被选中时的文本颜色
      router: 是否使用vue-router的模式进行跳转，启用该模式激活导航时以Index作为
      参数进行路由跳转
      default-active 设置为当前路由的path
     -->
      <el-menu
        router
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#3d5f81"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <!-- 没有下级菜单的菜单项 -->
        <el-menu-item index="/stealthInquiry">
          <i class="el-icon-menu"></i>
          <span slot="title">匿踪查询并结算</span>
        </el-menu-item>
        <el-menu-item index="/personalLedger">
          <i class="el-icon-menu"></i>
          <span slot="title">个人账本</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      defaultActive: 'stealthInquiry' // 设置默认选中的菜单项的index
    };
  },
};
</script>

<style scoped>
.aside {
  background: #3d5f81;
  width: 200px;
}
.el-menu {
  border-right: none;
  height: 100vh;
}

.main {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}

.el-menu-item.is-active {
  color: #409EFF; /* 设置选中菜单项的字体颜色 */
}
</style>
