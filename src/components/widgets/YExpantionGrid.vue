<!--
  목적 : 확장용 그리드 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
<v-card flat>
  <v-card-title class="pa-0 ma-0">
    <v-subheader>{{title}}</v-subheader>
    <v-toolbar
      dense
      dark
      color="grey darken-1"
    >
    <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field
            v-model="keyword"
            hide-details
            prepend-icon="search"
            append-line
        ></v-text-field>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-media height="100" class="pa-0 ma-0 vscroll">
      <v-expansion-panel
      >
        <v-flex
          v-for="(item, i) in titleInfos"
          v-if="titleInfos.length > 0"
          :key="item.pk"
          xs12 
          md6 
          class="pa-0 ma-0">
          <v-expansion-panel-content class="pa-0 ma-0">
            <div slot="header" class="word-break">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkValues[i]"
                color="indigo"
                hide-details
                :value="item.pk"
                :label="item.title"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex 
          v-else
          xs12>
          <div>
            {{$t('message.noData')}}
          </div>
        </v-flex>
      </v-expansion-panel>
    </v-card-media>
    <v-divider></v-divider>

    <v-card-actions>
      <v-chip
        close
        color="green"
        outline
      >Success</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
import $ from 'jquery'
export default {
  /* attributes: name, components, props, data */
  name: 'y-expantion-grid',
  props: {
    title: String,
    rowCount: {
      type: Number,
      default: 5
    },
    isHideDetail: {
      type: Boolean,
      default: true
    },
    // grid item
    items: {
      type: Array,
      default: null
    },
    itemTitle: {
      type: Object,
      default: null
    }
  },
  watch: {
    items: () => {

    }
  },
  data: () => ({
    keyword: null,
    titleInfos: [],
    cardContents: [],
    selection: [],
    checkValues: []
  }),
  watch: {
    items() {
      this.mappedData();
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  //* methods */
  methods: {
    /**
     * 부모로부터 받아온 items, itemTitle정보를 바탕으로 정보를 mapping 하는 함수
     */
    mappedData() {
      this.titles = []
      this.cardContents = []
      var checkValues = []
      $.each(this.items, (_i, _item) => {
        this.titleInfos.unshift({
          title: _item[this.itemTitle.title],
          pk: _item[this.itemTitle.pk]
        })
        checkValues.unshift(null)
      })
      this.$set(this, 'checkValues', checkValues)
    },
    itemClicked(_checkValue, _pk) {
      // if (_checkValue) _checkValue = null
      // else _checkValue = _pk
       _checkValue = _pk
      console.log('itemClicked')
    },
  }
}
</script>

<style>
.vscroll {
  overflow-y:auto;
}
.word-break {
  word-break: break-all;
}
</style>
