
<!--
목적 : 점검결과 처리 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap>
        <v-flex sm12>
          <!-- title 영역 -->
          <v-toolbar color="primary darken-1" dark="" flat dense cad>
            <v-toolbar-title class="subheading">{{$t('menu.inspectionResult')}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-icon
                slot="activator"
                color="white"
                @click="backToList"
              >
              list
              </v-icon>
              <span>Tooltip</span>
            </v-tooltip>
          </v-toolbar>
        
        <!-- /title 영역 -->
        <v-stepper v-model="index" vertical>
          <v-stepper-items>
            <v-stepper-step
              step="1"
              :complete="index >= 1"
              editable
            >
              <span>
                {{$t('title.inspectionInfo')}}
              </span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-content
              step="1"
              class="ma-0 px-2 py-0"
            >
              <v-layout row wrap>
                <v-flex sm12>
                  <v-card>
                    <v-card-text>
                      <v-layout row wrap fill-height>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검일정번호 -->
                          <v-text-field
                            :label="$t('title.inspectionNo')"
                            v-model="inspectionInfo.chkPlanNo"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검명 -->
                          <v-text-field
                            :label="$t('title.inspectionTitle')"
                            v-model="inspectionInfo.chkMastNm"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검주기 -->
                          <v-text-field
                            :label="$t('title.inspectionCycle')"
                            :value="inspectionInfo.perNumber + inspectionInfo.cycleTypeNm"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검결과 -->
                          <v-text-field
                            :label="$t('title.inspectionResult')"
                            :value="inspectionResult"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검부서 -->
                          <v-text-field
                            :label="$t('title.inspectionDepartment')"
                            v-model="inspectionInfo.deptNm"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검계획일 -->
                          <v-text-field
                            :label="$t('title.inspectionPlanDate')"
                            v-model="inspectionInfo.chkPlanDt"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
                          <!-- 점검일 -->
                          <v-text-field
                            :label="$t('title.inspectionDate')"
                            v-model="inspectionInfo.chkDt"
                            disabled
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 class="py-0">
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
                          <v-subheader class="pa-0 my-3">
                            <v-alert
                              :value="true"
                              type="info"
                            >
                              {{$t('message.noDocumentUpload')}}
                            </v-alert>
                          </v-subheader>
                        </v-flex>
                      </v-layout>                     
                    </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
          <v-stepper-items v-for="(item, n) in chkResultData" :key="`${n}-step`">
            <v-stepper-step
              :complete="index > n + 1"
              :step="n + 2"
              editable
            >
              [{{item.equipCd}}] {{item.equipNm}}
              <small v-if="item.isPass">{{$t('message.inspectionPass')}}</small>
              <small v-else>{{$t('message.inspectionFail')}}</small>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-content
              :step="n + 2"
              :key="`${n}-content`"
              class="ma-0 px-2 py-0"
            >  
              <v-layout>
                <v-flex sm12>
                  <v-card>
                    <v-card-text>
                      <v-container fluid grid-list-md class="ma-0 pa-0">
                        <v-layout row wrap  v-for="(checkItem, i) in item.equipChkItemRslts" :key="`${n}-step-${i}`">
                          <!-- WO 발행 버튼 -->
                          <v-flex 
                            v-if="inspectionInfo.chkStatusCd === 'CHK_STATUS_Y' && !item.isPass && !item.isIssueWo && i === 0"
                            d-flex 
                            xs12 
                            class="py-0 px-1">
                            <v-btn 
                              small
                              dark
                              color="indigo"
                              @click="issueWO(checkItem)">
                              <v-icon>description</v-icon>
                              {{$t('title.issueWo')}}
                            </v-btn>
                          </v-flex>
                          <!-- /WO 발행 버튼 -->
                          <v-flex d-flex xs12 sm6 md4 class="pt-1 pb-0">
                            <v-card :color="saveData.equipChkItems[(n * item.equipChkItemRslts.length) + i].isValid ? 'indigo lighten-5' : 'grey lighten-2'">
                              <v-card-title primary class="title">{{i + 1}}.</v-card-title>
                              <v-responsive>
                                <v-container
                                  fluid
                                  pa-2
                                >
                                <v-layout fill-height>
                                  <v-flex xs12 align-end flexbox>
                                    <span class="contents" v-text="checkItem.chkItemNm"></span>
                                  </v-flex>
                                </v-layout>
                                </v-container>
                              </v-responsive>
                              <v-card-actions>
                                <v-switch
                                    :label="saveData.equipChkItems[(n * item.equipChkItemRslts.length) + i].isValid ? $t('title.pass') : $t('title.fail')"
                                    color="primary"
                                    name="okYn"
                                    v-model="saveData.equipChkItems[(n * item.equipChkItemRslts.length) + i].isValid"
                                    hide-details
                                    @change="changedOkYn(saveData.equipChkItems, (n * item.equipChkItemRslts.length) + i, item) "
                                  >
                                </v-switch>
                              </v-card-actions>
                            </v-card>
                          </v-flex>
                          <v-flex d-flex xs12 sm6 md3>
                            <v-layout row wrap>
                              <v-flex d-flex class="py-0">
                                <v-card color="transparent">
                                  <v-card-text>
                                    <v-text-field 
                                      label="UCL"
                                      v-model="checkItem.ucl"
                                      clearable>
                                    </v-text-field>
                                    <v-text-field 
                                      label="LCL"
                                      v-model="checkItem.lcl"
                                      clearable>
                                    </v-text-field>
                                    <v-textarea
                                      name="input-7-1"
                                      :label="$t('title.remark')"
                                      auto-grow
                                      rows="1"
                                      clearable
                                      v-model="saveData.equipChkItems[(n * item.equipChkItemRslts.length) + i].chkItemRsltDesc"
                                    ></v-textarea>
                                  </v-card-text>
                                </v-card>
                              </v-flex>
                              <!-- WO 발행 버튼 -->
                              <v-flex 
                                v-if="inspectionInfo.chkStatusCd === 'CHK_STATUS_Y' && !item.isPass && !item.isIssueWo && i === item.equipChkItemRslts.length - 1"
                                d-flex 
                                xs12 
                                class="py-0 px-1">
                                <v-btn 
                                  small
                                  dark
                                  color="indigo">
                                  <v-icon>description</v-icon>
                                  {{$t('title.issueWo')}}
                                </v-btn>
                              </v-flex>
                              <!-- /WO 발행 버튼 -->
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                  </v-card>
                  <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <div class="text-xs-center">
          <span v-if="inspectionInfo.chkStatusCd === 'CHK_STATUS_N'">
            <v-btn
              color="success"
              @click="btnSaveClicked" 
              @btnClickedError="btnClickedError"
            >{{$t('button.save')}}</v-btn>
            <y-btn
              type="save"
              :action-url="completeUrl"
              :action-type="requestType"
              :title="$t('button.complete')"
              :is-valid-by-parent="isValid"
              @btnClicked="btnCompleteClicked" 
              @btnClickedError="btnClickedError"
              @checkValidation="checkValidation"
            ></y-btn>
          </span>
          <v-alert
            :value="inspectionInfo.chkStatusCd === 'CHK_STATUS_Y'"
            color="success"
            icon="check_circle"
            outline
          >
            {{$t('message.inspectionComplete')}}
          </v-alert>
          <v-btn
              color="primary"
              @click="backToList" 
            >
            <v-icon>
              list
            </v-icon>
            {{$t('button.list')}}
            </v-btn>
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
import $ from 'jquery'

let transaction = transactionConfig.inspection
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
    saveData: transaction.update.param,
    pk: null,
    requestType: transaction.complete.requestType,
    inspectionInfo: selectConfig.inspection.inspectionInfo.data,
    inspectionCycle: '',
    defaultSaveData: {},  // 초기 저장값(저장 값 초기화 시키기 위해 사용)
    // form 유효성 여부
    isValidForm: true,
    // TODO(중요) : 쓰기 권한 여부이며, 페이지내 컨트롤에 적용됨
    editable: true,
    isValid: false,
    index: 1,
    steps: 1,
    chkResultData: [],
  }),
  watch: {
  },
  computed: {
    completeUrl() {
      return transaction.complete.url + this.pk
    },
    inspectionResult() {
      return this.$t('title.pass') + ' : ' + this.inspectionInfo.okCount + '  ' + this.$t('title.fail') + ' : ' + this.inspectionInfo.failCount
    }
  },
  mounted () {
    // TODO : vue router로 전달된 값이 있으면 별도로 처리한다.
    // 참고 : @/router/path.js의 props 속성에서 설정된 방식으로 처리됨
    if (this.$attrs.query) {
      this.pk = this.$attrs.query
      this.requestType = transaction.update.requestType // post
      this.saveData = transaction.update.param
      this.onSearch(this.pk)
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
      window.getApp.$emit('APP_REQUEST_ERROR', this.$t('error.requestError'));
    },
    btnSaveClicked() {
      var totalTransactionCount = 0;  // 전체 트랜젝션 발생 개수
      var saveSuccessCount = 0; // 성공한 트랜젝션 개수
      var saveFailedCount = 0;  // 실패한 트랜젝션 개수
      totalTransactionCount = this.inspectionInfo.chkRsltPks.length;
      $.each(this.inspectionInfo.chkRsltPks, (_i, _key) => {
        var items = this.saveData.equipChkItems.filter((_item) => {
          return _key === _item.chkRsltPk
        });

        if (items.length > 0) {
          this.$ajax.url = transactionConfig.inspection.update.url + _key
          this.$ajax.param = {equipChkItems: items}
          var self = this
          this.$ajax.requestPut(() => {
            saveSuccessCount++
            // 저장 결과 메시지 표시(마지막 한번만 표시)
            if (totalTransactionCount === saveSuccessCount + saveFailedCount) {
              if (saveFailedCount > 0) window.getApp.$emit('APP_REQUEST_ERROR', this.$t('error.requestError'));
              else window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'));
            }
          }, () => {
            saveFailedCount++
            // 저장 결과 메시지 표시(마지막 한번만 표시)
            if (totalTransactionCount === saveSuccessCount + saveFailedCount) window.getApp.$emit('APP_REQUEST_ERROR', this.$t('error.requestError'));
          })
        }
      }) 

      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      // window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
    },
    btnCompleteClicked(_result) {
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'));
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation() {
      // this.$validator.validateAll().then((_result) => {
      //   this.isValid = _result
      //   // TODO : 전역 성공 메시지 처리
      //   // 이벤트는 ./event.js 파일에 선언되어 있음
      //   window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'))
      // }).catch(() => {
      //   this.isValid = false
      // });
      this.isValid = true
    },
    // 단일 WO 검색
    onSearch(_pk) {
      this.$ajax.url = selectConfig.inspection.inspectionInfo.url + _pk
      this.$ajax.requestGet((_result) => {
        this.inspectionInfo = _result
        this.steps += _result.chkRsltPks.length
        this.chkItemCount = _result.chkRsltPks.length
        this.getCheckListData(_result.chkRsltPks)
      })
    },
    getCheckListData(_chkRsltPks) {
      var url = selectConfig.inspection.inspectionCheckResultList.url
      var self = this
      self.saveData.equipChkItems = []
      for (var key in _chkRsltPks) {
        this.$ajax.url = url + _chkRsltPks[key]
        this.$ajax.requestGet((data) => {
          var isPass = true
          $.each(data.equipChkItemRslts, function (_i, _item) {
            var item = {
              chkRsltPk: _item.chkRsltPk,
              equipChkItem: _item.chkItemPk,
              chkItemRsltDesc: !_item.chkItemRsltDesc ? '' : _item.chkItemRsltDesc,
              okYn: _item.okYn,
              isValid: !_item.okYn || _item.okYn === 'Y'
            }
            if (_item.okYn === 'N') isPass =  false
            self.saveData.equipChkItems.push(item)
          })
          data.isPass = isPass
          data.isIssueWo = false
          this.chkResultData.push(data)
        })
      }
    },
    /**
     * 점검결과에 따라 saveData의 값을 지정하고,
     * 설비의 이상유무 icon 표시를 변경
     */
    changedOkYn(_saveData, _index, _chkResult) {
      // saveData의 값 동기화
      _saveData[_index].okYn = _saveData[_index].isValid ? 'Y' : 'N'
      // 점검값이 '실패'일 경우 : icon과 배경색상 변경
      if (!_saveData[_index].isValid) _chkResult.isPass = false
      else {
        // 점검값이 '이상없음'일 경우 : 전체 정보를 확인하여  icon과 배경색상 변경
        var failedFilter = _saveData.filter((__item) => {
          return _chkResult.chkRsltPk === __item.chkRsltPk &&  !__item.isValid
        })
        _chkResult.isPass = failedFilter.length <= 0
      }
    },
    /**
     * 점검완료 후 이상 설비에 대해 WO 발행
     */
    issueWO(_item) {
      if (!_item) return
      this.$ajax.url = transaction.issueWo.insert.url + _item.chkRsltPk;
      let self = this
      this.$ajax.requestPost((_data) => {
        self.chkRsltData = self.getCheckListData(self.inspectionInfo.chkRsltPks)
        self.isIssueWo = true
        return
      })
    },
    backToList() {
      this.$comm.movePage(this.$router, '/inspectionList')
    }
  }
};
</script>

<style>
  .border {
    border: 1px solid #BFBFBF;
  }
</style>
