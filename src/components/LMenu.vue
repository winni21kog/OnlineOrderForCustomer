<template>
  <div>
    <q-card flat bordered>
      <q-card-section>
        <q-card-section class="col-12">
          <div class="text-h5 q-mt-sm q-mb-xs">{{category}}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <template v-for="(item,idx) in items">
            <div :key="idx">
              <q-btn
                flat
                class="full-width q-pa-xs"
                color="white"
                text-color="black"
                @click="order(item.id,item.name,item.price)"
              >
                <div align="left" class="col-8">{{item.name}}</div>
                <div align="right" class="col-4">{{item.price}}</div>
              </q-btn>
            </div>
          </template>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- 彈出式點單 -->
    <LOrder
      :name="oName"
      :id="oId"
      :price="oPrice"
      :orders="orders"
      :show="dialog"
      @dialogData="closeDialog"
    ></LOrder>
  </div>
</template>

<style scoped>
</style>

<script>
import LOrder from "./LOrder";
export default {
  components: {
    LOrder
  },
  props: {
    category: String,
    items: Array,
    orders: Array
  },
  data() {
    return {
      oId: 0,
      oName: "",
      oPrice: 0,
      dialog: false
    };
  },
  beforeUpdate: function() {},
  watch: {},
  methods: {
    order(id, name, price) {
      this.dialog = true;
      this.oId = id;
      this.oName = name;
      this.oPrice = price;
    },
    //子組件觸發父組件事件
    closeDialog(data) {
      this.dialog = data;
    }
  }
};
</script>