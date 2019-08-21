import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  mutations: {
    increment(state) {
      state.count++
    },
    subment(state) {
      state.count--
    },
    payloadment(state, payload) {
      // 对象方法提交commit是把整个对象作为payload传递过来的，这边打印结果是{type: "payloadment",age: "b",}
      window.console.log(payload)
      state.count = state.count + payload.age
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },

    /**
     * 可以使getter返回一个函数，从而可以给getter传递参数
     * 应用场景：数组实现不同条件的查询
     * 注意：getter作为方法返回时，每次都会去进行调用，不会缓存结果
     */
    doneTodosFun: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})