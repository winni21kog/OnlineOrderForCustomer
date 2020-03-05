<template>
  <div class="row section-card q-ma-sm">
    <div class="col-12 q-pa-sm">
      <b class="title">目前可訂餐店家</b>
    </div>
    <template v-for="(data,idx) in stores">
      <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-sm" :key="idx">
        <LCard
          :id="data.id"
          :image="data.image"
          :phone="data.phone"
          :title="data.title"
          :time="data.time"
        />
      </div>
    </template>
  </div>
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
import LCard from "src/components/LCard.vue";
export default {
  components: {
    LCard
  },
  data() {
    return {
      stores: [
        {
          id: 1,
          image:
            "https://upload.wikimedia.org/wikipedia/zh/thumb/b/bf/Starbucks_Coffee.svg/1200px-Starbucks_Coffee.svg.png",
          title: "星巴克",
          phone: "0227085108",
          time: "11:00~14:00"
        },
        {
          id: 2,
          image:
            "https://upload.wikimedia.org/wikipedia/zh/f/f1/Louisa_Coffee_logo.jpg",
          title: "露易莎",
          phone: "0227085108",
          time: "11:00~14:00"
        },
        {
          id: 3,
          image: "https://www.easycard.com.tw/_upload/images/C0475.jpg",
          title: "50嵐",
          phone: "0227085108",
          time: "11:00~14:00"
        },
        {
          id: 4,
          image:
            "https://ct.yimg.com/xd/api/res/1.2/jm1zaU4s8ymQsIxM4mJTjQ--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD01MDA7cT04NTtyb3RhdGU9YXV0bzt3PTUwMA--/https://s.yimg.com/ob/image/837cb36f-ec49-45cf-a7bd-51c0096b04af.jpg",
          title: "迷克夏",
          phone: "0227085108",
          time: "11:00~14:00"
        }
      ]
    };
  }
};
</script>


