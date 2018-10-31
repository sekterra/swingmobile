
<!--
목적 : 점검결과 처리 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-card>
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('title.inspectionResult')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-icon
                  slot="activator"
                  color="white"
                >
                list
                </v-icon>
                <span>Tooltip</span>
              </v-tooltip>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-form v-model="isValidForm">
                  <v-layout row wrap fill-height>
                    <v-flex xs6 class="py-0">
                      <!-- 점검일정번호 -->
                      <v-text-field
                        :label="$t('title.inspectionNo')"
                        v-model="inspectionInfo.chkPlanNo"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="py-0">
                      <!-- 점검명 -->
                      <v-text-field
                        :label="$t('title.inspectionTitle')"
                        v-model="inspectionInfo.chkMastNm"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="py-0">
                      <!-- 점검주기 -->
                      <v-text-field
                        :label="$t('title.inspectionCycle')"
                        v-model="inspectionCycle"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="py-0">
                      <!-- 점검결과 -->
                      <v-text-field
                        :label="$t('title.inspectionResult')"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="py-0">
                      <!-- 점검부서 -->
                      <v-text-field
                        :label="$t('title.inspectionDepartment')"
                        v-model="inspectionInfo.deptNm"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="py-0">
                      <!-- 점검계획일 -->
                      <v-text-field
                        :label="$t('title.inspectionPlanDate')"
                        v-model="inspectionInfo.chkPlanDt"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="py-0">
                      <!-- 점검일 -->
                      <v-text-field
                        :label="$t('title.inspectionDate')"
                        v-model="inspectionInfo.chkDt"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 class="py-0">
                      <!-- 최종점검일 -->
                      <v-text-field
                        :label="$t('title.inspectionLastCheckDate')"
                        v-model="inspectionInfo.lastChkDate"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="py-0">
                      <!-- 비고 -->
                      <v-textarea
                        :label="$t('title.remark')"
                        v-model="inspectionInfo.rsltDsc"
                        outline
                        disabled
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12 class="py-0">
                      <v-divider></v-divider>
                      <v-subheader class="pa-0 mt-3">
                        {{$t('title.inspectionFileUpload')}}
                      </v-subheader>
                    </v-flex>
                  </v-layout>                     
              </v-form>               
            </v-card-text>       
          </v-card>
        </v-flex>           
      </v-layout>

      <!-- <v-layout v-for="item in chkRsltData" :key="item.equipCd"> -->
      <v-layout>
        <v-flex xs12>
          <v-card>
          <v-img
            class="white--text"
            height="80px"
            transition
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="title">[MT-00] 터널식 세척기</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <!-- <v-card-title>
         </v-card-title> -->
          <v-card-text>
            <!-- <v-subheader>
              점검결과
            </v-subheader> -->
            <v-container fluid grid-list-md ma-0>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4>
                  <v-card color="indigo lighten-5">
                    <v-card-title primary class="title">1.</v-card-title>
                    <v-card-media>
                      <v-container
                        fluid
                        pa-2
                      >
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="contents" v-text="lorem"  ></span>
                        </v-flex>
                      </v-layout>
                      </v-container>
                    </v-card-media>
                    <v-card-actions>
                      <v-switch
                          label="정상"
                          color="indigo"
                          value="success"
                          hide-details
                        >
                      </v-switch>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                  <v-layout row wrap>
                    <v-flex d-flex>
                      <v-card color="transparent">
                        <v-card-text>
                          <v-text-field 
                            label="UCL"
                            clearable>
                          </v-text-field>
                          <v-text-field 
                            label="LCL"
                            clearable>
                          </v-text-field>
                          <v-textarea
                            name="input-7-1"
                            label="비고"
                            auto-grow
                            rows="1"
                            clearable
                            value=""
                          ></v-textarea>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <!-- <v-flex d-flex>
                      <v-card color="grey lighten-5">
                        <v-card-text>
                          
                        </v-card-text>
                      </v-card>
                    </v-flex> -->
                  </v-layout>
                </v-flex>


                <v-flex d-flex xs12 sm6 md4>
                  <v-card color="indigo lighten-5">
                    <v-card-title primary class="title">2.</v-card-title>
                    <v-card-media>
                      <v-container
                        fluid
                        pa-2
                      >
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="contents" v-text="lorem"  ></span>
                        </v-flex>
                      </v-layout>
                      </v-container>
                    </v-card-media>
                    <v-card-actions>
                      <v-switch
                          label="정상"
                          color="indigo"
                          value="success"
                          hide-details
                        >
                      </v-switch>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                  <v-layout row wrap>
                    <v-flex d-flex>
                      <v-card color="">
                        <v-card-text>
                          <v-text-field 
                            label="UCL"
                            clearable>
                          </v-text-field>
                          <v-text-field 
                            label="LCL"
                            clearable>
                          </v-text-field>
                          <v-textarea
                            name="input-7-1"
                            label="비고"
                            auto-grow
                            rows="1"
                            clearable
                            value=""
                          ></v-textarea>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <div class="text-xs-center">
            <y-btn
              type="save"
              :title="$t('button.save')"
              :action-url="url"
              :action-type="requestType"
              :param="saveData"
              :is-valid-by-parent = "isValid"
              @btnClicked="btnSaveClicked" 
              @btnClickedError="btnClickedError"
              @checkValidation="checkValidation"
            ></y-btn>
            <y-btn
              type="delete"
              :title="$t('button.delete')"
              @btnClicked="btnDeleteClicked" 
              @btnClickedError="btnClickedError"
            ></y-btn>
            <y-btn
              type="clear"
              :title="$t('button.clear')"
              @btnClicked="btnClearClicked" 
            ></y-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import transactionConfig from '@/js/transactionConfig.js'
