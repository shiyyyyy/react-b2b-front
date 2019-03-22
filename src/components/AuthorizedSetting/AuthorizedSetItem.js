import React from 'react';
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

function AuthorizedSetItem(props) {
  // 描述信息
  // 权限名称 和 范围
  const onInfoChange = (e, type) => {
    const {
      data: { auth },
      callback,
    } = props;
    const { value } = e.target;
    auth[type] = value;
    if (callback) {
      callback(auth);
    }
  };

  // mod 更改
  const onCheckAllChange = (menuKey, mod, checked) => {
    const {
      data: { menu, auth },
      callback,
    } = props;
    if (checked) {
      const set = new Set(auth.actions);
      set.add(mod);
      if (menu[menuKey][mod] && menu[menuKey][mod].action) {
        const actions = Object.keys(menu[menuKey][mod].action);
        actions.forEach(x => set.add(x));
      }
      auth.actions = [...set];
    } else {
      const set = new Set(auth.actions);
      set.delete(mod);
      if (menu[menuKey][mod] && menu[menuKey][mod].action) {
        const actions = Object.keys(menu[menuKey][mod].action);
        actions.filter(x => set.delete(x));
      }
      auth.actions = [...set];
    }

    if (callback) {
      callback(auth);
    }
  };

  // mod actions更改
  const onChange = (mod, modItem, checkedValues) => {
    const {
      data: { menu, auth },
      callback,
    } = props;

    const set = new Set(auth.actions);
    const allActions = Object.keys(menu[mod][modItem].action);

    allActions.filter(x => set.delete(x));

    checkedValues.forEach(x => set.add(x));

    if (checkedValues.length > 0 && !set.has(modItem)) {
      set.add(menu[mod][modItem].text);
    }

    auth.actions = [...set];

    if (callback) {
      callback(auth);
    }
  };

  const {
    data: { menu, auth },
  } = props;
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey="main"
        expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}
      >
        <Panel header="描述信息" style={customPanelStyle} key="main">
          <div className={styles.info}>
            <span className={styles.infoLable}>权限名称:</span>
            <Input
              size="default"
              placeholder="权限名称"
              value={auth.name || ''}
              onChange={e => onInfoChange(e, 'name')}
            />
          </div>
          <div className={styles.info}>
            <span className={styles.infoLable}>适用范围:</span>
            <Input
              size="default"
              placeholder="适用范围"
              value={auth.scope || ''}
              onChange={e => onInfoChange(e, 'scope')}
            />
          </div>
        </Panel>
        {Object.keys(menu).map(menuKey => (
          <Panel header={menuKey} key={menuKey} style={customPanelStyle}>
            {Object.keys(menu[menuKey]).map(mod => (
              <div key={mod} className={styles.modItem}>
                <Checkbox
                  className={styles.modItemCheckbox}
                  onChange={e => onCheckAllChange(menuKey, mod, e.target.checked)}
                  checked={auth.actions.indexOf(mod) !== -1}
                >
                  {menu[menuKey][mod].text}
                </Checkbox>
                {menu[menuKey][mod] && menu[menuKey][mod].action && (
                  <CheckboxGroup
                    className={styles.modItemCheckboxGroup}
                    options={Object.keys(menu[menuKey][mod].action).filter(
                      item => menu[menuKey][mod].action[item].text
                    )}
                    value={Object.keys(menu[menuKey][mod].action).filter(
                      item => auth.actions.indexOf(item) !== -1
                    )}
                    onChange={checkedValues => onChange(menuKey, mod, checkedValues)}
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

export default AuthorizedSetItem;
