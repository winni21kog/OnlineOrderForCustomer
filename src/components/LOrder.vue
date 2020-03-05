<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="firstDialog" @hide="closeDialog">
      <q-card style="width:500px;" class="q-pa-sm">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{name}}{{id}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <LCarousel></LCarousel>
        </q-card-section>

        <q-card-section style="max-height: 500px" class="col-xs-12 scroll">
          <template v-for="choose in orders">
            <!-- 單選 -->
            <div v-if="!choose.multiple" class="q-my-xs" :key="choose.chooseId">
              <p class="q-my-xs">
                <span style="color:red">*</span>
                {{choose.name}}選擇
              </p>
              <div class="q-gutter-sm">
                <template v-for="item in choose.order">
                  <q-btn
                    class="btn-width"
                    :outline="ClickBtn(choose.chooseId,item.id,choose.Multiple)"
                    color="primary"
                    :key="item.id"
                    @click="Single(choose.chooseId,item.id)"
                  >
                    <div>{{item.name}}</div>
                  </q-btn>
                </template>
              </div>
            </div>
            <!-- 複選 -->
            <div v-else class="q-my-xs" :key="choose.chooseId">
              <p class="q-my-xs" @click="extra()">
                {{choose.name}}選擇(可複選，最多3項)
                <q-icon name="arrow_drop_down" size="30px" />
              </p>
              <div class="q-gutter-sm" :hidden="hidden">
                <template v-for="item in choose.order">
                  <q-btn
                    class="btn-width"
                    :outline="ClickBtn(choose.chooseId,item.id,choose.Multiple)"
                    color="primary"
                    :key="item.id"
                    @click="Multiple(choose.chooseId,item.id)"
                  >
                    <div class="col-12">{{item.name}}</div>
                    <div>+{{item.price}}元</div>
                  </q-btn>
                </template>
              </div>
            </div>
          </template>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="q-pa-md">
          <div class="col-6">
            <p class="q-my-xs">總金額:{{tPrice}}元</p>
            <div class="row no-wrap">
              <q-btn outline square color="grey" @click="decl()">-</q-btn>
              <q-input
                type="number"
                input-class="text-center"
                outlined
                square
                :dense="true"
                v-model="count"
              />
              <q-btn outline square color="grey" @click="plus()">+</q-btn>
            </div>
          </div>
          <div class="col-6 text-right">
            <q-btn
              size="22px"
              class="q-px-lg q-py-xs"
              label="加入購物車"
              color="primary"
              @click="secondDialog=true"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 加入購物車 -->
    <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>購物車加入成功</q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.btn-width {
  width: 100px;
}
</style>

<script>
import LCarousel from "./LCarousel";
export default {
  components: {
    LCarousel
  },
  props: {
    name: String,
    id: Number,
    price: Number,
    orders: Array,
    show: Boolean
  },
  data() {
    return {
      //紀錄父組件傳進的參數
      firstDialog: this.show,
      secondDialog: false,
      hidden: true,
      customOrder: [
        { categoryId: 1, id: [] },
        { categoryId: 2, id: [] },
        { categoryId: 3, id: [] }
      ],
      count: 1,
      tPrice: 0
    };
  },
  beforeUpdate: function() {
    this.tPrice = this.price * this.count;
  },
  computed: {},
  watch: {
    //監聽父組件對props屬性show的修改，並同步到組件內的firstDialog
    show(val) {
      this.firstDialog = val;
    },
    count: function(value) {
      if (value == 0) {
        this.count = 1;
      } else {
        this.calculate();
      }
    }
  },
  methods: {
    //隱藏時觸發:向父組件發送事件('event',value)
    closeDialog() {
      this.count = 1;
      this.$emit("dialogData", false);
    },
    //紀錄單選項目
    Single(chooseId, orderId) {
      var orders = this.customOrder;
      for (var i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (order.categoryId == chooseId) {
          order.id.length = 0;
          order.id.push(orderId);
        }
      }
      console.log(orders);
    },
    //紀錄多選項目
    Multiple(chooseId, orderId) {
      var orders = this.customOrder;
      for (var i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (order.categoryId == chooseId) {
          var id = order.id.find(o => o === orderId);
          if (id != orderId) {
            //沒有相同id則加入
            order.id.push(orderId);
          } else {
            //如有相同id則刪除
            var index = order.id.indexOf(orderId);
            order.id.splice(index, 1);
          }
        }
      }
      console.log(orders);
    },
    //按鈕變化
    ClickBtn(chooseId, orderId, multiple) {
      var orders = this.customOrder;
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        //大類選擇
        if (order.categoryId == chooseId) {
          //小類選擇
          const id = order.id.find(o => o === orderId);
          if (id == orderId) {
            return false;
          } else if (id != orderId && multiple == true) {
            return true;
          }
        }
      }
      return true;
    },
    calculate() {
      this.tPrice = this.price * this.count;
    },
    extra() {
      this.hidden = !this.hidden;
    },
    plus() {
      this.count++;
      this.calculate();
    },
    decl() {
      this.count--;
      this.calculate();
    }
  }
};
</script>