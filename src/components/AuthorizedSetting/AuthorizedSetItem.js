import React, { Component } from 'react';
import { Col, Collapse, Icon, Checkbox, Divider, Input, Button, Modal } from 'antd';

import FilterModalContent from './FilterModalContent';

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
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {filterModalShow:false,selectModalCfg:{} };
    this.renderFilter = this.renderFilter.bind(this);
    this.editPemFilter = this.editPemFilter.bind(this);
    this.modalCancel = this.modalCancel.bind(this);
    this.modalOk = this.modalOk.bind(this);
    this.renderFilterModalContent= this.renderFilterModalContent.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // 描述信息
  // 权限名称 和 范围
  onInfoChange(e, field) {
    const { data:{auth },callback } = this.props;
    auth[field] = e.target.value;
    if(callback){
      callback(auth);
    }
  }


  // mod 更改
  onCheckAllChange = (modCfg,mod,checked) => {
    const { data:{ auth },callback } = this.props;
    if (checked) {
      const set = new Set(auth.actions);

      set.add(mod);

      Object.keys(modCfg.action).forEach((action)=>{
        set.add(action)
      })

      auth.actions = [...set];
    }else {
        const set = new Set(auth.actions);

        set.delete(mod);

        Object.keys(modCfg.action).forEach((action)=>{
          set.delete(action)
        })

        auth.actions = [...set];
    }

    if(callback){
      callback(auth);
    }
  };

  // mod actions更改
  onChange = (modCfg, checkedValues) => {
    const { data:{auth },callback } = this.props;

    const set = new Set(auth.actions);
    const allActions = [];
    const checkedActions = [];
    Object.keys(modCfg.action).forEach((action)=>{
        allActions.push(action);

        if(checkedValues.includes(action)){
          checkedActions.push(action);
        }

    })

    allActions.forEach(x => set.delete(x));

    checkedActions.forEach(x => set.add(x));

    auth.actions = [...set];

    if(callback){
      callback(auth);
    }
  };

  editPemFilter(cfg){
    this.setState({filterModalShow:true,selectModalCfg:cfg});
  }

  modalCancel(){
    this.setState({filterModalShow:false,selectModalCfg:{}});
  }

  modalOk(mod,filter){
    if(filter){
      const { data:{auth },callback } = this.props;
      if(Object.keys(filter).length>0){
        auth.filters = auth.filters ||{};
        auth.filters[mod] = {...filter};
      }else if(auth.filters){
        delete auth.filters[mod];
      }
      if(callback){
        callback(auth);
      }
    }
    this.setState({filterModalShow:false,selectModalCfg:{}});
  }

  renderFilterModalContent(){
    const {selectModalCfg} = this.state;
    const { data:{auth}} = this.props;
    return (
      <FilterModalContent
        cfg={selectModalCfg}
        auth={auth}
        onCancel={this.modalCancel}
        onSubmit={this.modalOk}
      />
    )
  }

  renderFilter(regular,mod){
    const filterType = {'Company':1,'Department':1,'Employee':1};
    if(regular){
      return (
        Object.keys(regular).map((field) => (
          filterType[regular[field].type] ===1 &&
          <Button key={`${mod}/${field}`} onClick={()=>this.editPemFilter({mod,field,regular,type:regular[field].auth_type||regular[field].type})} >
            {regular[field].text}
          </Button>
        ))
      )
    }
    return null;
  }

  //
  renderMenu(menu,auth){
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <Icon type="right" rotate={isActive ? 90 : 0} />}
      >
        {Object.keys(menu).map(menuKey => (
          <Panel header={menu[menuKey].text} key={menuKey} style={customPanelStyle}>
            {Object.keys(menu[menuKey].children).map(mod => (
              <div key={mod} className={styles.modItem}>
                <Checkbox
                  className={styles.modItemCheckbox}
                  onChange={e =>
                    this.onCheckAllChange(menu[menuKey].children[mod], mod, e.target.checked)
                  }
                  checked={auth.actions.indexOf(mod) !== -1}
                >
                  {menu[menuKey].children[mod].text}
                </Checkbox>
                {menu[menuKey].children[mod] && menu[menuKey].children[mod].action && (
                  <CheckboxGroup
                    className={styles.modItemCheckboxGroup}
                    options={Object.keys(menu[menuKey].children[mod].action).filter(
                      item => menu[menuKey].children[mod].action[item].text
                    )}
                    value={Object.keys(menu[menuKey].children[mod].action).filter(
                      item => auth.actions.indexOf(item) !== -1
                    )}
                    onChange={checkedValues =>
                      this.onChange(menu[menuKey].children[mod], checkedValues)
                    }
                  />
                )}
                {<Col className={styles.modBtn}>{this.renderFilter(menu[menuKey].children[mod].s_regular,mod)}</Col>}
                <Divider dashed />
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    );
  }

  render() {
    const { data:{ menu={}, auth } } = this.props;
    const {filterModalShow} = this.state;
    return (
      <div>
        <React.Fragment>
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
                  value={auth.name}
                  onChange={e => this.onInfoChange(e, 'name')}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.infoLable}>适用范围:</span>
                <Input
                  size="default"
                  placeholder="适用范围"
                  value={auth.scope}
                  onChange={e => this.onInfoChange(e, 'scope')}
                />
              </div>
            </Panel>
          </Collapse>
          {this.renderMenu(menu,auth)}
        </React.Fragment>
        <Modal
          title="可见数据"
          visible={filterModalShow}
          okButtonProps={{className: 'hide'}}
          cancelButtonProps={{className:'hide'}}
          onCancel={this.modalCancel}
        >
          {filterModalShow && this.renderFilterModalContent()}
        </Modal>
      </div>
    );
  }
}

export default AuthorizedSetItem;
