import React from 'react'
import { connect } from 'react-redux'
import { Pagination, Button } from 'antd'
import { compnews } from '@/utils/data'
import 'antd/lib/pagination/style/css'
import 'antd/lib/button/style/css'
import './news.less'

let totalList = []

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      pageIndex: 1,
      pageNum: 10,
      bigTitle: '',
      list: []
    }
  }
  componentDidMount() {
    this.initList()
  }
  toDetail(id) {
    this.props.history.push({
      pathname: '/newsdetail',
      query: {
        id
      }
    })
  }
  initList() {
    const res = this.props.newsList[this.props.newsInfo.type]
    // sessionStorage.setItem('news_list', JSON.stringify(res))
    totalList = res.map((itemN, i) => ({
      title: itemN.news_title,
      img: require(`@/assets/images/resolve/fa${(i % 4) + 2}.jpg`),
      id: itemN.id,
      item: itemN.news_date,
      desc: itemN.new_txt.substr(0, 70) + '...'
    }))
    this.setState({
      bigTitle: compnews[this.props.newsInfo.id].label,
      total: res.length
    })
    this.onChange(1)
  }
  onChange(v) {
    this.setState({
      pageIndex: v,
      list: totalList.slice(
        (v - 1) * this.state.pageNum,
        v * this.state.pageNum
      )
    })
  }
  render() {
    return (
      <div>
        <div className="detail-logo">
          <img src={require('@/assets/images/news.jpg')} alt="news" />
        </div>
        <div className="detail-content">
          <div className="big-title">{this.state.bigTitle}</div>
          <div className="news-list">
            {this.state.list.map((item, i) => {
              return (
                <div key={`news-${i}`}>
                  <img src={item.img} alt={`news-${i}`} />
                  <div className="detail">
                    <div className="time">{item.time}</div>
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                    <Button
                      type="primary"
                      onClick={this.toDetail.bind(this, item.id)}
                    >
                      详情
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <Pagination
            onChange={this.onChange.bind(this)}
            defaultCurrent={this.state.pageIndex}
            total={this.state.total}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newsInfo: state.newsInfo,
    newsList: state.news
  }
}

export default connect(
  mapStateToProps,
  () => ({})
)(News)
