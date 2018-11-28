<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template> 
  <v-card class="elevation-0">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>{{title}}</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list two-line v-if="items.length">
      <template 
        v-for="(item, index) in items"
        >
        <v-list-tile
          :key="item.pk"
          avatar
          ripple
          @click.prevent="itemClicked(item)"
        >
          <v-list-tile-avatar color="blue darken-1">
            <v-icon dark>description</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < items.length"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
    <v-list v-else>
      <template>
        <v-list-tile
          avatar
          ripple
          @click.prevent="itemClicked"
        >
          <v-list-tile-avatar color="light-blue">
            <v-icon dark>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>No Data Available</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-divider></v-divider>
    <v-btn 
      block 
      flat 
      class="ma-0 grey lighten-5"
      :to="moveListUrl">
      All
    </v-btn>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import $ from 'jquery'
export default {
  /* attributes: name, components, props, data */
  name: 'y-notification',
  props: {
    url: {
      type: String,
      required: true
    },
    searchData: {
      type: Object,
      required: true
    },
    matchItem: {
      type: Object,
      required: true
    },
    title: {
      type: String
    },
    movePageUrl: {
      type: String
    },
    moveListUrl: {
      type: String
    }
  },
  data () {
    return {
      orgItems: [],
      items: []
    }
  },
  watch: {
    orgItems() {
      this.items = []
      if (!this.orgItems.length) {
        self.$emit('setCountBadge', self.orgItems.length)
        return
      }
      let self = this
      for(var i = 0; i < this.orgItems.length; i++) {
        if (i === 5) break;
        var _item = this.orgItems[i];
        var item = {}
        for(var key in self.matchItem){
          item[key] = _item[self.matchItem[key]]
        }
        self.items.push(item)
      }
      self.$emit('setCountBadge', self.orgItems.length)
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    this.onSearch()
  },
  /* methods */
  methods: {
    itemClicked(_item) {
      var url = this.movePageUrl + '?pk=' + _item.pk
      this.$comm.movePage(this.$router, url)
    },
    moveToListPage() {
      this.$comm.movePage(this.$router, this.moveListUrl)
    },
    onSearch() {
      let self = this
      this.$ajax.url = this.url
      this.$ajax.param = this.searchData
      this.$ajax.requestGet((_result) => {
        self.orgItems = typeof _result.content !== 'undefined' ? _result.content : _result
        // window.getApp.$emit('APP_CONFIRM', this.$t('message.requestsRemained'))
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
      })
    },
  }
}
</script>

