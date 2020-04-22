<template>
  <q-page>
    <div class="row section-card q-ma-sm">
      <div class="col-12 q-pa-sm">
        <b class="title">{{ shopName }}</b>
      </div>
      <!-- 店家商品 -->
      <template v-for="(category, idx) in categorys">
        <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-sm" :key="idx">
          <q-card flat bordered>
            <q-card-section>
              <q-card-section class="col-12">
                <div class="text-h5 q-mt-sm q-mb-xs">{{ category.name }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <template v-for="(product, idx) in category.products">
                  <div :key="idx">
                    <q-btn
                      flat
                      class="full-width q-pa-xs"
                      color="white"
                      text-color="black"
                      @click="productClick(product)"
                    >
                      <div align="left" class="col-8">{{ product.name }}</div>
                      <div align="right" class="col-4">{{ product.price }}</div>
                    </q-btn>
                  </div>
                </template>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <!-- 彈出式點單 -->
      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="firstDialog" @hide="closeDialog">
          <q-card style="width:500px;" class="q-pa-sm">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ productDetail.name }}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <!-- 商品圖片 -->
            <q-card-section>
              <div class="q-px-xs">
                <q-carousel
                  animated
                  v-model="slide"
                  navigation
                  infinite
                  autoplay
                  arrows
                  contain
                  height="200px"
                >
                  <template v-for="(image,idx) in productDetail.images">
                    <q-carousel-slide :key="idx" :name="idx">
                      <q-img contain height="180px" :src="image.url"></q-img>
                    </q-carousel-slide>
                  </template>
                </q-carousel>
              </div>
            </q-card-section>

            <!-- 商品規格 -->
            <q-card-section style="max-height: 500px" class="col-xs-12 scroll">
              <template v-for="spec in productDetail.specs">
                <!-- 單選 -->
                <div v-if="spec.is_multiple==0" class="q-my-xs" :key="spec.id">
                  <p class="q-my-xs">
                    <span v-if="spec.is_required==1" style="color:red">*</span>
                    {{ spec.name }}選擇
                  </p>
                  <div class="q-gutter-sm">
                    <template v-for="item in spec.items">
                      <q-btn
                        class="btn-width"
                        :outline="ClickBtn(spec.id, item.id, spec.is_multiple)"
                        color="primary"
                        :key="item.id"
                        @click="Single(spec.id, item.id)"
                      >
                        <div>{{ item.name }}</div>
                      </q-btn>
                    </template>
                  </div>
                </div>
                <!-- 複選 -->
                <div v-else class="q-my-xs" :key="spec.id">
                  <p class="q-my-xs">
                    <span v-if="spec.is_required==1" style="color:red">*</span>
                    {{ spec.name }}選擇(可複選)
                  </p>
                  <div class="q-gutter-sm">
                    <template v-for="item in spec.items">
                      <q-btn
                        class="btn-width"
                        :outline="ClickBtn(spec.id, item.id, spec.is_multiple)"
                        color="primary"
                        :key="item.id"
                        @click="Multiple(spec.id, item.id)"
                      >
                        <div class="col-12">{{ item.name }}</div>
                      </q-btn>
                    </template>
                  </div>
                </div>
              </template>
            </q-card-section>
            <q-separator />
            <!-- 商品金額與購物車按鈕 -->
            <q-card-actions align="right" class="q-pa-md">
              <div class="col-6">
                <p class="q-my-xs">總金額:{{ totalPrice }}元</p>
                <div class="row no-wrap">
                  <q-btn outline square color="grey" @click="decl()">-</q-btn>
                  <q-input
                    type="number"
                    input-class="text-center"
                    outlined
                    square
                    :dense="true"
                    v-model="selectedAmount"
                    @change="checkAmount(Number(selectedAmount))"
                    :min="amountMin"
                    :max="amountMax"
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
                  @click="addToCart()"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>
