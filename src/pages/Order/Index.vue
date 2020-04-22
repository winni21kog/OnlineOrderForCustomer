<template>
  <h1 v-if="detailsDisplay.length===0" class="mx-4 my-2" style="font-size: 2rem">查無訂單資訊 :'(</h1>
  <div v-else class="q-pa-md q-gutter-md">
    <p class="q-ma-md" style="font-size: 20px">{{shopName}}</p>
    <q-list bordered class="rounded-borders">
      <q-item :class="statusColor">
        <q-item-section>
          <span class="q-pa-ms text-left">訂單狀態:{{status}}</span>
        </q-item-section>
      </q-item>

      <div v-for="(d,i) in detailsDisplay" :key="i">
        <q-item>
          <q-item-section class="col-3">
            <q-item-label>{{d.name}}</q-item-label>
          </q-item-section>
          <q-item-section class="text-right">
            <q-item-label>
              <span v-text="d.specString + d.quantity + '份 / '+ d.subtotal + '元'"></span>
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
        <p v-if="buyerInfo.note.length > 0">
          <span>備註：</span>
          {{buyerInfo.note}}
        </p>
        <q-separator spaced />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      shopName: "",
      statusCode: "",
      total: 0,
      buyerInfo: {
        name: "",
        phone: "",
        email: "",
        note: ""
      },
      details: []
    };
  },
  computed: {
    // 處理訂單狀態
    status() {
      if (this.statusCode == 1) return "成立訂單";
      else if (this.statusCode == 2) return "處理中";
      else if (this.statusCode == 3) return "完成訂單";
      else if (this.statusCode == 4) return "取消訂單";
      else return "";
    },
    statusColor() {
      if (this.statusCode == 1) return "bg-green-2";
      else if (this.statusCode == 2) return "bg-info";
      else if (this.statusCode == 3) return "bg-primary";
      else if (this.statusCode == 4) return "bg-red";
      else return "";
    },
    // 處理規格字串及金額小計
    detailsDisplay() {
      return this.details.map(({ items, name, price, quantity }) => {
        // 將 items 轉成 specString 供畫面顯示
        var specs = "";
        for (var i = 0; i < items.length; i++) {
          specs = specs + items[i].name + " /";
        }

        return {
          name,
          price,
          quantity,
          specString: specs,
          subtotal: price * quantity
        };
      });
    }
  },
  mounted() {
    console.log("mounted");
    // 不顯示 qheader
    this.$store.commit("setqheaderShow", false);

    // 畫面 loading 效果
    this.$q.loading.show();

    // API: 取得訂單資料
    var self = this;
    axios
      .get(`https://localhost:44319/api/Order`, {
        params: {
          ID: self.$route.params.id
        }
      })
      .then(function(response) {
        console.log(response);
        // 查詢成功
        if (response.status == 200) {
          // 後端回傳的狀態: false
          if (response.data.status == false) {
            alert(response.data.message);
            self.$q.loading.hide();
          }
          // 後端回傳的狀態: true
          else {
            self.shopName = response.data.order.name;
            self.statusCode = response.data.order.status;
            self.total = response.data.order.total_price;
            self.buyerInfo.name = response.data.order.customer;
            self.buyerInfo.phone = response.data.order.phone;
            self.buyerInfo.email = response.data.order.email;
            self.buyerInfo.note = response.data.order.note;
            self.details = response.data.order.details;
            self.$q.loading.hide();
          }
        }
        // 查詢失敗
        else {
          alert("查詢訂單資料失敗!\nstatus code: " + response.data.status);
          self.$q.loading.hide();
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("查詢訂單資料失敗!\n" + error);
        self.$q.loading.hide();
      });
  }
};
</script>