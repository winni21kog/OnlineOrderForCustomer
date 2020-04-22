<template>
  <q-page>
    <div class="row section-card q-ma-sm">
      <div class="col-12 q-pa-sm">
        <b class="title">目前可訂餐店家</b>
      </div>
      <!-- 商家卡片 shops-->
      <template v-for="(data, idx) in shopList">
        <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-sm" :key="idx">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <q-card-section class="flex flex-center">
                <q-img class="rounded-borders" contain height="300px" :src="data.image" />
              </q-card-section>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">{{ data.name }}</div>
                <div class="q-mt-sm q-mb-xs phone">電話:{{ data.tel }}</div>
                <div class="q-mt-sm q-mb-xs time">線上訂餐時間:{{ data.start_time }} 至 {{ data.end_time }}</div>
                <q-btn color="primary" label="點餐" :to="link(data.id)"></q-btn>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </div>
  </q-page>
</template>

<style>
.section-card {
  margin-right: 5%;
  margin-left: 5%;
}
.title {
  font-size: 36px;
}
.phone {
  font-size: 20px;
}
.time {
  font-size: 20px;
}
</style>

<script>
export default {
  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //return store.dispatch("GetShop");
  },
  computed: {
    shops() {
      return this.$store.state.shop.shops;
    },
    // 處理店家清單：時間格式處理
    shopList() {
      return this.$store.state.shop.shops.map(({ id }) => {
        const shops = this.$store.state.shop.shops.find(shop => shop.id === id);

        return {
          id: shops.id,
          name: shops.name,
          tel: shops.tel,
          start_time:
            shops.start_time.substr(0, 2) + ":" + shops.start_time.substr(2, 2),
          end_time:
            shops.end_time.substr(0, 2) + ":" + shops.end_time.substr(2, 2),
          image: shops.image
        };
      });
    }
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("GetShop");
  },
  methods: {
    link(id) {
      return `menu/${id}`;
    }
  }
};
</script>

