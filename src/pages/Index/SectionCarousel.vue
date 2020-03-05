<template>
  <div class="q-pa-md">
    <q-carousel animated v-model="slide" navigation infinite autoplay arrows height="300px">
      <q-carousel-slide :name="1" img-src="statics/Louisa.jpg" />
      <q-carousel-slide :name="2" img-src="statics/starbucks.jpg" />
      <template v-slot:control>
        <q-carousel-control position="top-right" class="text-white rounded-borders"></q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      slide: 1
    };
  }
};
</script>
