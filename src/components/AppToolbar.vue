<!-- 
파일명 : Apptoolbar.vue
목적 : 기본 화면 레이아웃 상단 툴바
-->

<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
      <!-- left 메뉴 토글 버튼 -->
      <v-toolbar-title class="ml-0">
        <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- full screen 버튼 -->
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <!-- WO -->
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">5</span>
          <v-icon medium title="오늘의 WO">description</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">2</span>
          <v-icon medium title="오늘의 점검">list_alt</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <!-- full screen 버튼 -->
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-icon title="설정">settings</v-icon>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  data: () => ({
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
<style>
.border { border:1px solid #0000ff };
</style>
