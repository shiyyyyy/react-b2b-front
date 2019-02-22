import React from 'react';
import styles from './NewPage.less';
import { connect } from 'dva';

class NewPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  onClickText() {
    console.log('点击')
    console.log(this)
    let { dispatch } = this.props;
    dispatch({
      type: 'NewPage/fetchFakePro'
    })
  }

  render() {
    return (
      <div className={styles.NewPage} onClick={e => this.onClickText()}>
        New Page
        {/* <p>{this.props.NewPage.data ? this.props.NewPage.data.length : 0}</p>   */}
      </div>
    )
  }
}

export default connect(({ newPage }) => ({
  state: {
    newPage: newPage.newpage,
    data: newPage.data
  }
}))(NewPage);