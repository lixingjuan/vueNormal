<template>
  <div>
    你好，我是page2
    page1页面传递过来的参数是：{{this.page1User}}
    <div>{{count}}</div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      page1User: {}
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.page1User = to.params.user;
  //   });
  // },
  mounted() {
    /* 
     * 1. router+params传参获取参数
     */
    // this.page1User = this.$route.params;
    /* 
     * 2. localStorage方法获取参数
     */
    this.page1User = JSON.parse(localStorage.getItem("currentUser"))
    /* 
     * 3. store方法获取参数
     */
    // this.page1User = JSON.stringify(this.$route.params.user);
  },
  methods: {}
};
</script>

<style scoped>
</style>
