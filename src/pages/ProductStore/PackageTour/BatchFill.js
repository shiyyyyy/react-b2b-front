import React from 'react';
import { Col, Divider, Modal, Input, Form } from 'antd';

import styles from './BatchFill.less';

const FormItem = Form.Item

@Form.create()
class BatchFill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, mod: '库存信息', cell: { 计划总位: 100, 库存剩余: 40, 成团人数: 50 } },
        {
          id: 1,
          mod: '基准价格',
          cell: { 基准同行价: 19999, 建议直客价: 29998, 价格备注说明: '只赚50元' },
				},
				{
          id: 2,
          mod: '其他价格',
          cell: { 其他同行价: 100, 建议直客价: 40, 价格备注说明: '我们家最便宜' },
          action: [1, 2, 3],
        }
			],
    };
  }

  onOk = () => {
    const { onOk } = this.props;
    if (onOk) {
      const { dateArr } = this.state;
      onOk(dateArr);
      this.setState({ dateArr: [] });
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  submit = () => {
    console.log(this.props.form.getFieldsValue());
    console.log('submit');
  };

  render() {
    const {
      title,
      visible,
      width,
      form: { getFieldDecorator },
    } = this.props;
    const { data } = this.state;
    return (
      <Modal
        title={title}
        width={width || 520}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <Form onSubmit={this.submit} layout='vertical' wrapperCol={{span: 22}}>
          <Col className={["clear", styles.ModBox].join(' ')}>
            {data.map((item, index) => (
              <Col key={item.id} className="clear">
                <Col className={styles.title}>{item.mod}</Col>
                <Col className={[styles.content, 'clear'].join(' ')}>
                  {item.cell &&
                    Object.keys(item.cell).map((cell, index) => (
                      <Col span={8} key={index}>
                        <FormItem label={item.cell[cell] || ''}>
                          {getFieldDecorator(cell)(
                            <Input placeholder={item.cell[cell]} />
                          )}
                        </FormItem>
                      </Col>
                    ))}
                </Col>
								{/* <Divider style={data.length - 1 === index ? {display: 'none'} : {}} /> */}
								<div style={{width: '100%', height: '3px', background: '#ccc', borderRadius: '4px'}} />
              </Col>
						))}
						<Divider />
          </Col>
        </Form>
      </Modal>
    );
  }
}

export default BatchFill;
