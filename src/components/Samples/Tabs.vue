<template>
<div>
  <v-tabs
    v-model="active"
    color="blue darken-4"
    dark
    slider-color="blue darken-1">
    <v-tab ripple>
    조회화면
    </v-tab>
    <v-tab ripple>
    등록화면
    </v-tab>
    <v-tab ripple v-if="isEdit">
    수정화면
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
import Search from './Search';
import Create from './Create';
export default {
  components: {
    'search-vue': Search,
    'create-vue': Create
  },
  data () {
    return {
      active: null,
      isEdit: false,
      btnHidden: false
    }
  },
  methods: {
    edit() {
      this.isEdit = true;
      this.active = 2;
    },
    closeTab() {
      this.isEdit = false;
      this.active = 0;
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

