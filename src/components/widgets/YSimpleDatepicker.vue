<!--
  목적 : 클릭 한번으로 쉽게 년도나 월을 변경할 수 있는 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
<div class="text-xs-center">
  <v-btn icon @click.prevent="reduce">
    <v-icon>arrow_left</v-icon>
  </v-btn>
  <span>{{fomattedDate}}</span>
  <v-btn icon @click.prevent="increase">
    <v-icon>arrow_right</v-icon>
  </v-btn>
</div>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-simple-datepicker',
  props: {
    type: {   // year, month를 구분하는 구분자
      type: String,
      default: 'month'
    },
    value: {   // 부모로 부터 현재 날짜를 받아오는 속성
      type: [String, Number]
    },
    format: { // 부모로 부터 전달된 date 속성의 format
      type: String,
      default: 'YYYYMM'
    }
  },
  data: () => ({
    thisDate: null  // 현재날짜를 저장하고 있는 함수
  }),
  computed: {
    // 사용자에게 보여지는 thisDate로써 locale 형식을 따른다.
    fomattedDate() {
      if (!this.thisDate) this.thisDate = this.value
      var tmpDate = null
      if (this.type === 'month') tmpDate = this.$comm.getLocaleYearMon(this.thisDate, this.format)
      else tmpDate = this.thisDate
      return tmpDate
    },
    // 기간 감소 포맷
    reduceTerm() {
      if (this.type === 'month') return '-1m'
      else return '-1y'
    },
    // 기간 증가 포멧
    increaseTerm() {
      if (this.type === 'month') return '1m'
      else return '1y'
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  //* methods */
  methods: {
    reduce() {
      this.thisDate = this.$comm.getCalculatedDate(this.thisDate, this.reduceTerm, this.format, this.format)
      this.$emit('input', this.thisDate)
    },
    increase() {
      this.thisDate =  this.$comm.getCalculatedDate(this.thisDate, this.increaseTerm, this.format, this.format)
      this.$emit('input', this.thisDate)
    }
  }
}
</script>