/**
 * 업무용 데이터 저장정보를 가지고 있는 js
 */

 let transactionConfig = {
  wo: {
    // WO 요청 관련
    request: {
      insert: {
        url: 'workorder/request/',
        param: {
          workOrder: {
            workTitle: null,
            workText: null,
            equipment: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            maintType: null,
            project: null,
            problem: null,
            cause: null,
            breakdownDt: null,
            workOrderApproval: {
              rqstDt: null
            }
          }
        },
        requestType: 'POST'
      },
      update: {
        url: 'workorder/request/',
        param: {
          workOrder: {
            workOrderPk: null,
            workTitle: null,
            workText: null,
            equipment: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            maintType: null,
            project: null,
            problem: null,
            cause: null,
            breakdownDt: null,
            workOrderApproval: {
              rqstDt: null
            }
          }
        },
        requestType: 'PUT'
      },
      delete: {
        url: '',
        param: null
      }
    },
    woCreate: {
      insert: {
        url: 'workorder/create/',
        param: {
          workOrder: {
            equipment: null,
            workTitle: null,
            workText: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            startDt: null, // 요청과 차이점
            endDt: null, // 요청과 차이점
            maintType: null,
            problem: null,
            cause: null,
            project: null,
            breakdownDt: null
          },
          workOrderSuppliers: [],
          woLabors: []
        },
        requestType: 'POST'
      },
    }
  },
  inspection: {
    update: {
      url: 'inspection/result/',
      param: {
        equipChkItems: []
      },
      requestType: 'PUT'
    },
    complete: {
      url: 'inspection/result/finish/',
      param: null,
      requestType: 'PUT'
    },
    issueWo: {
      insert: {
        url: 'inspection/makewo/',
        param: null,
        requestType: 'POST'
      }
    }
  }
 }

 export default transactionConfig;