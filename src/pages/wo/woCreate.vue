<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap v-scroll="onScroll">
        <v-flex sm12>
          <v-card>
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.woCreate')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-icon
                  slot="activator"
                  color="white"
                  @click="openWoPopup"
                >
                file_copy
                </v-icon>
                <span>Tooltip</span>
              </v-tooltip>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-form v-model="isValidForm">
                  <v-layout row wrap fill-height>
                    <v-flex sm6 class="py-0">
                      <v-text-field
                        :label="$t('title.woNo')"
                        v-model="saveData.workOrder.workOrderPk"
                        :placeholder="$t('message.woNo')"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <v-text-field
                        :label="$t('title.equipmentName') + '*'"
                        name="equipment"
                        v-model="equipment.equipNm"
                        :placeholder="$t('message.equipmentName')"
                        append-outer-icon="open_in_browser"
                        v-validate="'required'"
                        data-vv-name="equipment"
                        clearable
                        readonly
                        :error-messages="errors.collect('equipment')"
                        @click="openSearchPopup"
                        @click:append-outer="openSearchPopup"
                        :clear-icon-cb="equipmentNameChanged"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="py-0">
                      <y-equipment-card 
                        v-if="equipment.equipPk"
                        :pk="equipment.equipPk"
                      >
                      </y-equipment-card>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 작업 제목 -->
                      <y-text
                        :editable="editable"
                        :label="$t('title.woTitle') + '*'"
                        name="workTitle"
                        :counter="200"
                        :maxlength="200"
                        v-model="saveData.workOrder.workTitle"
                        v-validate="'required'"
                        :error-msg="errors.first('workTitle')"
                      >
                      </y-text>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <y-select
                        :label="$t('title.woDepartment')"
                        item-search-key="depart"
                        name="deptPk"
                        v-model="saveData.workOrder.dept"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm12 class="py-0">
                      <y-textarea
                        :editable="editable"
                        :label="$t('title.woDescription')"
                        :counter="2000"
                        :maxlength="2000"
                        name="workText"
                        :error-msg="errors.first('workText')"
                        v-model="saveData.workOrder.workText"
                      >
                      </y-textarea>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <y-datepicker 
                        :editable="editable"
                        :label="$t('title.woRequestDate') + '*'"
                        name="rqstDt"
                        v-model="saveData.workOrder.workOrderApproval.rqstDt"
                        default-type="today"
                        v-validate="'required'"
                        :error-msg="errors.first('rqstDt')"
                      >
                      </y-datepicker>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 작업계획일 -->
                      <y-durationpicker
                      :editable="editable"
                      :label="$t('title.woPlanDate')"
                      name="woPlanDate"
                      default-type="today"
                      v-validate="'required'"
                      v-model="durationpicker"
                      :error-msg="errors.first('woPlanDate')"
                      >
                      </y-durationpicker>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 작업기간 -->
                      <y-durationpicker
                      :editable="editable"
                      :label="$t('title.workDate')"
                      name="workDate"
                      default-type="today"
                      v-validate="'required'"
                      v-model="durationpicker"
                      :error-msg="errors.first('workDate')"
                      >
                      </y-durationpicker>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 보전유형 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.maintenanceType') + '*'"
                        name="maintType"
                        item-search-key="maintType"
                        v-model="saveData.workOrder.maintType"
                        v-validate="'required'"
                        :error-msg="errors.first('maintType')"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm6 class="py-0" v-if="isBreakdown">
                      <!-- 고장일시 -->
                      <y-datepicker
                        v-if="editable"
                        :editable="true"
                        :label="$t('title.equipmentOfDowndate') + '*'"
                        name="breakdownDate"
                        v-model="breakdownDate" 
                        default-type="today"
                        child-validate-type="required"
                        v-validate="'required'"
                        :error-msg="errors.first('breakdownDate')"
                      >
                      </y-datepicker>
                      <y-timepicker
                        v-if="editable"
                        :editable="true"
                        :label="$t('title.equipmentOfDowntime') + '*'"
                        name="breakdownTime"
                        v-model="breakdownTime"
                        default-type="current"
                        child-validate-type="required"
                        v-validate="'required'"
                        :error-msg="errors.first('breakdownTime')"
                      >
                      </y-timepicker>
                      <v-text-field
                        v-else
                        :value="breakdownDate + ' ' + breakdownTime"
                        :label="$t('title.equipmentOfDowndatetime')"
                        readonly
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 현상코드 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.conditionType')"
                        name="problemPk"
                        item-search-key="woProblem"
                        v-model="saveData.workOrder.problem"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 원인코드 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.causeType')"
                        name="causePk"
                        item-search-key="woCause"
                        v-model="saveData.workOrder.cause"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 프로젝트 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.project')"
                        name="prjPk"
                        item-search-key="project"
                        v-model="saveData.workOrder.project"
                      >
                      </y-select>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap fill-height>
                    <v-flex xs12>
                      <y-expantion-grid></y-expantion-grid>
                    </v-flex>
                  </v-layout>
                  <!-- 이미지 파일 업로드 -->
                  <v-layout>
                    <v-flex xs12>
                      <v-subheader class="pa-0 mt-3">
                        {{$t('title.woImageFileUpload')}}
                        <v-spacer></v-spacer>
                        <v-btn 
                        round
                        color="black" 
                        dark
                        @click="takePicture"
                      >
                        <v-icon>
                          camera
                        </v-icon>
                      </v-btn>
                      </v-subheader>
                      <v-carousel
                        v-if="isShowCarousel"
                      >
                        <v-carousel-item
                          v-for="(item, i) in carouseImageList"
                          :key="i"
                          :src="item"
                          lazy
                        ></v-carousel-item>
                    </v-carousel>
                    <v-card
                      v-else
                      tile 
                      class="d-flex">
                      <v-img
                        src="static/no-image-icon.png"
                      >
                      </v-img>
                    </v-card>
                    </v-flex>
                  </v-layout>
                  <!-- <v-layout
                    align-center 
                    justify-center 
                    row
                    fill-height
                  >
                      <v-btn 
                        round
                        color="black" 
                        dark
                        @click="takePicture"
                      >
                        <v-icon>
                          camera
                        </v-icon>
                      </v-btn>
                  </v-layout> -->
                  <!-- <v-flex xs6>
                    <div>{{upload.uploadedImagesCount}}/{{upload.imageList.length}} ({{upload.loaded}})bytes</div>
                    </v-flex> -->
                  <!-- /이미지 파일 업로드 -->
              </v-form>
                <v-flex xs12>
                  <div class="text-xs-center">
                    <y-btn
                      v-if="!pk || saveData.workOrder.workOrderApproval.woStatusCd !== 'WO_STATUS_R'"
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
                      v-if="pk"
                      type="delete"
                      :title="$t('button.delete')"
                      @btnClicked="btnDeleteClicked" 
                      @btnClickedError="btnClickedError"
                    ></y-btn>
                    <y-btn
                      v-if="!pk"
                      type="clear"
                      :title="$t('button.clear')"
                      @btnClicked="btnClearClicked" 
                    ></y-btn>
                    
                    <!-- <y-btn
                      type="cancel"
                      :title="$t('button.cancel')"
                      @btnClicked="btnCancelClicked" 
                      @btnClickedError="btnClickedError"
                    ></y-btn> -->
                  </div>
                  </v-flex>
            </v-card-text>     
          </v-card>
        </v-flex>           
      </v-layout>
      <!-- <y-dialog 
        title="test"
        message="이것은 다이얼로그 테스트입니다."
        :is-open-dialog="isOpenDialog"
        type="info"
        @dialogResult="dialogResult"
        >
      </y-dialog> -->
      <y-popup 
        :search-item="popupSearchItem"
        :search-type="popupSearchType"
        :is-open-popup="isOpenPopup"
        :event-for-return="eventForReturn"
        @closePopup="closePopup"
        @bindEquipmentData="bindEquipmentData"
        @bindWoData="bindWoData"
      >
      </y-popup>
    </v-container>
    <!-- <div>
      <v-btn v-on:click="takePicture">{{$t("takePhoto")}}</v-btn>
    </div> -->
  </div>