<style scoped>
.section-card {
  margin-right: 5%;
  margin-left: 5%;
}
.title {
  font-size: 24px;
}
.btn-width {
  width: 100px;
}
</style>
<script>
export default {
  data() {
    return {
      // 商品詳細資料 from API3
      productDetail: {},
      // 最小數量
      amountMin: 1,
      //最大數量
      amountMax: 50,
      // 點擊的商品數量
      selectedAmount: 0,
      // 圖片順序
      slide: 0,
      // 商品彈出視窗model
      firstDialog: false,
      // 規格結構
      orders: [],
      // 選擇的規格Id
      selectedSpecs: [],
      // 商品總金額
      totalPrice: 0
    };
  },
  computed: {
    categorys() {
      return this.$store.state.shop.categorys;
    },
    products() {
      return this.$store.state.shop.products;
    },
    id() {
      return this.$route.params.id;
    },
    shopName() {
      return this.$store.state.shop.shops.find(x => x.id == this.id).name;
    }
  },
  beforeUpdate: function() {
    this.totalPrice = this.productDetail.price * this.selectedAmount;
  },
  created() {
    this.$store.dispatch("GetCategory", this.id);
  },
  methods: {
    // 點擊商品
    productClick(product) {
      // 詳細資料
      this.productDetail = this.products.find(x => x.id == product.id);
      // 商品名稱
      this.productDetail.name = product.name;
      // 商品價格
      this.productDetail.price = product.price;
      // 數量
      this.selectedAmount = 1;
      // 開啟Dialog
      this.firstDialog = true;
    },
    //關閉點餐彈出視窗
    closeDialog() {
      //點餐清空
      this.orders.length = 0;
    },
    //new 規格物件
    CustomSpec(specId, id) {
      this.specId = specId;
      this.id = id;
    },
    //紀錄單選項目
    Single(sId, iId) {
      var orders = this.orders;
      if (orders.length == 0) {
        // 如果空集合即新增 建立物件並加入
        orders.push(new this.CustomSpec(sId, [iId]));
      } else {
        // 非空集合 判斷array中是否有相同的規格id
        const order = orders.find(x => x.specId == sId);
        if (order == undefined) {
          // 無相同specId 建立物件並加入
          orders.push(new this.CustomSpec(sId, [iId]));
        } else if (order.specId == sId) {
          // 有相同specId 更新規格
          order.id.length = 0;
          order.id.push(iId);
        }
      }
      console.log(orders);
      // 加入orders的所有 id 至 selectedSpecs 中
      this.selectedSpecs = [];
      for (let i = 0; i < this.orders.length; i++) {
        this.selectedSpecs.push(this.orders[i].id[0]);
      }
      console.log(this.selectedSpecs);
    },
    // 紀錄多選項目
    Multiple(sId, iId) {
      var orders = this.orders;
      if (orders.length == 0) {
        // 如果空集合即新增 建立物件並加入
        orders.push(new this.CustomSpec(sId, [iId]));
      } else {
        // 非空集合 判斷array中是否有相同的規格specId
        const order = orders.find(x => x.specId == sId);
        if (order == undefined) {
          // 無相同specId 建立物件並加入
          orders.push(new this.CustomSpec(sId, [iId]));
        } else if (order.specId == sId) {
          // 有相同specId 更新規格
          let id = order.id.find(o => o === iId);
          if (id == undefined) {
            //沒有相同id則加入
            order.id.push(iId);
          } else {
            //如有相同id則刪除
            //console.log(`iId:${iId} index:${index}`);
            order.id.splice(order.id.indexOf(iId), 1);
            if (order.id.length == 0) {
              //刪除無id的物件
              //console.log(`sId:${sId} orderIndex:${orderIndex}`);
              orders.splice(orders.indexOf(order), 1);
            }
          }
        }
      }
      console.log(orders);
      // 加入orders的所有 id 至 selectedSpecs 中
      this.selectedSpecs = [];
      for (let i = 0; i < this.orders.length; i++) {
        for (let j = 0; j < this.orders[i].id.length; j++) {
          this.selectedSpecs.push(this.orders[i].id[j]);
        }
      }
      console.log(this.selectedSpecs);
    },
    // 按鈕顏色變化
    ClickBtn(sId, iId, multiple) {
      var orders = this.orders;
      for (let i = 0; i < orders.length; i++) {
        const spec = orders[i];
        //規格類別
        if (spec.specId == sId) {
          //規格細項
          const id = spec.id.find(i => i == iId);
          if (id == iId) {
            return false;
          } else if (id != iId && multiple == 1) {
            return true;
          }
        }
      }
      return true;
    },
    // 確保數量不會超出 最小數量 ~ 最大數量
    checkAmount: function(newAmount) {
      if (newAmount > this.amountMax) this.selectedAmount = this.amountMax;
      else if (newAmount < 1) this.selectedAmount = this.amountMin;
      else this.selectedAmount = newAmount;
    },
    // 計算總金額
    calculate() {
      this.totalPrice = this.productDetail.price * this.selectedAmount;
    },
    // 商品+1
    plus() {
      this.selectedAmount++;
      this.checkAmount(this.selectedAmount);
      this.calculate();
    },
    // 商品-1
    decl() {
      this.selectedAmount--;
      this.checkAmount(this.selectedAmount);
      this.calculate();
    },
    // 檢查必填
    checkRequired: function() {
      var isPass = true;
      // 必填檢核
      for (var i = 0; i < this.productDetail.specs.length; i++) {
        if (this.productDetail.specs[i].is_required == 1) {
          if (
            this.orders.find(x => x.specId == this.productDetail.specs[i].id) ==
            undefined
          ) {
            isPass = false;
          }
        }
      }
      if (!isPass) {
        this.Alert("請確認必填欄位!");
      }
      return isPass;
    },
    // 檢查店家ID是否重複
    checkShopID: function() {
      var isPass = false;
      let shopId = this.$store.state.shop.shopID;
      if (shopId == null) {
        // 購物車沒有商品
        isPass = true;
      } else {
        // 購物車已有商品
        // 比對目前店家與購物車店家是否相同
        if (shopId == this.$route.params.id) {
          isPass = true;
        } else {
          var result = confirm("購物車已有其他店家的商品, 是否清空購物車?");
          if (result) {
            this.$store.commit("clearCart");
            isPass = true;
          }
        }
      }
      return isPass;
    },
    // 加入購物車
    addToCart() {
      // 檢核必填項目及商店代號
      if (this.checkRequired() && this.checkShopID()) {
        this.firstDialog = false;
        this.Alert("成功加入購物車!");

        // 加入商品名及價格

        // 將 陣列[1,2,3...] 轉成 物件陣列 [{id:1},{id:2},{id:3}...] 以符合成立訂單API格式
        var self = this;
        var objArr = Object.keys(self.selectedSpecs).map(function(key) {
          return { id: self.selectedSpecs[key] };
        });

        this.$store.dispatch("addProductToCart", {
          product: this.productDetail,
          quantity: this.selectedAmount,
          selectedSpecs: this.selectedSpecs,
          specObjArr: objArr,
          shopID: this.$route.params.id
        });
      }
    },
    // 彈出訊息
    Alert(message) {
      const dialog = this.$q
        .dialog({
          //title: title,
          message: message,
          //ok: false,
          style: "border: 2px solid black",
          persistent: true
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
          //clearTimeout(timer);
        });
      // 延遲關閉
      // const timer = setTimeout(() => {
      //   dialog.hide();
      // }, 2000);
    }
  }
};
</script>
