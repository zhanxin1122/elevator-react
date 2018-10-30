import React from 'react'
import { connect } from 'react-redux'

class NewsDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 0,
      newsList: [],
      curId: ''
    }
  }
  componentDidMount() {
    this.initPageNo()
    this.getNewsDetail()
    this.getRelativeNews()
  }
  initPageNo() {
    for (let i = 0; i < this.newsList.length; i++) {
      if (this.newsList[i].id === this.curId) {
        this.pageNo = i
        break
      }
    }
  }
  toDetail(id, flag = false) {
    flag &&
      (this.newsList = JSON.parse(sessionStorage.getItem('news'))['sort1'])
    this.curId = id
    this.$router.push({
      name: 'newsDetail',
      query: {
        id
      }
    })
  }
  getNewsDetail() {
    this.$fetch({
      url: '/getnewsinfo',
      method: 'GET',
      params: {
        id: this.curId
      }
    }).then(res => {
      if (res && res.length !== 0) {
        const detail = res[0]
        this.news = {
          title: detail.news_title,
          time: detail.news_date,
          content: detail.news_body
        }
        this.setImgs()
      }
    })
  }
  getRelativeNews() {
    const cache = sessionStorage.getItem('news')
    this.relList = JSON.parse(cache).sort1.map(itemN => ({
      title: itemN.news_title,
      time: itemN.news_date,
      id: itemN.id
    }))
  }
  setImgs() {
    this.$nextTick(() => {
      ;[...this.$refs.content.getElementsByTagName('img')].forEach(item => {
        item.setAttribute(
          'src',
          'http://193.112.120.183:3000' + item.getAttribute('src')
        )
      })
    })
  }
  prev() {
    if (this.pageNo === 0) {
      this.pageNo = this.newsList.length - 1
    } else {
      this.pageNo--
    }
    this.setNews()
  }
  next() {
    if (this.pageNo === this.newsList.length - 1) {
      this.pageNo = 0
    } else {
      this.pageNo++
    }
    this.setNews()
  }
  setNews() {
    this.toDetail(this.newsList[this.pageNo].id)
  }
  render() {
    return (
      <div>
        <div className="detail-logo">
          <img alt="newdetail" src={require('@/assets/images/news.jpg')} />
        </div>
        <div className="detail-content news-detail">
          <div className="news-content">
            <div className="head">
              <div className="title">{this.state.news.title}</div>
              <div className="time">{this.state.news.time}</div>
            </div>
            <div
              ref="content"
              className="space2"
              dangerouslySetInnerHTML={{ __html: this.state.news.content }}
            />
            <div className="news-operate flex-center">
              <div onClick={this.prev.bind(this)}>上一篇</div>
              <div onClick={this.next.bind(this)}>下一篇</div>
            </div>
          </div>
          <ul className="relative-news">
            <li>相关新闻</li>
            {this.state.relList.map((item, i) => {
              return (
                <li key={`rel-${i}`}>
                  <div className="time">{item.time}</div>
                  <div
                    className="title"
                    onClick={this.toDetail.bind(this, item.id, true)}
                  >
                    {item.title}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(
  mapStateToProps,
  () => ({})
)(NewsDetail)
