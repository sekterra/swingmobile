<!--
  목적 : 클릭 한번으로 쉽게 년도나 월을 변경할 수 있는 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
<div class="text-xs-center">
  <v-btn-toggle
    mandatory
    v-model="type">
    <v-btn 
      small 
      flat 
      color="success darken-1"
      value="month">
      {{$t('title.month')}}
    </v-btn>
    <v-btn 
      small 
      flat 
      color="orange darken-1"
      value="month6">
      {{$t('title.month6')}}
    </v-btn>
    <v-btn 
      small 
      flat 
      color="indigo darken-1"
      value="year">
      {{$t('title.year')}}
    </v-btn>
  </v-btn-toggle>
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
    // type: {   // year, month를 구분하는 구분자
    //   type: String,
    //   default: 'month'
    // },
    value: {   // 부모로 부터 현재 날짜를 받아오는 속성
      type: [String, Number]
    },
    // format: { // 부모로 부터 전달된 date 속성의 format
    //   type: String,
    //   default: 'YYYYMM'
    // }
  },
  data: () => ({
    thisDate: null,  // 현재날짜를 저장하고 있는 함수
    type: 'month'
  }),
  computed: {
    // 사용자에게 보여지는 thisDate로써 locale 형식을 따른다.
    fomattedDate() {
      var value = this.value
      if (!value) {
        value = this.type === 'year' ? this.$comm.getThisYear() : this.$comm.getThisMonth()
      }
      if (!this.thisDate) this.thisDate = value
      var tmpDate = null
      if (this.type !== 'year') tmpDate = this.$comm.getLocaleYearMon(this.thisDate, this.format)
      else tmpDate = this.thisDate
      return tmpDate
    },
    // 기간 감소 포맷
    reduceTerm() {
      if (this.type === 'year') return '-1y'
      else return '-1m'
    },
    // 기간 증가 포멧
    increaseTerm() {
      if (this.type === 'year') return '1y'
      else return '1m'
    },
    format() {
      return this.type === 'year' ? 'YYYY' : 'YYYYMM'
    },
    dateType() {
      return this.type === 'year' ? 'YEAR' : 'MON'
    }
  },
  watch: {
    type() {
      if (this.type === 'year') this.thisDate = this.$comm.getThisYear()
      else this.thisDate = this.$comm.getThisMonth()
      this.$emit('input', this.thisDate)
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
    },
    getDateType() {
      return this.dateType;
    }
  }
}
</script>