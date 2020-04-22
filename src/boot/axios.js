import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;
// ^ ^ ^ 这将允许你使用$.axios
//       所以你不需要在每个vue文件中导入axios
