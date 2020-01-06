function formatTime(date,type) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if(type==0){
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute,second].map(formatNumber).join(':')
  }else if(type==1){
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  }else if(type==2){
    return [year, month, day].map(formatNumber).join('-') 
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatArray(datas,type){
  for(var i=0;i<datas.length;i++){
    datas[i].time=formatTime(new Date(datas[i].time*1000),type)
  }
}
function formatSingle(datas,type){
  datas.time=formatTime(new Date(datas.time*1000),type)
  datas.born = formatTime(new Date(datas.born * 1000), type)
  datas.wtime1 = formatTime(new Date(datas.wtime1 * 1000), type)
}


module.exports = {
  formatTime: formatTime,
  formatArray:formatArray,
  formatSingle:formatSingle,
}