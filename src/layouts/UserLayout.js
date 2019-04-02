import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon, Row, Col } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/1.svg';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 同业聚
  </Fragment>
);

class UserLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  // @TODO <DocumentTitle title={this.getPageTitle()}>
  // <div className={styles.container}>
  //   <div className={styles.lang}>
  //     <SelectLang />
  //   </div>
  //   <div className={styles.content}>
  //     <div className={styles.top}>
  //       <div className={styles.header}>
  //         <Link to="/">
  //           <img alt="logo" className={styles.logo} src={logo} />
  //           <span className={styles.title}>测试</span>
  //         </Link>
  //       </div>
  //       <div className={styles.desc}>测试</div>
  //     </div>
  //     {children}
  //   </div>
  //   <GlobalFooter links={links} copyright={copyright} />
  // </div>

  visibleModal = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    const { children } = this.props;
    return (
      <Row className={styles.box}>
        <Col span={12} className={styles.l} />
        <Col span={12} className={styles.r}>
          <Col className={styles.r_login}>
            <Col className={styles.r_name}>TourTool系统</Col>
            <Col className={styles.r_input}>{children}</Col>
          </Col>
          <Col className={visible ? 'hide' : styles.r_modal} onClick={this.visibleModal} />
        </Col>
      </Row>
    );
  }
}

export default UserLayout;
