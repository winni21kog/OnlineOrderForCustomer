<template>
  <q-page>
    <!-- <SectionCarousel></SectionCarousel> -->
    <div class="row">
      <div class="col-md-2 col-xs-1"></div>
      <div class="col-md-8 col-xs-10">
        <!-- <q-input
          filled
          bottom-slots
          v-model="search"
          placeholder="請輸入店家名稱"
          counter
          maxlength="10"
          dense
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>-->
      </div>
      <div class="col-md-2 col-xs-1"></div>
    </div>
    <SectionCards></SectionCards>
  </q-page>
</template>

<script>
// import SectionCarousel from "./SectionCarousel";
import SectionCards from "./SectionCards";
export default {
  components: {
    // SectionCarousel,
    SectionCards
  },
  data() {
    return {
      search: ""
    };
  }
};
</script>
