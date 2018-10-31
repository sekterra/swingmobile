<template>
  <div id="v-widget">
    <v-card>
      <v-toolbar color="#FAFBFE" flat dense card v-if="enableHeader">
        <v-toolbar-title>
          <v-icon
            v-if="icon"
            :color="icon.color"
          >
          {{icon.icon}}
          </v-icon>
          <h5>
            {{title}}
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="widget-header-action"></slot>
      </v-toolbar>
      <v-divider v-if="enableHeader"></v-divider>
      <v-card-text :class="contentBg" color="#F6F7FB">
        <slot name="widget-content"></slot>       
      </v-card-text>       
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'v-widget',
  props: {
    title: {
      type: String,
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    contentBg: {
      type: String,
      default: 'white'
    },
    icon: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isSpeedDialOpened: false
    };
  },
  computed: {

  },  
};
</script>

<style>
.text-overflow {
  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-wrap: none; 
}
.header {
  background-color: #FAFBFE;
}
</style>