<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="grey lighten-3 mt-3" white flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.pmStatistics')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <y-status :statusList="statusList" />
              <!-- /요약 -->
            </v-card-text>       
          </v-card>
        </v-flex>    
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import YStatus from '@/components/widgets/chart/YStatus'

export default {
  /* attributes: name, components, props, data */
  components: {
    YStatus
  },
  name: 'y-wo-statistics',
  props: {
  },
  data: () => ({
  }),
  computed: {
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    Object.assign(this.$data, this.$options.data());

    this.statusList = [
      {key: 'pmCount'},
      {key: 'pmCompleteRate'},
      {key: 'pmCompleteRateToday'},
      {key: 'pmPerformanceStatus', searchYn: true}
    ]
  },
  mounted() {
  },
  beforeDestroy() {
  },
  /* methods */
  methods: {
  }
}
</script>

