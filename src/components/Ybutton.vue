<!--
  TODO : 버튼 공통 모듈
-->
<template>
  <v-btn
      :loading="loading"
      :disabled="loading"
      :color="color"
      @click.prevent="btnClicked"
    >
      <span v-if="isValid">{{title}}</span>
      <v-icon v-else>block</v-icon>
    </v-btn>
</template>

<script>
export default {
  name: 'y-btn',
  props: {
    type: { // 버튼의 종류 : save, delete, cancel, close
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    actionUrl: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      color: '',
      isValid: true,
      actionType: 'GET',
      actionMethod: 'requestGet'
    }
  },
  beforeMount () {
    this.initButtonType()
  },
  methods: {
    initButtonType () {
      var type = this.type.toLowerCase()
      if (type === 'search') {
        this.color = 'success'
        this.actionType = 'GET'
        this.actionMethod = 'requestGet'
      }
      else if (type === 'save') {
        this.color = 'success'
        this.actionType = 'POST'
        this.actionMethod = 'requestPost'
      }
      else if (type === 'delete') {
        this.color = 'error'
        this.actionType = 'POST'
        this.actionMethod = 'requestPost'
      }
      else if (type === 'cancel') {
        this.color = 'primary'
      } 
      else if (type === 'close')  this.color = 'primary'
      else {
        this.color = 'error'
        this.isValid = false
      }
    },
    btnClicked () {
      if (!this.isValid) return
      this.loading = !this.loading
      // setTimeout(() => (this.loading = false), 3000)
      if (this.actionUrl) {
        this.$ajax.url = this.actionUrl
        this.$ajax.type = this.actionType
        let self = this
        this.$ajax[this.actionMethod]((_result) => {
          self.loading = false
          self.$emit('btnClicked', _result)
        }, (_error) => {
          self.loading = false
          self.$emit('btnClickedError', _error) 
        })
      }
    }
  }
}
</script>

