<!--
목적 : Speed Dial 컴포넌트
Detail : Not Tested Yet!!!
 * 
examples: 
 *  
-->
<template>
<v-speed-dial
  v-model="isSpeedDialOpened"
  :top="isAlignBottom"
  :bottom="!isAlignBottom"
  :right="isAlignRight"
  :left="!isAlignRight"
  :direction="direction"
  :open-on-hover="isOpenHover"
  :transition="transition"
>
  <v-btn
    slot="activator"
    v-model="isSpeedDialOpened"
    :color="mainButtonOption.color"
    dark
    fab
  >
    <v-icon>{{mainButtonOption.icon}}</v-icon>
    <v-icon>close</v-icon>
  </v-btn>
  <v-btn v-for="item in buttons" :key="item.icon"
    fab
    dark
    small
    :color="item.color"
    @click.prevent="btnClicked(item)"
  >
    <v-icon>{{item.icon}}</v-icon>
  </v-btn>
</v-speed-dial>
  
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-data-table',
  props: {
    isAlignBottom: {
      type: Boolean,
      default: false
    },
    isAlignRight: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'top'
    },
    transition: {
      type: String,
      default: 'slide-y-reverse-transition',
      validator(_value) {
        return ['slide-y-transition', 'slide-y-reverse-transition','slide-x-transition', 'slide-x-reverse-transition', 'scale-transition']
      }
    },
    mainButtonOption: {
      type: Object,
      default() {
        return {
          color: 'blue darken-2',
          icon: 'add_circle'
        }
      }
    },
    buttons: {
      type: Array,
      required: true
      /**
       * example)
       * [{
       *  color: 'success',
       *  icon: 'check_circle',
       *  callback: 'checkBtnClicked'
       * }]
       */
    }
  },
  data: () => ({
    isSpeedDialOpened: false
  }),
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
    btnClicked(_item) {
      this.$emit(_item.callback)
    }
  }
}
</script>