</template>

<script>
import transactionConfig from '@/js/transactionConfig.js'
import selectConfig from '@/js/selectConfig.js'
import jwt from '@/js/jwtToken.js'
import config from '@/js/config.js'
import $ from 'jquery'
import ajaxFile from '@/js/ajaxFile'

let transaction = transactionConfig.wo.request
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
  },
  data: () => (
  {
    // wo 저장
    saveData: transaction.insert.param,
    url: transaction.insert.url,
    requestType: transaction.insert.requestType,
    equipment: {
      equipPk: null,
      equipNm: null,
      equipStatusCd: null,
      warrantyDt: null,
    },
    defaultSaveData: {},  // 초기 저장값(저장 값 초기화 시키기 위해 사용)
    // 알림 메시지
    isOpenDialog: false,
    // 검색용 팝업
    isOpenPopup: false,
    // 팝업 검색 결과 타입 설정(single: radio, multi: checkbox)
    popupSearchType: 'radio',
    // form 유효성 여부
    isValidForm: true,
    popupSearchItem: '',
    // TODO(중요) : 쓰기 권한 여부이며, 페이지내 컨트롤에 적용됨
    editable: true,
    isValid: false,
    breakdownDate: null,
    breakdownTime: null,
    imagePath: '',
    carouselIndex: 0,
    carouseImageList: [],
    upload: {
      imageList: [],
      loaded: 0,
      buffer: 0,
      uploadedImagesCount: 0  
    },
    attachType: 'WO_PRE_PHOTO',
    isShowCarousel: false,
    tmpImageList: [],
    pk: null,  // TODO : 현재 WO PK
    eventForReturn: '', // TODO : 팝업 창의 결과를 받는 함수명
    durationpicker: null
  }),
  watch: {
    'saveData.workOrder.planStartDt': function () {
      this.saveData.workOrder.planEndDt = this.saveData.workOrder.planStartDt
    },
    breakdownDate() {
      this.mappedBreakdownDt()
    },
    breakdownTime() {
      this.mappedBreakdownDt()
    },
    uploadedImagesCount() {
      if (this.upload.imageList.length && this.upload.uploadedImagesCount === this.upload.imageList.length) {
        this.completeImageUpload()
      }
    }
  },
  computed: {
    isBreakdown() {
      var isBreak = this.saveData.workOrder.maintType === 'MAINT_TYPE_BM'
      if (!isBreak) {
        this.saveData.workOrder.breakdownDt = null
        this.breakdownDate = null
        this.breakdownTime = null
      }
      return isBreak
    }
  },
  mounted () {
    // TODO : vue router로 전달된 값이 있으면 별도로 처리한다.
    // 참고 : @/router/path.js의 props 속성에서 설정된 방식으로 처리됨
    if (this.$attrs.query) {
      var pk = this.$attrs.query
      this.pk = pk
      this.url = transaction.update.url + '/' + pk
      this.requestType = transaction.update.requestType // post
      this.saveData = transaction.update.param
      this.onSearch(pk)
      this.getImagePks(pk)
    }
    this.defaultSaveData = this.$comm.clone(this.saveData)

    // 업로드가 완료되면 업로드 이미지 정보 초기화
    window.getApp.$on('APP_IMAGE_UPLOAD_COMPLETE', (_upload) => {
      this.upload.imageList = []
    });
  },  
  methods: {
    // 버그 있음 : 수정 필요
    btnClearClicked () {
      this.saveData = this.$comm.clone(this.defaultSaveData);
      this.$validator.reset();

      /** 사용자 입력 요청과 처리 예제 */
      // window.getApp.$emit('APP_CONFIRM', '테스트 하시겠습니까?');
      // window.getApp.$on('APP_CONFIRM_REPLY', (_reply) => {
      //   if (_reply) window.getApp.$emit('APP_REQUEST_SUCCESS', 'YES')
      //   else window.getApp.$emit('APP_REQUEST_ERROR', 'NO')
      // })
    },
    btnClickedError(_error) {
      // console.log('error:' + JSON.stringify(_error))
    },
    btnSaveClicked(_result) {
      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      if (!this.isValid) return
      // window.alert(JSON.stringify(_result))
      this.uploadImages(_result.returnResult.workOrderPk)
      this.saveData = this.$comm.clone(this.defaultSaveData)
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woList')
    },
    btnDeleteClicked(_result) {
    },
    btnCancelClicked() {
      this.isOpenDialog = true
    },
    dialogResult() {
      // TODO : 반드시 추가할 것(추가하지 않으면 팝업창이 다시 활성화 되지 않음)
      this.isOpenDialog = false
    },
    openSearchPopup() {
      this.popupSearchItem = 'equipment'
      this.popupSearchType = 'radio'
      this.isOpenPopup = true
      this.eventForReturn = 'bindEquipmentData'
    },
    equipmentNameChanged() {
      this.equipment.equipNm = null
      this.equipment.equipPk = null
    },
    openWoPopup() {
      this.popupSearchItem = 'wo'
      this.popupSearchType = 'radio'
      this.isOpenPopup = true
      this.eventForReturn = 'bindWoData'
    },
    closePopup() {
      this.popupSearchItem = ''
      this.isOpenPopup = false
      this.popupSearchType = ''
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation() {
      this.$validator.validateAll().then((_result) => {
        this.isValid = _result
        console.log('_result:' + JSON.stringify(_result))
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isValid) window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'))
      }).catch(() => {
        this.isValid = false
      });
    },
    /**
     * Event Bus로 정보 수신(datatable > woList > popup > woCreate)
     *  _items : array 형식으로 전달됨
     */
    bindEquipmentData(_items) {
      if (_items.length <= 0) return
      var equipment = _items[0]
      if (equipment) {
        this.saveData.workOrder.equipment = equipment.equipPk
        this.equipment.equipPk = equipment.equipPk
        this.equipment.equipNm = '[' + equipment.equipCd + '] ' + equipment.equipNm
        this.equipment.equipStatusCd = equipment.equipStatusCd
        this.equipment.warrantyDt = equipment.warrantyDt

        if (equipment.equipStatusCd === 'EQUIP_STATUS_B') {
          // comm.alert('해당설비는 고장 상태입니다.')
        }
        // 팝업에서 전달된 값에 대한 유효성 재검사
        this.$validator.validate('equipment', this.equipment.equipNm)
      }
      this.isOpenPopup = false
      this.$forceUpdate()
    },
    bindWoData(_items) {
      this.isOpenPopup = false
      if (_items.length <= 0) return
      this.onSearch(_items[0].workOrderPk, true)
    },
    // 단일 WO 검색
    onSearch(_pk, _isWorkCopy) {
      this.$ajax.url = 'workorder/request/' + _pk
      this.$ajax.requestGet((_result) => {
        this.mappedWoData(_result, _isWorkCopy)
      })
    },
    /**
     * WO의 조회된 데이터와 저장하는 데이터를 mapping 하는 함수
     */
    mappedWoData(_woData, _isWorkCopy) {
      var workOrder = {}
      for (var key in this.saveData.workOrder) {
        if (_woData.hasOwnProperty(key)) {
          if (!_isWorkCopy) workOrder[key] = _woData[key]
          else if (_isWorkCopy) {
            if (key !== 'planStartDt') workOrder[key] = _woData[key]
            else workOrder[key] = this.$comm.getToday()
          }
        }
      }
      this.equipment.equipPk = _woData.equipPk
      this.equipment.equipNm = '[' + _woData.equipCd + '] ' + _woData.equipNm
      // workOrder.workOrderPk = _woData.workOrderPk
      workOrder.equipment = _woData.equipPk
      workOrder.dept = _woData.deptPk
      workOrder.maintType = _woData.maintTypeCd
      workOrder.project = _woData.prjPk
      workOrder.problem = _woData.problemPk
      workOrder.cause = _woData.causePk
      workOrder.workOrderApproval = {}
      if (_isWorkCopy) {
        workOrder.workOrderApproval.rqstDt =  this.$comm.getToday()
        workOrder.workOrderApproval.rqstUser = window.getApp.getUserInfo().userPk
      } else {
        workOrder.workOrderApproval.rqstDt = _woData.workOrderApproval.rqstDt
        workOrder.workOrderApproval.rqstUser = _woData.workOrderApproval.rqstUserPk
      }

      if (workOrder.breakdownDt) {
        var tmpDate = workOrder.breakdownDt.substring(0, 8)
        var tmpTime = workOrder.breakdownDt.substring(8, workOrder.breakdownDt.length)
        var date = this.$comm.moment(tmpDate)
        var time = this.$comm.moment(tmpTime)
        this.breakdownDate = date.format('L')
        this.breakdownTime = time.format('HH:mm')
        this.$forceUpdate()
      }
      
      this.$set(this.saveData, 'workOrder', workOrder)
      // 팝업에서 전달된 값에 대한 유효성 재검사
      this.$validator.validate('equipment', this.equipment.equipNm)
    },
    mappedBreakdownDt() {
      if (this.breakdownDate && this.breakdownTime) {
        var datetime = this.breakdownDate + ' ' + this.breakdownTime
        this.saveData.workOrder.breakdownDt = this.$comm.moment(datetime).format('YYYYMMDDHHmm')
      } else this.saveData.workOrder.breakdownDt = null
    },
    // Use the camera plugin to capture image
    takePicture() {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {
          // destinationType: Camera.DestinationType.DATA_URL
          quality: 50,
          mediaType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          saveToPhotoAlbum: true
        });
      }else{
        // If the navigator.camera is not available display generic error to the user.
        window.getApp.$emit('APP_REQUEST_ERROR', $t('error.noCamera'));
      }
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture(imagePath){
      this.imagePath = imagePath;
      this.isShowCarousel = false;
      this.upload.imageList.push(imagePath)
      this.carouseImageList.unshift(imagePath)
      // TODO : 참고 소스
      // try {
      //   // 사진이미지 local 저장
      //   window.cordova.plugins.imagesaver.saveImageToGallery(imagePath, (_result) => {
      //     window.getApp.$emit('APP_REQUEST_SUCCESS', JSON.stringify(_result));
      //   }, (_error) => {
      //     window.getApp.$emit('APP_REQUEST_ERROR', JSON.stringify(_error));
      //   });
      // } catch(e) {
      //   window.getApp.$emit('APP_REQUEST_SUCCESS', 'error:' + e.message);
      // }
      this.$nextTick(() => {
        this.isShowCarousel = true
      })
    },
    error(_msg){
      window.getApp.$emit('APP_REQUEST_ERROR', _msg);
    },
    uploadImages(_pk) {
      if (this.upload.imageList.length <= 0) return
      var uploadInfo = {
        pk: _pk,
        attachType: this.attachType,
        fileList: this.upload.imageList
      }
      window.getApp.$emit('APP_IMAGE_UPLOAD', uploadInfo);
    },
    completeImageUpload() {
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.upload.uploadedImagesCount + ' files');
      this.upload.uploadedImagesCount = 0;
    },
    getImagePks(_pk) {
      this.$ajax.url = selectConfig.img.fileList.url
      this.$ajax.param = this.$comm.clone(selectConfig.img.fileList.searchData)
      this.$ajax.param.attachType = this.attachType
      this.$ajax.param.attachPk = _pk
      let self = this
      this.isShowCarousel = false
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          self.getImageFile(_item.filePk)
        })
        self.carouseImageList = self.tmpImageList
        self.$nextTick(() => {
          self.isShowCarousel = true
          self.carouselIndex = 0
        })
      })
    },
    getImageFile(_filePk) {
      ajaxFile.url = selectConfig.img.imageDown.url + '?filePk=' + _filePk     
      let self = this
      ajaxFile.requestFileGet((_result) => {
        self.$nextTick(() => {
          self.tmpImageList.unshift(window.URL.createObjectURL(_result))
        })   
      })
    },
    onScroll(e) {
      // TODO : text box에서 활성화된 키보드를 스크롤 변경시 숨김
      window.getApp.$emit('APP_KEYBOARD_HIDE')
    }
  }
};
</script>