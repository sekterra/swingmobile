<!--
목적 : vuetify 기반 Chip 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <v-chip 
    :color="sets[type].color"
    :text-color="sets[type].textColor"
    :label="sets[type].label"
    :outline="outline"
    @click.prevent="chipClicked"
    >
    <v-avatar>
        <v-icon :color="sets[type].iconColor">
          {{sets[type].icon}}
        </v-icon>
    </v-avatar>
    {{text}}
  </v-chip>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-chip',
  props: {
    type: {
      type: String,
      required: true,
      /**
       * TODO:
       * success: success work,
       * error: failed work,
       * code: 설비코드, wo 번호, pm 번호 등
       * dispose: an equipment was disposed
       * warranty: an equipment in warranty
       * expired: expired warranty of an equipment
       * location: a loaction of equipment or material is placed
       * maint_type_pm: pm
       * maint_type_bm: 고장정비
       * maint_type_cm: 개량정비
       * maint_type_no: 일상작업
       * costs: 설비 구매비용
       * importance: 설비 중요도
       */
      validator(_value) {
        // The value must match one of these strings
        return ['success', 'error', 'disposed', 'warranty', 'expired', 'location', 'maint_type_pm', 'maint_type_bm', 'maint_type_cm', 'maint_type_no', 'costs', 'code', 'importance', 'popup' ].indexOf(_value) !== -1
      }
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: [String, Number],
      default: 'No Data'
    },
    label: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    callback: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    sets: {
      success: {
        color: 'success',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'check_circle',
        label: false
      },
      error: {
        color: 'error',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'error',
        label: false
      },
      disposed: {
        color: 'error',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'not_interested',
        label: false
      },
      warranty: {
        color: 'success',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'event',
        label: false
      },
      expired: {
        color: 'warning',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'new_releases',
        label: false
      },
      location: {
        color: 'indigo darken-3',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'location_on',
        label: false
      },
      maint_type_pm: {
        color: 'indigo darken-2',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'description',
        label: true
      },
      maint_type_bm: {
        color: 'error',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'description',
        label: true
      },
      maint_type_cm: {
        color: 'warning',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'description',
        label: true
      },
      maint_type_no: {
        color: 'success',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'description',
        label: true
      },
      costs: {
        color: 'success',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'monetization_on',
        label: false
      },
      code: {
        color: 'indigo darken-3',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'label',
        label: false
      },
      popup: {
        color: 'success',
        textColor: 'white',
        iconColor: 'white',
        icon: this.icon ? this.icon : 'open_in_browser',
        label: false
      }
    }
  }),
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
    chipClicked() {
      if (this.callback) this.$emit(this.callback)
    }
  }
}
</script>

