<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="q-ml-md">
          <q-btn flat to="/">NiDin</q-btn>
          <q-btn flat to="/">訂餐</q-btn>
          <q-btn flat>購物車</q-btn>
        </q-toolbar-title>
        <div class="row justify-end">
          <q-btn flat rounded>登入</q-btn>
          <q-btn flat rounded>Quasar v{{ $q.version }}</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">常用功能</q-item-label>
        <Menu v-for="m in menu" :key="m.title" v-bind="m"></Menu>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import Menu from "components/Menu";
export default {
  name: "MainLayout",

  components: {
    // EssentialLink,
    // Menu
  },

  data() {
    return {
      leftDrawerOpen: false,
      menu: [
        {
          title: "首頁",
          caption: "查看可訂購店家",
          icon: "eco",
          link: ""
        },
        {
          title: "帳號管理",
          caption: "帳號資料修改",
          icon: "eco",
          link: ""
        },
        {
          title: "角色管理",
          caption: "角色?",
          icon: "eco",
          link: ""
        },
        {
          title: "店家管理",
          caption: "店家資料修改",
          icon: "eco",
          link: ""
        },
        {
          title: "帳號與店家關聯",
          caption: "綁定店家",
          icon: "eco",
          link: ""
        }
      ],
      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Github",
          caption: "github.com/quasarframework",
          icon: "code",
          link: "https://github.com/quasarframework"
        },
        {
          title: "Discord Chat Channel",
          caption: "chat.quasar.dev",
          icon: "chat",
          link: "https://chat.quasar.dev"
        },
        {
          title: "Forum",
          caption: "forum.quasar.dev",
          icon: "record_voice_over",
          link: "https://forum.quasar.dev"
        },
        {
          title: "Twitter",
          caption: "@quasarframework",
          icon: "rss_feed",
          link: "https://twitter.quasar.dev"
        },
        {
          title: "Facebook",
          caption: "@QuasarFramework",
          icon: "public",
          link: "https://facebook.quasar.dev"
        }
      ]
    };
  }
};
</script>
