<template>
  <div>
    <div @click="toPage1">去navBar页面</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    toPage1(){
      this.$router.push({ name: 'page1' });
    }
  }
};
</script>

<style scoped>
</style>