import selectConfig from '@/js/selectConfig.js'

let transaction = transactionConfig.wo.request
export default {
  components: {
    VWidget
  },
  $_veeValidate: {
    validator: 'new'
  },
  data: () => (
  {
    // wo 저장
    saveData: transaction.insert.param,
    url: transaction.insert.url,
    requestType: transaction.insert.requestType,
    inspectionInfo: selectConfig.inspection.inspectionInfo.data,
    inspectionCycle: '',
    defaultSaveData: {},  // 초기 저장값(저장 값 초기화 시키기 위해 사용)
    // form 유효성 여부
    isValidForm: true,
    // TODO(중요) : 쓰기 권한 여부이며, 페이지내 컨트롤에 적용됨
    editable: true,
    isValid: false,
    chkResultData: [],
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
  }),
  watch: {
  },
  computed: {
  },
  mounted () {
    // TODO : vue router로 전달된 값이 있으면 별도로 처리한다.
    // 참고 : @/router/path.js의 props 속성에서 설정된 방식으로 처리됨
    if (this.$attrs.query) {
      var pk = this.$attrs.query
      this.url = transaction.update.url + '/' + pk
      this.requestType = transaction.update.requestType // post
      this.saveData = transaction.update.param
      this.onSearch(pk)
    }
    this.defaultSaveData = this.$comm.clone(this.saveData)
  },  
  methods: {
    // 버그 있음 : 수정 필요
    btnClearClicked () {
      this.saveData = this.$comm.clone(this.defaultSaveData);
      this.$validator.reset();
    },
    btnClickedError(_error) {
      console.log('error:' + JSON.stringify(_error))
    },
    btnSaveClicked(_result) {
      console.log('success:' + JSON.stringify(_result))
      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woList')
    },
    btnDeleteClicked(_result) {
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation() {
      this.$validator.validateAll().then((_result) => {
        this.isValid = _result
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'))
      }).catch(() => {
        this.isValid = false
      });
    },
    // 단일 WO 검색
    onSearch(_pk) {
      this.$ajax.url = selectConfig.inspection.inspectionInfo.url + _pk
      this.$ajax.requestGet((_result) => {
        this.inspectionInfo = _result
        // this.getCheckListData(_result.chkRsltPks)
      })
    },
    getCheckListData(_chkRsltPks) {
      this.chkResultData = []
      var url = 'inspection/result/equip/'
      for (var key in _chkRsltPks) {
        this.$ajax.url = url + _chkRsltPks[key]
        this.$ajax.requestGet((data) => {
          this.chkResultData.push(data)
        })
      }
    }
  }
};
</script>