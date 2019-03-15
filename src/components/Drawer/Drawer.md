---
title: Drawer
subtitle: 抽屉

---

支持样式定制,zIndex指定. (不带蒙层,因为带蒙层会把底层页面下拉条干掉,所以不用antd的抽屉)

## API

### Drawer

参数 | 说明 | 类型 | 默认值
----|------|-----|------
visible | 默认不显示抽屉 | boolean | false
curWidth | 调整宽度 | string固定(0,50%,100%) | 0
className | class名称 | string => ''


### DrawerItem 

参数 | 说明 | 类型 | 默认值
----|------|-----|------
className | class名称 | string => ''

除了自定义classname没有其他参数(children肯定是要的),主要是改变下拉条样式(固定2个DrawerItem,每个占height:50%)

### index

参数 | 说明 | 类型 | 默认值
----|------|-----|------

rightArrowClass | 右箭头class | string | ''
