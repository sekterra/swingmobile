<template>
  <v-menu
    ref="datePickerMenu"
    :close-on-content-click="false"
    v-model="datePickerMenu"
    :nudge-right="40"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="100px">
    <v-text-field
      slot="activator"
      v-model="date"
      :label="label"
      prepend-icon="event"
      readonly>
    </v-text-field>
    <v-date-picker v-model="date" @input="input" :locale="locale"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'Datepicker',
  props: {
    label: {
      type: String,
      default: '날짜를 선택하세요.'
    },
    locale: {
      type: String,
      default: 'kr-ko'
    }
  },
  data() {
    return {
      datePickerMenu: null,
      date: null
    }
  },
  methods: {
    input() {
      try {
        this.$refs.datePickerMenu.save(this.date);
        this.$emit('dateChanged', this.date);
      } catch (e) {
        window.alert(e.message);
      }
    }
  }
}
</script>

