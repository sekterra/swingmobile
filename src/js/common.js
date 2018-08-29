var comm = {
  baseDeviceSize : 600,
  getFixedSizeByDevice: null
};

/**
 * function name : getDeviceRatio
 * remark : device 크기에 따라서 크기를 동적으로 조정
 * parameters
 *  _baseSize : xs 사이즈(600px) 기준 크기
 *  _breakpoint: $vuetify.breakpoint 개체
 */
comm.getFixedSizeByDevice = function (_baseSize, _breakpoint) {
  if (_breakpoint.xs) return _baseSize;
  else if(_breakpoint.smAndUp) {
    var ratio = window.screen.width / comm.baseDeviceSize;
    return Math.floor(_baseSize * ratio);
  }
}

export default comm;