<!--
  목적 : 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
        <v-card>
          <v-toolbar color="primary" dark> 
            <v-toolbar-title>
              테스트
            </v-toolbar-title>
          </v-toolbar>
  
          <v-list two-line subheader>
            <v-subheader>{{$t('title.summary')}}</v-subheader>
            
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>선택 업체</v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-chip
                    close
                    color="indigo"
                    outline
                   >
                   test
                 </v-chip>
                  <v-chip
                    close
                    color="indigo"
                    outline
                   >
                   test
                 </v-chip>
                  <v-chip
                    close
                    color="indigo"
                    outline
                   >
                   test
                 </v-chip>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
  
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>총 비용</v-list-tile-title>
                <v-list-tile-sub-title>3,000,000원</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
  
          <v-divider></v-divider>
          <v-toolbar color="grey lighten-4" flat >
            <v-toolbar-side-icon>
              <v-icon color="primary">create</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title class="hidden-sm-and-down">업체 등록</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" placeholder="여기서 업체를 선택하시면 하단에 등록됩니다."></v-text-field>
          </v-toolbar>
          <v-card flat height="300" max-height="300" class="vscroll">  
          <v-list 
            subheader
            two-line
          >
            <v-subheader>선택 업체목록</v-subheader>
            
            <v-list-tile class="grey lighten-4">
              <v-list-tile-avatar>
                  <v-icon class="amber white--text">assignment</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content @click="notifications = !notifications">
                <v-list-tile-title>(주)make IT 수학학원</v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-text-field prepend-icon="attach_money" placeholder="여기에 비용을 입력하세요." ></v-text-field>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon color="indigo">highlight_off</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            
            <v-list-tile>
              <v-list-tile-avatar>
                  <v-icon class="primary white--text">assignment</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content @click="notifications = !notifications">
                <v-list-tile-title>(주)make IT 수학학원</v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-text-field prepend-icon="attach_money" placeholder="여기에 비용을 입력하세요."></v-text-field>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon color="indigo">highlight_off</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            
            <v-list-tile class="grey lighten-4">
              <v-list-tile-avatar>
                  <v-icon class="amber white--text">assignment</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content @click="notifications = !notifications">
                <v-list-tile-title>(주)make IT 수학학원</v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-text-field prepend-icon="attach_money" placeholder="여기에 비용을 입력하세요."></v-text-field>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon color="indigo">highlight_off</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            </v-list>  
            </v-card>
        </v-card>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-regist-list',
  props: {
  },
  data: () => ({
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  //* methods */
  methods: {
  }
}
</script>