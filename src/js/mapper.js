/**
 * mapper.js
 * 목적 : DB코드 정보와 일반 단어를 연결시켜주는 JSON object
 */

var mapper = {
  EQUIP_STATUS_O: 'running',
  EQUIP_STATUS_B: 'breakdown',
  EQUIP_STATUS_D: 'disposed',
  getMappedValue: (_key) => {
    return typeof mapper[key] === 'undefined' ? null : mapper[key]
  }
}

export default mapper;