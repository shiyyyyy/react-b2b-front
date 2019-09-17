import { Tabs,Col } from 'antd';
import ProType from '@/components/ProType';
const { ScheduleGroupTour } = ProType;
// import ActionPageHoc from '@/components/ActionPageHoc';

const { TabPane } = Tabs;
// @ActionPageHoc
class Grouptab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        团队信息: {},
        价格明细: [],
      },
    };
  }
  callback = () => {
    console.log('11');
  }
  render() {
    const{ data } = this.state;
    return (
      <Col>
        <ScheduleGroupTour data={ data['团队信息'] } />
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Tab 3" key="4">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Col>
    );
  }
}

export default Grouptab;
