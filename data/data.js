var left = [
  { id: '0', type: '充场人员' },
  { id: '1', type: '问卷调查员' },
  { id: '2', type: '派发传单' },
  { id: '3', type: '展会协助' },
  { id: '4', type: '餐饮工' },
  { id: '5', type: '超市店员' },
  { id: '6', type: '话务客服' },
  { id: '7', type: '扫码兼职' },
  { id: '8', type: 'APP推广' },
  { id: '9', type: '地推人员' },
  { id: '10', type: '保洁员' },
  { id: '11', type: '推销员' },
  { id: '12', type: '初中家教' },
  { id: '13', type: '高中家教' },
  { id: '14', type: '超市理货员' },
  { id: '15', type: '送餐员' },
  { id: '16', type: '校园代理' },
  { id: '17', type: '促销导购' },
  { id: '18', type: '服务生' },
  { id: '19', type: '车展模特' },
  { id: '20', type: '礼仪' },
  { id: '21', type: '爵士舞队伍' }
]

var right = [
  { id: '1', type: '充场人员', content: [] },
  { id: '2', type: '问卷调查员', content: [] },
  { id: '3', type: '派发传单', content: [] },
  { id: '4', type: '展会协助', content: [] },
  { id: '5', type: '餐饮工', content: [] },
  { id: '6', type: '超市店员', content: [] },
  { id: '7', type: '话务客服', content: [] },
  { id: '8', type: '扫码兼职', content: [] },
  { id: '9', type: 'APP推广', content: [] },
  { id: '10', type: '地推人员', content: [] },
  { id: '11', type: '保洁员', content: [] },
  { id: '12', type: '推销员', content: [] },
  { id: '13', type: '初中家教', content: [] },
  { id: '14', type: '高中家教', content: [] },
  { id: '15', type: '超市理货员', content: [] },
  { id: '16', type: '送餐员', content: [] },
  { id: '17', type: '校园代理', content: [] },
  { id: '18', type: '促销导购', content: [] },
  { id: '19', type: '服务生', content: [] },
  { id: '20', type: '车展模特', content: [] },
  { id: '21', type: '礼仪', content: [] },
  {
    id: '22', type: '爵士舞队伍', content: [
      { title: '东信广场', img: '../../../images/apply.png', price: '70', need: '2' },
      { title: '台北帮厨', img: '../../../images/educate.png', price: '90', need: '5' },
    ]
  }
]

module.exports = {
  typelist: left,
  clist: right
}