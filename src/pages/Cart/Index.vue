<template>
  <q-page>
    <div class="row section-card q-ma-sm">
      <h1 v-if="productList.length===0" class="mx-4 my-2" style="font-size: 2rem">購物車內無商品</h1>

      <div v-else class="q-pa-md col-12">
        <p class="q-ma-md" style="font-size: 20px">{{shopName}}</p>
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step :name="1" title="訂購明細" prefix="1" :done="step > 1">
            <div class="q-pa-md q-gutter-md">
              <q-list bordered class="rounded-borders">
                <div v-for="p in productList" :key="p.id + p.specString">
                  <q-item>
                    <q-item-section class="col-3">
                      <q-item-label>{{p.name}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <span v-text="p.specString + p.quantity + '份 / '+ p.subtotal + '元'"></span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                          size="12px"
                          color="purple"
                          label="編輯"
                          @click="editCart(p.product, p.specArray, p.quantity)"
                        />
                        <q-btn
                          size="12px"
                          color="red"
                          label="移除"
                          @click="deleteFromCart(p.product.id, p.specArray)"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </div>
                <q-item>
                  <q-item-section top>
                    <q-item-label></q-item-label>
                  </q-item-section>
                  <q-item-section top side>
                    <span class="text-left font-weight-black">應付金額：{{total}}元</span>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-step>

          <q-step :name="2" title="訂購資訊" prefix="2" :done="step > 2">
            <div class="q-pa-md">
              <div class="q-gutter-md">
                <q-input v-model="buyerInfo.name" label="訂購人" />
                <q-input v-model="buyerInfo.phone" label="電話" />
                <q-input v-model="buyerInfo.email" label="E-mail" />
                <q-input v-model="buyerInfo.note" label="備註" />
              </div>
            </div>
            <span class="q-pa-md text-left font-weight-black">應付金額：{{total}}元</span>
          </q-step>

          <q-step :name="3" title="訂購完成" prefix="3" :done="step > 3">
            <div class="q-pa-md q-gutter-md">
              <q-list bordered class="rounded-borders">
                <q-item class="bg-green-2">
                  <q-item-section>
                    <span class="q-pa-ms text-left">訂單狀態:{{orderStatus}}</span>
                  </q-item-section>
                </q-item>
                <!-- <q-separator spaced /> -->
                <div v-for="p in productList" :key="p.id + p.specString">
                  <q-item>
                    <q-item-section class="col-3">
                      <q-item-label>{{p.name}}</q-item-label>
                    </q-item-section>
                    <q-item-section class="text-right">
                      <q-item-label>
                        <span v-text="p.specString + p.quantity + '份 / '+ p.subtotal + '元'"></span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side></q-item-section>
                  </q-item>
                  <q-separator spaced />
                </div>
                <q-item class="bg-grey-4">
                  <q-item-section>
                    <q-item-label>應付金額：</q-item-label>
                  </q-item-section>
                  <q-item-section class="text-right">
                    <q-item-label>
                      <span>{{total}}元</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <div class="q-pa-md">
                <div class="q-gutter-md">
                  <p>
                    <span>訂購人：</span>
                    {{buyerInfo.name}}
                  </p>
                  <q-separator spaced />
                  <p>
                    <span>電話：</span>
                    {{buyerInfo.phone}}
                  </p>
                  <q-separator spaced />
                  <p>
                    <span>E-mail：</span>
                    {{buyerInfo.email}}
                  </p>
                  <q-separator spaced />
                  <p>
                    <span>備註：</span>
                    {{buyerInfo.note}}
                  </p>
                  <q-separator spaced />
                </div>
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step == 1" :to="menuPath" color="primary" label="繼續加點" class="q-ml-sm" />
              <q-btn
                v-if="step > 1 && step < 3"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="上一步"
                class="q-ml-sm"
              />
              <q-btn
                v-if="step < 2"
                @click="$refs.stepper.next()"
                color="primary"
                label="下一步"
                class="q-ml-sm"
              />
              <q-btn
                v-else-if="step == 2"
                @click="sendOrder()"
                color="primary"
                label="完成"
                class="q-ml-sm"
              />
              <q-btn
                v-if="step < 3"
                color="amber"
                label="取消點餐"
                class="q-ml-sm"
                @click="clearCart()"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>

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
                  {{ spec.name }}選擇
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
              <p class="q-my-xs">總金額:{{ subtotal }}元</p>
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
                label="更新購物車"
                color="primary"
                @click="updateCart()"
              />
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

// reCHAPTCA也可直接引入於目前頁面
// import Vue from "vue";
// import { VueReCaptcha } from "vue-recaptcha-v3";
// Vue.use(VueReCaptcha, { siteKey: "6Lf3NuUUAAAAAOVui79Y5a1nNSsjdrak18sQ4j07" });

export default {
  data() {
    return {
      step: 1,
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
      totalPrice: 0,
      // 訂購人資訊
      buyerInfo: {},
      orderStatus: "成立訂單"
    };
  },
  computed: {
    ...mapGetters({
      productList: "cartProducts"
    }),
    // 購物車的商品金額總計
    total() {
      return this.productList.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
    // 編輯視窗中的金額總計
    subtotal: function() {
      return this.selectedAmount * this.productDetail.price;
    },
    // 商店名稱
    shopName: function() {
      const shopInfo = this.$store.state.shop.shops.find(
        shop => shop.id == this.$store.state.shop.shopID
      );
      return shopInfo.name;
    },
    // 繼續加點：菜單路徑
    menuPath: function() {
      return "/Menu/" + this.$store.state.shop.shopID;
    }
  },
  created() {},
  // 點餐成功後，離開購物車頁面時，清空購物車
  beforeRouteLeave(to, form, next) {
    if (this.$store.state.shop.checkoutStatus == "successful") {
      this.$store.commit("clearCart");
    }
    next();
  },
  methods: {
    deleteFromCart: function(id, spec) {
      if (confirm("確定移除此商品?")) {
        this.$store.dispatch("deleteProductFromCart", { id, spec });
      }
    },
    editCart: function(product, specArray, quantity) {
      this.productDetail = product;
      this.selectedAmount = quantity;
      this.selectedSpecs = specArray;
      this.specOld = specArray;

      // 把規格顯示回按鈕上 ( 從 specArray 到 this.productDetail.specs[i].items)
      var specInfo = "";
      for (var i = 0; i < specArray.length; i++) {
        for (var j = 0; j < product.specs.length; j++) {
          specInfo = product.specs[j].items.find(
            specItem => specItem.id === specArray[i]
          );
          if (specInfo != undefined) {
            let spec = this.orders.find(x => x.specId == product.specs[j].id);
            if (spec == undefined) {
              // 空的新增
              this.orders.push(
                new this.CustomSpec(product.specs[j].id, [specArray[i]])
              );
            } else {
              spec.id.push(specArray[i]);
            }
          }
        }
      }
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
    updateCart: function() {
      if (this.checkRequired()) {
        this.firstDialog = false;
        this.Alert("成功更新購物車!");

        // 將 陣列[1,2,3...] 轉成 物件陣列 [{id:1},{id:2},{id:3}...] 以符合成立訂單API格式
        var self = this;
        var objArr = Object.keys(self.selectedSpecs).map(function(key) {
          return { id: self.selectedSpecs[key] };
        });

        this.$store.dispatch("updateProductToCart", {
          product: this.productDetail,
          quantity: this.selectedAmount,
          selectedSpecs: this.selectedSpecs,
          specObjArr: objArr,
          specOld: this.specOld
        });
      } else {
        this.Alert("請確認必填欄位!");
      }
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
      return isPass;
    },
    // 取消點餐
    clearCart: function() {
      if (confirm("確定取消點餐?")) {
        this.$store.commit("clearCart");
      }
    },
    // 完成訂單
    sendOrder: function() {
      // 結帳成功才能到下一頁
      this.checkout().then(r => {
        if (r) this.$refs.stepper.next();
      });
    },
    //取得 Google reCAPTCHA token
    async recaptcha() {
      return new Promise(resolve => {
        this.$recaptchaLoaded().then(() => {
          this.$recaptcha("checkout").then(token => {
            resolve(token);
          });
        });
      });
    },
    // 檢核訂單
    checkout: function() {
      return new Promise(resolve => {
        // 必填檢核
        if (
          this.buyerInfo.name == null ||
          this.buyerInfo.name == "" ||
          this.buyerInfo.phone == null ||
          this.buyerInfo.phone == "" ||
          this.buyerInfo.email == null ||
          this.buyerInfo.email == ""
        ) {
          this.Alert("請輸入訂購人、電話、Email!");

          resolve(false);
        } else {
          //取得 reCAPTCHA token
          this.$q.loading.show();

          this.recaptcha().then(t => {
            if (t != "" || t != undefined) {
              // token 有值
              this.$store
                .dispatch("checkOut", { buyerInfo: this.buyerInfo, token: t })
                .then(() => {
                  this.$q.loading.hide();
                  if (this.$store.state.shop.checkoutStatus == "failed") {
                    this.Alert("點餐失敗!");
                    resolve(false);
                  } else if (
                    this.$store.state.shop.checkoutStatus == "successful"
                  ) {
                    this.Alert("訂單已成立!");
                    resolve(true);
                  }
                });
            } else {
              this.$q.loading.hide();
              // token 沒有值
              this.Alert("點餐失敗!");
              resolve(false);
            }
          });
        }
      });
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