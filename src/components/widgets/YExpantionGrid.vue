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
    <v-subheader>외주업체 선택</v-subheader>
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
      <v-expansion-panel>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox1" 
                color="indigo"
                hide-details
                label="가나다라마가나다라마"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex xs12 sm6  class="pa-0 ma-0">
          <v-expansion-panel-content>
            <div slot="header" class="overflow-hidden">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkbox2" 
                color="indigo" 
                hide-details 
                label="Do you agree?"/>
            </div>
            <v-card>
              <v-card-text>
              </v-card-text>
            </v-card>
        </v-expansion-panel-content>
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
    }
  },
  data: () => ({
    keyword: null,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  //* methods */
  methods: {
  }
}
</script>

<style>
.vscroll {
  overflow: hidden;
  overflow-y:auto;
}
.overflow-hidden {
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  overflow:hidden;
}
</style>
