function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatArray(datas){
  for(var i=0;i<datas.length;i++){
    datas[i].time=formatTime(new Date(datas[i].time*1000))
  }
}
function formatSingle(datas){
  datas.time=formatTime(new Date(datas.time*1000))
}


module.exports = {
  formatTime: formatTime,
  formatArray:formatArray,
  formatSingle:formatSingle,
}