<!--
목적 : 팝업 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <v-layout row justify-center fill-height>
    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title class="headline">
          <v-icon 
            large color="amber darken-4"
          >{{icon}}
          </v-icon>
          {{title}}
        </v-card-title>
        <v-card-text>
          <slot name="body">
            <span v-html="message"></span>
          </slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="type === 'confirm'"
            color="green darken-1"
            flat="flat"
            @click.prevent="yesClicked"
          >
            Yes
          </v-btn>
          <v-btn
            v-if="type === 'confirm'"
            color="deep-orange darken-3"
            flat="flat"
            @click.prevent="noClicked"
          >
            No
          </v-btn>

          <v-btn
            v-if="type === 'info' || type === 'error'"
            color="green darken-1"
            flat="flat"
            @click.prevent="noClicked"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-dialog',
  props: {
    // 알림 메시지 타이틀
    title: {
      type: String,
      default: '알림'
    },
    // 알림 메시지
    message: {
      type: String
    },
    // 알림 메시지 종류 : info, confirm
    type: {
      type: String,
      default: 'info'
    },
    // 부모창에서 팝업 제어할 때 사용되는 attribute
    isOpenDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isOpenDialog() {
      this.$set(this, 'dialog', this.isOpenDialog)
      // this.dialog = this.isOpenDialog
      if (this.type === 'info') this.icon = 'info'
      else if(this.type === 'error') this.icon = 'error'
      else if(this.type === 'confirm') this.icon = 'help'
    }
  },
  data() {
    return {
      dialog: false, // 팝업 오픈 여부
      icon: 'info'
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    console.log('YDialog mounted')
    this.$set(this, 'dialog', this.isOpenDialog)
    // this.dialog = this.isOpenDialog
    if (this.type === 'info') this.icon = 'info'
    else if(this.type === 'error') this.icon = 'error'
    else if(this.type === 'confirm') this.icon = 'help'
  },
  /* methods */
  methods: {
    noClicked() {
      this.$emit('dialogResult', false)
    },
    yesClicked() {
      this.$emit('dialogResult', true)
    }
  }
}
</script>

