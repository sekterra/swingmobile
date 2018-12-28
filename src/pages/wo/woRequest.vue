<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap v-scroll="onScroll">
        <v-flex sm12>
          <v-card>
            <v-toolbar color="grey lighten-2" white flat dense cad>
              <v-toolbar-title class="subheading">{{$t('title.requestInformation')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="indigo lighten-3"
                dark
                small
                v-if="editable"
                @click.prevent="openWoPopup"
              >
               {{$t('title.woCopy')}}
              </v-btn>
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
                        prepend-icon="edit"
                        v-validate="'required'"
                        data-vv-name="equipment"
                        clearable
                        readonly
                        :error-messages="errors.collect('equipment')"
                        @click.prevent="openSearchPopup"
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
                        data-vv-name="workTitle"
                        :error-msg="errors.first('workTitle')"
                      >
                      </y-text>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <y-select
                        :label="$t('title.woDepartment')"
                        :editable="editable"
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
                        data-vv-name="rqstDt"
                        :error-msg="errors.first('rqstDt')"
                      >
                      </y-datepicker>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <y-datepicker 
                        :editable="editable"
                        :label="$t('title.woPlanDate') + '*'"
                        name="planStartDt"
                        v-model="saveData.workOrder.planStartDt"
                        default-type="today"
                        child-validate-type="required"
                        v-validate="'required'"
                        data-vv-name="planStartDt"
                        :error-msg="errors.first('planStartDt')"
                      >
                      </y-datepicker>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <y-select
                        :editable="editable"
                        :label="$t('title.maintenanceType') + '*'"
                        name="maintType"
                        item-search-key="maintType"
                        v-model="saveData.workOrder.maintType"
                        v-validate="'required'"
                        data-vv-name="maintType"
                        :error-msg="errors.first('maintType')"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm6 class="py-0" v-if="isBreakdown">
                      <y-datepicker
                        v-if="editable"
                        :editable="true"
                        :label="$t('title.equipmentOfDowndate') + '*'"
                        name="breakdownDate"
                        v-model="breakdownDate" 
                        default-type="today"
                        child-validate-type="required"
                        v-validate="'required'"
                        data-vv-name="breakdownDate"
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
                        data-vv-name="breakdownTime"
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
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm12>
            <v-card>
              <v-toolbar color="grey lighten-3" white flat dense cad>
                <v-toolbar-title class="subheading">{{$t('title.currentEquipmentPic')}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  color="indigo lighten-3"
                  small
                  dark
                  @click.prevent="takePicture"
                >
                {{$t('title.camera')}}
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                  <!-- 이미지 파일 업로드 -->
                  <v-layout>
                    <v-flex xs12>
                      <!-- <v-subheader class="pa-0 mt-3">
                        {{$t('title.woImageFileUpload')}}
                        <v-spacer></v-spacer>
                        <v-progress-circular
                        v-show="pk && isLoadingImage"
                        :size="20"
                        :width="2"
                        color="teal lighten-1"
                        indeterminate
                      ></v-progress-circular>
                        <v-spacer></v-spacer>
                        <v-btn 
                        round
                        color="black" 
                        dark
                        @click.prevent="takePicture"
                      >
                        <v-icon>
                          camera
                        </v-icon>
                      </v-btn>
                      </v-subheader> -->
                      <v-carousel
                        v-if="carouselImageList.length"
                      >
                        <v-carousel-item
                          v-for="(item, i) in carouselImageList"
                          :key="i"
                          :src="item"
                          lazy
                        ></v-carousel-item>
                    </v-carousel>
                    <v-card
                      v-else
                      flat
                      tile 
                      class="d-flex"
                      @click.prevent="takePicture"
                      >
                      <!-- <v-img src="./static/no-image-icon.png"/> -->
                      <img :src="noImage" style="width:100%;"/>
                    </v-card>
                    </v-flex>
                  </v-layout>
                </v-card-text>
          </v-card>
          <v-layout>
            <v-flex xs12>
              <div class="text-xs-center">
                <!-- <y-btn
                  v-if="!pk || saveData.workOrder.workOrderApproval.woStatusCd !== 'WO_STATUS_R'"
                  type="save"
                  :title="$t('button.save')"
                  :action-url="url"
                  :action-type="requestType"
                  :param="saveData"
                  :is-valid-by-parent="isValid"
                  :is-submit="isSubmit"
                  beforeSubmit = "beforeSubmit"
                  @btnClicked="btnSaveClicked" 
                  @btnClickedError="btnClickedError"
                  @checkValidation="checkValidation"
                ></y-btn> -->
                <y-btn
                    v-if="editable"
                    type="save"
                  :title="$t('button.save')"
                  :action-url="url"
                  :action-type="requestType"
                  :param="saveData"
                  :is-submit="isSubmit"
                  beforeSubmit = "beforeSubmit"
                  @btnClicked="btnSaveClicked" 
                  @btnClickedError="btnClickedError"
                  @beforeSubmit="beforeSubmit"
                ></y-btn>
                <y-btn
                  v-if="pk && editable"
                  type="delete"
                  :title="$t('button.woCancel')"
                  :action-url="transactionCancel.url + pk"
                  :action-type="transactionCancel.requestType"
                  :param="woCancel"
                  :is-submit="woCancel.isSubmit"
                  before-submit="getCancelRequest"
                  @btnClicked="btnCancelClicked"
                  @btnClickedError="btnClickedError"
                  @getCancelRequest="getCancelRequest"
                ></y-btn>
                <y-btn
                  v-if="!pk && editable"
                  type="clear"
                  :title="$t('button.clear')"
                  @btnClicked="btnClearClicked" 
                ></y-btn>       
              </div>
            </v-flex>
          </v-layout>
        </v-flex>           
      </v-layout>
      <y-popup 
        :search-item="popupSearchItem"
        :grid-type="popupGridType"
        :is-open-popup="isOpenPopup"
        :event-for-return="eventForReturn"
        :title="popupTitle"
        @closePopup="closePopup"
        @bindEquipmentData="bindEquipmentData"
        @bindWoData="bindWoData"
      >
      </y-popup>
      <y-dialog
        v-if="pk && editable"
        :title="$t('title.cancelReason')"
        :is-open-dialog="isOpenDialog"
        type="confirm"
        @dialogResult="dialogResult"
        >
        <y-textarea
          :label="$t('title.cancelReason')"
          :editable="editable"
          :counter="1000"
          :autofocus="true"
          slot="body"
          name="cancelReason"
          v-model="woCancel.cancelReason"
          :error-msg="errors.first('cancelReason')"
        />
      </y-dialog>
    </v-container>
  </div>
</template>

<script>
import transactionConfig from '@/js/transactionConfig.js'
import selectConfig from '@/js/selectConfig.js'
import jwt from '@/js/jwtToken.js'
import config from '@/js/config.js'
import $ from 'jquery'
import ajaxFile from '@/js/ajaxFile'
import { setTimeout } from 'timers';
import noImage from '@/static/no-image-icon.png';

let transaction = transactionConfig.wo.request
export default {
  $_veeValidate: {
    validator: 'new'
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
    popupGridType: 'radio',
    // form 유효성 여부
    isValidForm: true,
    popupSearchItem: '',
    // TODO(중요) : 쓰기 권한 여부이며, 페이지내 컨트롤에 적용됨
    // editable: true,
    isSubmit: false,
    breakdownDate: null,
    breakdownTime: null,
    imagePath: '',
    carouselIndex: 0,
    carouselImageList: [],  // 카메라 이미지 또는 기존 등록된 이미지 미리 보기
    upload: {
      imageList: [],
      loaded: 0,
      buffer: 0,
      uploadedImagesCount: 0  
    },
    isLoadingImage:  false, // 이미지 로딩 표시여부
    attachType: 'WO_PRE_PHOTO',
    // isShowCarousel: false,
    cameraImageList: [],  // 카메라 이미지
    pk: null,  // TODO : 현재 WO PK
    eventForReturn: '', // TODO : 팝업 창의 결과를 받는 함수명
    woCancel: {
      cancelReason: '',
      isSubmit: false
    },
    transactionCancel: transactionConfig.wo.cancel,
    popupTitle: '',
    noImage: noImage,
    woStatusCd: 'WO_STATUS_R', // wo 상태 코드(기본값 : 요청)
    editableByAuth: false,  // 메뉴별 수정 권한 여부(가장 강력한 권한)
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
    },
    editable() {
      return (this.editableByAuth && this.woStatusCd !== 'WO_STATUS_X' && this.woStatusCd !== 'WO_STATUS_C')
    }
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
    this.$nextTick(() => {
      window.getApp.$emit('REQUEST_MENU')
    })
    window.getApp.$on('MENU_EDITABLE_SET', this.setThisMenuEditable)
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
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    window.getApp.$off('APP_IMAGE_UPLOAD_COMPLETE')
    window.getApp.$off('MENU_EDITABLE_SET', this.setThisMenuEditable)
 },
  methods: {
    /**
     * 현재 메뉴의 쓰기 속성을 메뉴 권한에서 가져온다.
     */
    setThisMenuEditable(_menus) {
      var filter = this.$_.filter(_menus, (_item) => {
        return this.$route.name === _item.name
      })
      if (filter.length > 0) this.editableByAuth = filter[0].editable;
    },
    // 버그 있음 : 수정 필요
    btnClearClicked () {
      this.saveData = this.$comm.clone(this.defaultSaveData);
      this.$validator.reset();
    },
    btnClickedError(_error) {
      // console.log('error:' + JSON.stringify(_error))
      this.isSubmit = false
    },
    beforeSubmit() {
      this.checkValidation()
    },
    btnSaveClicked(_result) {
      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      if (!this.isSubmit) return
      // window.alert(JSON.stringify(_result))
      this.uploadImages(_result.returnResult.workOrderPk)
      this.saveData = this.$comm.clone(this.defaultSaveData)
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woList')
    },
    btnCancelClicked() {
      // this.isOpenDialog = true
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woList')
     },
    dialogResult(_btnResult) {
      if (_btnResult) {
        if (!this.woCancel.cancelReason) {
          window.getApp.$emit('APP_REQUEST_ERROR', this.$t('message.cancelReason'))
          return
        } else {
          this.woCancel.isSubmit  = true
        }
      }
      // TODO : 반드시 추가할 것(추가하지 않으면 팝업창이 다시 활성화 되지 않음)
      this.isOpenDialog = false
    },
    openSearchPopup() {
      if (!this.editable) return;
      this.popupTitle = this.$t('title.equipmentSearchPopup')
      this.popupSearchItem = 'equipment'
      this.popupGridType = 'radio'
      this.isOpenPopup = true
      this.eventForReturn = 'bindEquipmentData'
      console.log('openSearchPopup');
    },
    equipmentNameChanged() {
      if (this.editable) return;
      this.equipment.equipNm = null
      this.equipment.equipPk = null
    },
    openWoPopup() {
      this.popupTitle=this.$t('title.woSearch')
      this.popupSearchItem = 'wo'
      this.popupGridType = 'radio'
      this.isOpenPopup = true
      this.eventForReturn = 'bindWoData'
    },
    closePopup() {
      this.popupSearchItem = ''
      this.isOpenPopup = false
      this.popupGridType = ''
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation() {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'))
      }).catch(() => {
        this.isSubmit = false
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
        console.log(JSON.stringify(_result));
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
      // this.isShowCarousel = false;
      this.upload.imageList.push(imagePath)
      this.carouselImageList.unshift(imagePath)
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
        // this.isShowCarousel = true
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
      // window.alert('APP_IMAGE_UPLOAD Request')
      window.getApp.$emit('APP_IMAGE_UPLOAD', uploadInfo);
    },
    completeImageUpload() {
      // window.getApp.$emit('APP_REQUEST_SUCCESS', this.upload.uploadedImagesCount + ' files');
      this.upload.uploadedImagesCount = 0;
    },
    getImagePks(_pk) {
      this.$ajax.url = selectConfig.img.fileList.url
      this.$ajax.param = this.$comm.clone(selectConfig.img.fileList.searchData)
      this.$ajax.param.attachType = this.attachType
      this.$ajax.param.attachPk = _pk
      let self = this
      // this.isShowCarousel = false
      this.isLoadingImage = true;
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          self.getImageFile(_item.filePk)
        })
        // self.carouselImageList = self.cameraImageList
        // console.log('self.carouselImageList:' + JSON.stringify(self.carouselImageList))
        self.$nextTick(() => {
          // self.isShowCarousel = self.carouselImageList.length > 0          
          self.carouselIndex = 0
          // self.isLoadingImage = false
        })
      })
    },
    getImageFile(_filePk) {
      ajaxFile.url = selectConfig.img.imageDown.url + '?filePk=' + _filePk     
      let self = this
      ajaxFile.requestFileGet((_result) => {
        self.$nextTick(() => {
          self.cameraImageList.unshift(window.URL.createObjectURL(_result))
          self.carouselImageList.unshift(window.URL.createObjectURL(_result))
          self.isLoadingImage = false
        })
      })
    },
    getCancelRequest() {
      this.isOpenDialog = true;
    },
    onScroll(e) {
      // TODO : text box에서 활성화된 키보드를 스크롤 변경시 숨김
      // window.getApp.$emit('APP_KEYBOARD_HIDE')
    }
  }
};
</script>