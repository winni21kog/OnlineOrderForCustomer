<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated v-if="this.$store.state.shop.qheader">
      <q-toolbar>
        <q-toolbar-title class="q-ml-md">
          <q-btn flat to="/">你訂</q-btn>
          <q-btn flat to="/">
            <q-icon name="local_dining"></q-icon>訂餐
          </q-btn>
          <q-btn flat to="/Cart">
            <q-icon name="shopping_cart"></q-icon>購物車
          </q-btn>
        </q-toolbar-title>
        <div class="row justify-end">
          <q-btn flat rounded>登入</q-btn>
          <q-btn flat rounded>Quasar v{{ $q.version }}</q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink";
export default {
  name: "MainLayout",

  components: {},

  data() {
    return {
      leftDrawerOpen: false,

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
