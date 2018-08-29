<!--
등록 샘플 화면
-->
<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm6 child-flex>
        <v-text-field
          label="설비코드*" 
          class="mr-2"
          clearable
          >
        </v-text-field>
    </v-flex>
    <v-flex d-flex xs12 sm6>
      <v-text-field
          label="설비명" 
          class="mr-2"
          clearable>
        </v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm6 child-flex>
      <DatePicker @dateChanged="dateChanged" label="보증만료일"></DatePicker>
    </v-flex>
    <v-flex d-flex xs12 sm6>
      <v-text-field label="구매비용" type="number" prepend-icon="attach_money">
      </v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm6 child-flex>
      <v-text-field mask="### - #### - ####" label="전화번호">
      </v-text-field>
    </v-flex>
    <v-flex d-flex xs12 sm6 child-flex>
      <v-text-field mask="time" label="시간" prepend-icon="access_time"> 
      </v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex d-flex xs12>
      <v-textarea
          label="비고"
          rows="3"
          value=""
          hint="0 / 2000">
      </v-textarea>
    </v-flex>
  </v-layout>
  <v-layout column align-center>
    <v-btn color="success">등록</v-btn>
  </v-layout>
</v-container>
</template>

<script>
// import DatePicker from '../../components/Datepicker';

export default {
  // components: {
  //   'DatePicker': DatePicker
  // },
  data() {
    return {
    }
  },
  methods: {
    dateChanged(_date) {
      this.debug = '[parent datepicker]:' + _date;
    }
  }
}
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>