<template>
  <div>
    <h1>你好，我是page1</h1>
    <div class="btn" @click="toPage2">我要去 page1/page2</div>

    <div>
      <!-- 使用getter从store获取处理后的数据,Getter 会暴露为 store.getters 对象 -->
      <!-- 因为store是注册在根组件的，所以要使用this.$store.getters访问对应的值 -->
      <p>
        <b>1.使用getter从store获取处理后的数据示例：查找id为2的todo</b>
      </p>
      <p>{{this.$store.getters.doneTodos}}</p>
    </div>
    <div>
      <p>
        <b>2. getter返回方法示例：查找id为2的todo</b>
      </p>
      <p>{{this.$store.getters.doneTodosFun(2)}}</p>
      <p>{{doneTodosFun(2)}}</p>
    </div>
    <div>
      <p>
        <b>3. mutation</b>
      </p>
      <input type="button" value="点我+1" @click="testIncrement" />
      <input type="button" value="点我-1" @click="testSubment" />
      <input
        type="button"
        value="点我传递了payload"
        @click="testPayload({age:'a'})"
        title="向mutation传递payload"
      />
      <p>{{count}}</p>
      <p>{{countAlias}}</p>
      <p>{{countPlusLocalState}}</p>
    </div>
    <div>
      <p>4. 给store添加新属性</p>
      <input type="button" value="给store添加新属性" @click="vueSet" />
      <p>新属性user.height:{{user.height}}</p>
      <p>新属性值user.age：{{user.age}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "",
  data() {
    return {
      user: {
        name: "李大锤",
        age: "78"
      }
    };
  },
  computed: {
    /*
     * mapState返回的是一个对象
     * 使用对象展开运算符使之可以与其他局部计算属性一起使用
     */
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
      // doneTodos: this.$store.getters.doneTodos,
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: "count",

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.count + this.localCount;
      }
    }),
    /*
     * mapGetters返回的是一个对象
     * 使用对象展开运算符使之可以与其他局部计算属性一起使用
     */
    ...mapGetters([
      // 把所有的getters们都放在mapGetters中
      "doneTodosFun",
      "anotherGetter"
      // ...
    ])
  },
  methods: {
    toPage2() {
      /*
       * 向page2携带参数跳转的三种方式
       */
      // 方法一
      /*
       * 路由跳转 + params
       * 缺点：在page2刷新后参数丢失
       * 解决方法：使用query或者将路由改为动态路由
       * 缺点：数据暴漏在url上了
       * 动态路由：{ path: '/page1/page2/:age/:name', name: 'page2', component: Page2 }
       */
      this.$router.push({ name: "page2", params: this.user });

      // 方法二:我感觉是最好的方法
      /*
       * 路由跳转 + 参数写入localStorage
       * 缺点：感觉没啥缺点
       * 注意：localStorage只能存储字符串，要先使用JSON.stringify转为字符串，接收时使用JSON.parse转回对象
       */
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      this.$router.push({ name: "page2" });

      // 方法三
      /*
       * 路由跳转 + store
       * 缺点：在page2刷新后参数丢失
       * 解决方法：还没明白
       * 接收参数：在page2页面使用  this.$store.state.count 接收
       */
    },
    testIncrement() {
      // 将store注册在根组件了，通过this.$store.commit提交mutation
      this.$store.commit("increment");
      // 通过this.$store.state来获取状态
      window.console.log(this.$store.state.count);
    },
    testSubment() {
      // 将store注册在根组件了，通过this.$store.commit提交mutation
      this.$store.commit("subment");
      // 通过this.$store.state来获取状态
      window.console.log(this.$store.state.count);
    },
    testPayload(payload) {
      // 提交mutation方法一
      // this.$store.commit("payloadment",payload);
      // 提交mutation方法二 => 对象法 => 整个对象都作为payload传给 mutation 函数,因此handler不变
      this.$store.commit({
        type: "payloadment",
        age: "b"
      });
    },
    vueSet() {
      Vue.set(this.user, "height", "189cm");
      Vue.set(this.age, "age", "98");
    }
  }
};
</script>

<style scoped lang="scss">
.btn {
  color: $red;
}
</style>
