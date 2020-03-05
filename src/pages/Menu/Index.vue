<template>
  <q-page>
    <div class="row section-card q-ma-sm">
      <div class="col-12 q-pa-sm">
        <b class="title">店家名稱{{$route.params.id}}</b>
      </div>
      <template v-for="(data,idx) in menus">
        <div class="col-lg-3 col-sm-6 col-xs-12 q-pa-sm" :key="idx">
          <LMenu :category="data.category" :items="data.items" :orders="orders" />
        </div>
      </template>
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
</style>
<script>
import LMenu from "src/components/LMenu";
export default {
  components: {
    LMenu
  },
  data() {
    return {
      menus: [
        {
          category: "tea",
          items: [
            {
              id: 1,
              name: "紅茶",
              price: 35
            },
            {
              id: 2,
              name: "綠茶",
              price: 40
            },
            {
              id: 3,
              name: "烏龍茶",
              price: 45
            }
          ]
        },
        {
          category: "milk",
          items: [
            {
              id: 1,
              name: "紅茶拿鐵",
              price: 50
            },
            {
              id: 2,
              name: "綠茶拿鐵",
              price: 55
            },
            {
              id: 3,
              name: "烏龍拿鐵",
              price: 60
            }
          ]
        },
        {
          category: "蜂蜜",
          items: [
            {
              id: 1,
              name: "蜂蜜紅茶",
              price: 45
            },
            {
              id: 2,
              name: "蜂蜜綠茶",
              price: 50
            },
            {
              id: 3,
              name: "蜂蜜烏龍",
              price: 55
            }
          ]
        },
        {
          category: "珍珠",
          items: [
            {
              id: 1,
              name: "珍珠紅茶",
              price: 40
            },
            {
              id: 2,
              name: "珍珠綠茶",
              price: 45
            },
            {
              id: 3,
              name: "珍珠烏龍",
              price: 50
            }
          ]
        }
      ],
      orders: [
        {
          chooseId: 1,
          multiple: false,
          name: "冰度",
          order: [
            {
              id: 1,
              name: "去冰"
            },
            {
              id: 2,
              name: "少冰"
            },
            {
              id: 3,
              name: "微冰"
            },
            {
              id: 4,
              name: "標準冰"
            },
            {
              id: 5,
              name: "常溫"
            },
            {
              id: 6,
              name: "溫"
            },
            {
              id: 7,
              name: "熱"
            }
          ]
        },
        {
          chooseId: 2,
          multiple: false,
          name: "甜度",
          order: [
            {
              id: 1,
              name: "無糖"
            },
            {
              id: 2,
              name: "微糖"
            },
            {
              id: 3,
              name: "半糖"
            },
            {
              id: 4,
              name: "少糖"
            },
            {
              id: 5,
              name: "9分糖"
            },
            {
              id: 6,
              name: "正常糖"
            }
          ]
        },
        {
          chooseId: 3,
          multiple: true,
          name: "加料",
          order: [
            {
              id: 1,
              name: "珍珠",
              price: 5
            },
            {
              id: 2,
              name: "波霸",
              price: 5
            },
            {
              id: 3,
              name: "耶果",
              price: 5
            },
            {
              id: 4,
              name: "混珠",
              price: 5
            },
            {
              id: 5,
              name: "布丁",
              price: 10
            },
            {
              id: 6,
              name: "香草冰淇淋",
              price: 15
            }
          ]
        }
      ]
    };
  }
};
</script>