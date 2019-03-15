import React, { Component } from 'react';
import { Collapse, Icon, Checkbox, Divider, Input } from 'antd';

import styles from './AuthorizedSetItem.less';

const { Panel } = Collapse;
const { Group: CheckboxGroup } = Checkbox;

const customPanelStyle = {
  // background: '#f7f7f7',
  // borderRadius: 4,
  // border: 0,
  // overflow: 'hidden',
  // marginBottom: 24,
};

class AuthorizedSetItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        办公中心: {
          通讯录: {
            public: 1,
            read: { url: '/org/Employee/read' },
            filter: { 'department_id!=': 0 },
            text: '通讯录',
            rowHeight: 80,
            action: {
              审核头像: { text: '审核', bind: 'row', show: { flow: '[2]' } },
              撤销头像: { text: '弃审', bind: 'row', show: { flow: '[4]' } },
            },
            s_regular: {
              company_id: { text: '所属中心', type: 'Company' },
              department_id: { text: '所属部门', type: 'Department', cascade: 'company_id' },
              employee_id: { text: '员工姓名', type: 'Employee', cascade: 'department_id' },
              gender: { text: '性别', type: 'Gender' },
              flow: { text: '头像审核', type: 'Flow' },
            },
            s_text: { name: { text: '员工姓名' } },
            list: {
              pass_photo: {
                text: '头像',
                type: 'img',
                maxHeight: 95,
                cellClass: 'ContactsClass',
              },
              company_name: { text: '所属中心', cellClass: 'ContactsClass' },
              department_name: { text: '所属部门', cellClass: 'ContactsClass' },
              name: { text: '员工姓名', cellClass: 'ContactsClass' },
              gender: { text: '性别', type: 'Gender', cellClass: 'ContactsClass' },
              position: { text: '职位', cellClass: 'ContactsClass' },
              phone: { text: '座机', cellClass: 'ContactsClass' },
              extension: { text: '分机', cellClass: 'ContactsClass' },
              mobile: { text: '手机', cellClass: 'ContactsClass' },
              qq: { text: 'QQ', cellClass: 'ContactsClass' },
              flow: { text: '头像审核', type: 'FlowColor', cellClass: 'ContactsClass' },
            },
            tooltip: '通讯录',
          },
          新闻管理: {
            read: { url: '/org/News/read' },
            text: '新闻管理',
            action: {
              新增新闻: { text: '新增' },
              修改新闻: { text: '修改', bind: 'row' },
              删除新闻: { text: '删除', bind: 'row' },
            },
            s_regular: {
              company_id: { text: '发布中心', type: 'Company' },
              department_id: { text: '发布部门', type: 'Department', cascade: 'company_id' },
              employee_id: { text: '发布人', type: 'Employee', cascade: 'department_id' },
              create_from: {
                text: '发布日起',
                type: 'date',
                field: 'create_at',
                compare: 'DateFrom',
              },
              create_to: {
                text: '发布日止',
                type: 'date',
                field: 'create_at',
                compare: 'DateTo',
              },
            },
            s_text: { name: { text: '员工姓名' } },
            list: {
              title: { text: '新闻标题', trigger: ['查看新闻'] },
              create_at: { text: '发布时间' },
              employee_name: { text: '发布人' },
            },
            tooltip: '新闻管理',
          },
          公告管理: {
            read: { url: '/org/Announce/read' },
            perm_read: [
              '/org/Announce/push_submit',
              '/org/Announce/read_push_employee',
              '/org/Announce/read_push',
            ],
            text: '公告管理',
            action: {
              新增公告: { text: '新增' },
              发布公告: { text: '发布', bind: 'row', show: { publish_state: '[0]' } },
              推送公告: { text: '推送', bind: 'row', show: { publish_state: '[1]' } },
              修改公告: { text: '修改', bind: 'row' },
              删除公告: { text: '删除', bind: 'row' },
            },
            s_regular: {
              company_id: { text: '发布中心', type: 'Company' },
              department_id: { text: '发布部门', type: 'Department', cascade: 'company_id' },
              employee_id: { text: '发布人', type: 'Employee', cascade: 'department_id' },
              create_from: {
                text: '发布日起',
                type: 'date',
                field: 'create_at',
                compare: 'DateFrom',
              },
              create_to: {
                text: '发布日止',
                type: 'date',
                field: 'create_at',
                compare: 'DateTo',
              },
            },
            s_text: { title: { text: '公告标题' } },
            list: {
              id: { text: '公告编号', type: 'AnnounceId', trigger: ['查看公告'] },
              company_id: { text: '发布中心', type: 'Company' },
              department_id: { text: '发布部门', type: 'Department', cascade: 'company_id' },
              employee_name: { text: '发布人' },
              title: { text: '公告标题', trigger: ['查看公告'] },
              create_at: { text: '发布日期' },
              publish_state: { text: '发布状态', type: 'Publish_State' },
              push_msg: { text: '部门推送情况', trigger: ['查看推送'] },
            },
            tooltip: '公告管理',
          },
          事件日程: {
            read: { url: '/org/Schedule/read' },
            text: '事件日程',
            action: {
              新增日程: { text: '新增' },
              修改日程: { text: '修改', bind: 'row', show: { schedule_state: '[1]' } },
              删除日程: { text: '删除', bind: 'row', show: { schedule_state: '[2]' } },
              关闭日程: { text: '关闭', bind: 'row', show: { schedule_state: '[1]' } },
            },
            s_regular: {
              company_id: { text: '创建中心', type: 'Company' },
              department_id: { text: '创建部门', type: 'Department', cascade: 'company_id' },
              employee_id: { text: '创建人', type: 'Employee', cascade: 'department_id' },
              waiting_date_from: {
                text: '待办日起',
                type: 'date',
                field: 'waiting_date',
                compare: 'DateFrom',
              },
              waiting_date_to: {
                text: '待办日止',
                type: 'date',
                field: 'waiting_date',
                compare: 'DateTo',
              },
            },
            s_text: { title: { text: '标题' } },
            list: {
              waiting_date: { text: '待办日期' },
              title: { text: '标题' },
              body: { text: '内容' },
              employee_name: { text: '创建人' },
              create_at: { text: '创建日期' },
              schedule_state: { text: '状态', type: 'ScheduleState' },
            },
            tooltip: '事件日程',
          },
          投诉管理: {
            read: { url: '/org/Complain/read' },
            perm_read: ['/org/Complain/read_for_complain_order'],
            text: '投诉管理',
            action: {
              新增投诉: { text: '新增' },
              删除投诉: { text: '删除', bind: 'row', show: { state: '[1]' } },
              修改投诉: { text: '修改', bind: 'row', show: { result: '[1]' } },
              管理投诉: { text: '处理', bind: 'row', show: { state: '[3]' } },
              上传投诉: { text: '上传', bind: 'row' },
              投诉附件管理: { text: '附件管理', bind: 'row' },
              投诉日志: { text: '日志', bind: 'row' },
              推送至: { text: '推送', bind: 'row', show: { state: '[1]' } },
              投诉备注: { text: '备注', bind: 'row' },
              '投诉-游客黑名单': { text: '游客黑名单', bind: 'row' },
            },
            s_regular: {
              submit_at_from: {
                text: '提交日起',
                type: 'date',
                field: 'submit_at',
                compare: 'DateFrom',
              },
              submit_at_to: {
                text: '提交日止',
                type: 'date',
                field: 'submit_at',
                compare: 'DateTo',
              },
              complain_at_form: {
                text: '投诉日起',
                type: 'date',
                field: 'complain_at',
                compare: 'DateFrom',
              },
              complain_at_to: {
                text: '投诉日止',
                type: 'date',
                field: 'complain_at',
                compare: 'DateFrom',
              },
              source: { text: '投诉来源', type: 'ComplainSource' },
              classify: { text: '投诉分类', type: 'ComplainType' },
              be_complain_company: { text: '投诉中心', type: 'Company' },
              be_complain_department: {
                text: '投诉部门',
                type: 'Department',
                cascade: 'be_complain_company',
              },
              be_complain_employee: {
                text: '投诉员工',
                type: 'Employee',
                cascade: 'be_complain_department',
              },
              state: { text: '受理状态', type: 'ComplainState' },
              result: { text: '处理结果', type: 'ComplainResult' },
            },
            s_text: {
              id: { text: '投诉编号', type: 'ComplainID' },
              complain_name: { text: '投诉名称' },
              supplier: { text: '关联供应商' },
            },
            list: {
              id: { text: '投诉编号', type: 'ComplainID', trigger: ['查看投诉'] },
              employee_id: { text: '发布人', type: 'Employee' },
              complain_name: { text: '投诉名称' },
              source: { text: '投诉来源', type: 'ComplainSource' },
              classify: { text: '投诉分类', type: 'ComplainType' },
              is_reaking: { text: '违法违规', type: 'ComplainReak' },
              be_complain_company: { text: '被投诉中心', type: 'Company' },
              be_complain_department: { text: '被投诉部门', type: 'Department' },
              be_complain_employee: { text: '被投诉员工', type: 'Employee' },
              supplier_id: { text: '关联供应商', type: 'Supplier' },
              state: { text: '受理状态', type: 'ComplainState' },
              push_user: { text: '推送目标', type: 'Employee' },
              submit_at: { text: '提交日期' },
              complain_at: { text: '投诉日期' },
              annex: { text: '附件', type: 'filelist', upload: 'attach_complain', ro: 1 },
              order_id: { text: '关联订单', type: 'OrderId' },
              result: { text: '处理结果', type: 'ComplainResult' },
              dispose_date: { text: '处理天数' },
            },
            tooltip: '投诉管理',
          },
        },
        行政中心: {
          公司设置: {
            read: { url: '/org/Company/read' },
            text: '中心设置',
            action: {
              新增公司: { text: '新增' },
              修改公司: { text: '修改', bind: 'row' },
              启停公司: { text: '启停', bind: 'row' },
              删除公司: { text: '删除', bind: 'row' },
              设置公司领导: { text: '领导', bind: 'row' },
            },
            s_regular: { state: { text: '启停状态', type: 'State' } },
            s_text: { name: { text: '中心名称' } },
            list: {
              name: { text: '中心名称' },
              code: { text: '中心代码' },
              state: { text: '启停状态', type: 'StateIcon' },
              leader_names: { text: '领导' },
            },
            tooltip: '中心设置',
          },
          部门设置: {
            read: { url: '/org/Department/read' },
            text: '部门设置',
            action: {
              新增部门: { text: '新增' },
              修改部门: { text: '修改', bind: 'row' },
              启停部门: { text: '启停', bind: 'row' },
              删除部门: { text: '删除', bind: 'row' },
              设置部门领导: { text: '领导', bind: 'row' },
              部门设为供应商: { text: '设为供应商', bind: 'row' },
              设置部门期初余额: { text: '期初余额', bind: 'row' },
              部门日志: { text: '日志', bind: 'row' },
              部门校验等级: { text: '校验', bind: 'row' },
            },
            s_regular: {
              company_id: { text: '中心', type: 'Company' },
              state: { text: '启停状态', type: 'State' },
              avail_balance_check: { text: '余额校验', type: 'State' },
              invoice_check_level: { text: '校验等级', type: 'CheckLevel', clear: 1 },
            },
            s_text: { name: { text: '部门名称' }, code: { text: '代码' } },
            list: {
              company_name: { text: '中心' },
              name: { text: '部门' },
              code: { text: '部门代码' },
              addr: { text: '部门地址' },
              email: { text: '部门邮箱' },
              state: { text: '启停状态', type: 'StateIcon' },
              avail_balance_check: { text: '余额校验', type: 'StateIcon' },
              avail_amount_limit: { text: '校验额度' },
              leader_names: { text: '领导' },
              leader_auth: { text: '领导权限' },
            },
            tooltip: '部门设置',
          },
          员工设置: {
            read: { url: '/org/Employee/read' },
            filter: { 'department_id!=': 0 },
            text: '员工设置',
            action: {
              新增员工: { text: '新增' },
              修改员工: { text: '修改', bind: 'row' },
              启停员工: { text: '启停', bind: 'row' },
              重置员工密码: { text: '重置密码', bind: 'row' },
              设置员工权限: { text: '权限', bind: 'row' },
              设置员工领导: { text: '上级' },
              指定岗位: { text: '岗位', bind: 'row' },
            },
            s_regular: {
              company_id: { text: '中心', type: 'Company' },
              department_id: { text: '部门', type: 'Department', cascade: 'company_id' },
              state: { text: '启停状态', type: 'State' },
            },
            s_text: {
              name: { text: '姓名' },
              comment: { text: '员工备注' },
              mobile: { text: '手机' },
              department_name: { text: '部门名称' },
              code: { text: '部门代码' },
              auth_name: { text: '权限' },
              post_name: { text: '岗位', type: 'Post' },
            },
            list: {
              company_name: { text: '中心' },
              department_name: { text: '部门' },
              code: { text: '部门代码' },
              post_name: { text: '岗位' },
              name: { text: '姓名' },
              gender: { text: '性别', type: 'Gender' },
              mobile: { text: '手机' },
              comment: { text: '员工备注' },
              superior_name: { text: '上级领导' },
              auth_name: { text: '权限' },
              state: { text: '启停状态', type: 'StateIcon' },
            },
            tooltip: '员工设置',
          },
          权限设置: {
            read: { url: '/org/Auth/read' },
            filter: { 'id>': 0 },
            text: '权限设置',
            action: {
              新增权限: { text: '新增' },
              分配权限: { text: '分配权限' },
              同业权限: { text: '同业权限' },
              修改权限: { text: '修改', bind: 'row' },
              复制权限: { text: '复制', bind: 'row' },
              删除权限: { text: '删除', bind: 'row' },
              启停权限: { text: '启停', bind: 'row' },
            },
            s_regular: { state: { text: '启停状态', type: 'State' } },
            s_text: { name: { text: '权限名称' }, members: { text: '角色成员' } },
            list: {
              employee_name: { text: '创建人' },
              name: { text: '权限名称' },
              scope: { text: '适用范围' },
              members: { text: '角色成员' },
              state: { text: '启停状态', type: 'StateIcon' },
            },
            tooltip: '权限设置',
          },
          岗位设置: {
            read: { url: '/org/Post/read' },
            text: '岗位设置',
            action: {
              新增岗位: { text: '新增' },
              修改岗位: { text: '修改', bind: 'row' },
              指定成员: { text: '成员', bind: 'row' },
              启停岗位: { text: '启停', bind: 'row' },
            },
            s_regular: { state: { text: '启停状态', type: 'State' } },
            s_text: { name: { text: '岗位名称' } },
            list: {
              employee_name: { text: '创建人' },
              name: { text: '岗位名称' },
              scope: { text: '适用范围' },
              emp_name: { text: '岗位成员' },
              state: { text: '启停状态', type: 'StateIcon' },
            },
            tooltip: '岗位设置',
          },
        },
      },
      auth: {
        id: '3',
        employee_id: '1',
        name: '供应商无权限',
        scope: '系统维护,权限管理',
        actions: [
          '删除公告',
          '新闻管理',
          '新增新闻',
          '修改新闻',
          '删除新闻',
          '事件日程',
          '新增日程',
          '修改日程',
          '删除日程',
          '关闭日程',
          '部门设置',
          '新增部门',
          '修改部门',
          '启停部门',
          '删除部门',
        ],
      },
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // 描述信息
  // 权限名称 和 范围
  onInputChange(e, type) {
    const { auth } = this.state;
    const { value } = e.target;
    auth[type] = value;
    this.setState({ auth });
  }

  // 快速通过按钮更改
  onPassQuicklyChange = e => {
    console.log(e.target.value);
    console.log(this);
    const { auth } = this.state;
    const { value } = e.target;
  };

  // mod 更改
  onCheckAllChange = e => {
    const { mod, checked, value: modItem } = e.target;
    const { auth, menu } = this.state;
    // 如果选中状态
    if (checked) {
      if (menu[mod][modItem] && menu[mod][modItem].action) {
        const actions = Object.keys(menu[mod][modItem].action);
        const set = new Set(auth.actions);
        // 添加 modItem
        set.add(menu[mod][modItem].text);
        // 添加actions
        actions.forEach(x => set.add(x));
        auth.actions = [...set];
        this.setState({ auth });
        return;
      }
    }
    // 如果非选中状态
    if (menu[mod][modItem] && menu[mod][modItem].action) {
      const actions = Object.keys(menu[mod][modItem].action);
      const set = new Set(auth.actions);
      // 删除 modItem
      set.delete(menu[mod][modItem].text);
      // 删除 actions
      actions.filter(x => set.delete(x));
      auth.actions = [...set];
      this.setState({ auth });
    }
  };

  // mod actions更改
  onChange = (mod, modItem, checkedValues) => {
    const { auth, menu } = this.state;
    const set = new Set(auth.actions);
    const allActions = Object.keys(menu[mod][modItem].action);
    console.log(checkedValues);
    // 先删除本modItem的全部action
    allActions.filter(x => set.delete(x));
    // 在把当前选中的action数组添加进去
    checkedValues.forEach(x => set.add(x));
    // 如果modItem不存在auth.actions里面 && 当前选中的数组checkedValues不为空
    if (checkedValues.length > 0 && !set.has(modItem)) {
      set.add(menu[mod][modItem].text);
    }

    auth.actions = [...set];
    this.setState({ auth });
  };

  render() {
    const { menu, auth } = this.state;

    return (
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}
        >
          <Panel header="描述信息" style={customPanelStyle}>
            <div className={styles.info}>
              <span className={styles.infoLable}>权限名称:</span>
              <Input
                size="default"
                placeholder="权限名称"
                value={auth.name || ''}
                onChange={e => this.onInputChange(e, 'name')}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.infoLable}>适用范围:</span>
              <Input
                size="default"
                placeholder="适用范围"
                value={auth.scope || ''}
                onChange={e => this.onInputChange(e, 'scope')}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.infoLable}>特殊按钮:</span>
              <Checkbox onChange={this.onPassQuicklyChange} checked={false}>
                快速通过
              </Checkbox>
            </div>
          </Panel>
          {Object.keys(menu).map(mod => (
            <Panel header={mod} key={mod} style={customPanelStyle}>
              {Object.keys(menu[mod]).map(modItem => (
                <div key={modItem} className={styles.modItem}>
                  <Checkbox
                    className={styles.modItemCheckbox}
                    onChange={this.onCheckAllChange}
                    value={modItem}
                    mod={mod}
                    checked={auth.actions.indexOf(menu[mod][modItem].text) !== -1}
                  >
                    {menu[mod][modItem].text}
                  </Checkbox>
                  {menu[mod][modItem] && menu[mod][modItem].action && (
                    <CheckboxGroup
                      className={styles.modItemCheckboxGroup}
                      options={Object.keys(menu[mod][modItem].action).filter(
                        item => menu[mod][modItem].action[item].text
                      )}
                      value={Object.keys(menu[mod][modItem].action).filter(
                        item => auth.actions.indexOf(item) !== -1
                      )}
                      onChange={this.onChange.bind(this, mod, modItem)}
                    />
                  )}
                  <Divider dashed />
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

export default AuthorizedSetItem;
