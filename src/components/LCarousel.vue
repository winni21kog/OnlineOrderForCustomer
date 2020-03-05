<template>
  <div class="q-px-xs">
    <q-carousel animated v-model="slide" navigation infinite autoplay arrows contain height="200px">
      <q-carousel-slide :name="1" img-src="statics/Louisa.jpg" />
      <q-carousel-slide :name="2" img-src="statics/starbucks.jpg" />
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