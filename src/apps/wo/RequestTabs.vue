<template>
<div>
  <v-tabs
    v-model="activeTabIndex"
    color="blue darken-4"
    dark
    slider-color="blue darken-1">
    <v-tab ripple>
    WO요청목록
    </v-tab>
    <v-tab ripple>
    WO요청등록
    </v-tab>
    <v-tab ripple v-if="isEdit">
    WO요청수정
    <v-spacer></v-spacer>
    <v-icon small @click.prevent="closeTab">clear</v-icon>
    </v-tab>
    <!-- 탭 슬라이딩 방지 -->
    <v-tabs-items :touchless="true">
      <v-tab-item>
        <search-vue @edit="edit"></search-vue>
      </v-tab-item>
      <v-tab-item>
        <create-vue></create-vue>
      </v-tab-item>
      <v-tab-item v-if="isEdit">
        <create-vue></create-vue>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</div>
</template>

<script>
import RequestSearch from './RequestSearch';
import RequestCreate from './RequestCreate';
export default {
  components: {
    'search-vue': RequestSearch,
    'create-vue': RequestCreate
  },
  data () {
    return {
      activeTabIndex: null,
      isEdit: false,
      btnHidden: false
    }
  },
  methods: {
    edit() {
      this.isEdit = true;
      this.activeTabIndex = 2;
    },
    closeTab() {
      this.isEdit = false;
      this.activeTabIndex = 0;
    }
  }
}
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

