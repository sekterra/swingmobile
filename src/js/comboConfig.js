/**
 * select 검색 정보
 */
var comboConfig = {
  mtrlClass: {
    defaultTitle: '설비등급',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/MTRL_CLASS',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  mtrlLoc: {
    defaultTitle: '자재위치',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/MTRL_LOC',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  amtUnit: {
    defaultTitle: '단위',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/AMT_UNIT',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  supplier: {
    defaultTitle: '공급자',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'material/supplier/search',   // 검색 url
    itemKey: 'supplierPk',
    itemName: 'supplierNm'
  },
  equipStatus: {
    defaultTitle: '설비상태',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/EQUIP_STATUS',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  equipType: {
    defaultTitle: '설비종류',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'equipment/equiptype/search',   // 검색 url
    itemKey: 'equipTypePk',
    itemName: 'equipTypeNm'
  },
  equipLoc: {
    defaultTitle: '위치',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'equipment/location/?useYn=true&page=0&size=0',   // 검색 url
    itemKey: 'locPk',
    itemName: 'locNm'
  },
  equipImptRnk: {
    defaultTitle: '설비 중요도',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'equipment/importrank/search',   // 검색 url
    itemKey: 'importRankPk',
    itemName: 'importRankCd'
  },
  costCnt: {
    defaultTitle: 'Cost Center',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/COST_CENTER',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  depart: {
    defaultTitle: '부서',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'member/dept/search',   // 검색 url
    itemKey: 'deptPk',
    itemName: 'deptNm'
  },
  pmType: {
    defaultTitle: '예방정비 유형',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/PM_TYPE',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  cycleType: {
    defaultTitle: '주기유형',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/CYCLE_TYPE',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  phyInv: {
    defaultTitle: '실사상태',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/PHY_INV',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  user: {
    defaultTitle: '사용자',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'member/user/search'   // 검색 url
  },
  maintType: {
    defaultTitle: '보전유형',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/MAINT_TYPE',   // 검색 url
    itemKey: 'codeCd',
    itemName: 'codeNm'
  },
  project: {
    defaultTitle: '프로젝트',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'workorder/project/search',   // 검색 url
    itemKey: 'prjPk',
    itemName: 'prjNm'
  },
  woProblem: {
    defaultTitle: 'WO현상코드',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/WO_PROBLEM',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  woCause: {
    defaultTitle: 'WO원인코드',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/WO_CAUSE',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  woRemedy: {
    defaultTitle: 'WO조치코드',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/WO_REMEDY',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  exSupplier: {
    defaultTitle: 'WO공급업체',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'workorder/exsupplier/search',   // 검색 url
    itemKey: 'exSupplierPk',
    itemName: 'exSupplierNm'
  },
  employee: {
    defaultTitle: '직원검색',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'member/employee/search',   // 검색 url
    itemKey: 'empPk',
    itemName: 'empNm'
  },
  jobClass: {
    defaultTitle: '직종',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'member/jobclass/search?useYn=true&page=0&size=0',   // 검색 url
    itemKey: 'jobClassPk',
    itemName: 'jobClassNm'
  },
  periodType: {
    defaultTitle: '조달기간',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/PERIOD_TYPE',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  chkStatus: {
    defaultTitle: '점검일정상태',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/CHK_STATUS',   // 검색 url
    itemKey: 'codeCd',
    itemName: 'codeNm'
  },
  woStatus: {
    defaultTitle: 'WO결재상태',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/WO_STATUS',   // 검색 url
    itemKey: 'codeCd',
    itemName: 'codeNm'
  },
  brkdwnHr: {
    defaultTitle: '고장시간(시)',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/HOUR_TYPE',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  brkdwnMin: {
    defaultTitle: '고장시간(분)',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/basecode/basecodegrp/MIN_TYPE',   // 검색 url
    itemKey: 'codePk',
    itemName: 'codeNm'
  },
  langType: {
    defaultTitle: '언어코드',   // 기본 타이틀
    langTitleCode: '',  // 다국어 코드
    url: 'system/i18nlang/',   // 검색 url
    itemKey: 'langType',
    itemName: 'langName'
  }
}

export default comboConfig