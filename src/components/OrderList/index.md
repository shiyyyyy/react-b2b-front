---
title: OrderList
subtitle: 不同类型订单列表(单个)
cols: 1
order: 15
---

支持3种订单列表.

## API

### OrderList

参数 | 说明 | 类型 | 默认值
----|------|-----|------
暂时没有参数,只是一个对象,把子元素集合到一起方便引用

### OrderList.GroupTour

参数 | 说明 | 类型 | 默认值
----|------|-----|------
item | 当前数据 | Object | -
btnChildren | 返回右下按钮 | ReactNode | null
children | 点击展开时显示的模块 | ReactNode | -
openChildren | 点击展开按钮时的回调 | fun | -


### OrderList.Traffic

参数 | 说明 | 类型 | 默认值
----|------|-----|------
item | 当前数据 | Object | -
btnChildren | 返回右下按钮 | ReactNode | null
children | 点击展开时显示的模块 | ReactNode | -
openChildren | 点击展开按钮时的回调 | fun | -


### OrderList.Visa

参数 | 说明 | 类型 | 默认值
----|------|-----|------
item | 当前数据 | Object | -
btnChildren | 返回右下按钮 | ReactNode | null
children | 点击展开时显示的模块 | ReactNode | -
openChildren | 点击展开按钮时的回调 | fun | -
