import React from 'react'
import { resolves } from '@/utils/data'
import { connect } from 'react-redux'
import './resolve.less'

class Resolve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.resolveInfo
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      info: resolves[nextProps.location.query.id]
    })
  }
  render() {
    let content = null
    if (this.state.info.img_con) {
      content = (
        <div className="flex-center img-content">
          {this.state.info.img_con.map((item, i) => {
            return <img alt={i} key={i} src={item} />
          })}
        </div>
      )
    } else {
      content = <div className="resolve-desc">{this.state.info.desc}</div>
    }
    return (
      <div>
        <div className="detail-logo">
          <img
            alt="resolve-logo"
            src={require('@/assets/images/resolve.jpg')}
          />
        </div>
        <div className="detail-content">
          <div className="resolve-title">{this.state.info.label}</div>
          {content}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    resolveInfo: resolves[state.resolveInfo.id]
  }
}

export default connect(
  mapStateToProps,
  () => ({})
)(Resolve)
