<template>
  <div>
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <q-card-section class="flex flex-center">
          <q-img class="rounded-borders" contain height="300px" :src="image" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{title}}{{id}}</div>
          <div class="q-mt-sm q-mb-xs phone">電話:{{phone}}</div>
          <div class="q-mt-sm q-mb-xs time">線上訂餐時間{{time}}</div>
          <q-btn color="primary" label="點餐" :to="link()"></q-btn>
        </q-card-section>
      </q-card-section>

      <!-- <q-separator /> -->
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    image: String,
    title: String,
    phone: String,
    time: String
  },
  methods: {
    link() {
      return "menu/" + this.id;
    }
  }
};
</script>