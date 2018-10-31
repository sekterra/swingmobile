<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>{{title}}</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>       -->
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          v-if="items"
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-0 table-striped"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.workOrderNo }}</td>
            <td class="text-xs-left">{{ props.item.workTitle }}</td>
            <!-- <td class="text-xs-left">{{ props.item.planEndDt }}</td> -->
            <td class="text-xs-right"><v-chip label small :color="getColorByStatus('delayed')" text-color="white" >{{ props.item.delayDays }} {{$t('title.date')}}</v-chip></td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import items from '@/api/order';
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          value: 'workOrderNo'
        },
        { text: this.$t('title.woTitle'), value: 'workTitle' },
        { text: this.$t('title.woDelay'), value: 'status' },
      ],
      colors: {
        processing: 'blue',
        delayed: 'red',
        delivered: 'green'
      }
    };
  },
  computed: {
    randomColor () {
      let item = Math.floor(Math.random() * this.colors.length);
      return this.colors[item];
    },
    items () {
      return this.data
    }
  },
  methods: {
    getColorByStatus (status) {
      return this.colors[status];
    }
  }
};
</script>
