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
              <v-toolbar-title class="subheading">{{$t('menu.inspectionStatistics')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <y-status :statusList="statusList" />
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
  name: 'y-inspection-statistics',
  props: {
  },
  data: () => ({
  }),
  computed: {
  },
  watch: {
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    Object.assign(this.$data, this.$options.data());

    this.statusList = [
      {key: 'inspectionCompleteRate'},
      {key: 'detectedError'},
      {key: 'inspectionCompleteRateToday'},
      {key: 'inspectionPerformanceStatus', searchYn: true}
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

