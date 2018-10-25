import React from 'react'
import { resolves } from '@/utils/data'
import Carousel from 'antd/lib/carousel' // 加载 JS
import 'antd/lib/carousel/style/css'
import './main.less'
import $fetch from '@/utils/fetch'
import { SetNews } from '@/redux/action'
import { connect } from 'react-redux'

// 获取新闻接口
const newsUrl = ['sort1', 'sort2']
let timer = null,
  timer0 = null

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data0: [
        {
          img: require('@/assets/images/home1.jpg'),
          href: 'home'
        },
        {
          img: require('@/assets/images/home2.jpg'),
          href: 'home'
        },
        {
          img: require('@/assets/images/home3.jpg'),
          href: 'home'
        }
      ],
      news: [
        {
          label: '公司动态',
          img: require('@/assets/images/service/comp.png'),
          type: 'sort1',
          detail: []
        },
        {
          label: '行业新闻',
          img: require('@/assets/images/service/profess.png'),
          type: 'sort2',
          detail: []
        }
      ],
      data1: [
        {
          label: '发布的一款新一代具体广播级质量的高性价比标清',
          desc:
            'GN-1858是高斯贝尔面向广电运营商发布的一款新一代具体广播级质量的高性价比标清MPEG-2/H.264编码器，可有效地进一步降低运营商在前端设备上的成本投入。',
          img: require('@/assets/images/resolve/fa2.jpg'),
          href: ''
        },
        {
          label: '发布的一款新一代具体广播级质量的高性价比标清',
          desc:
            'GN-1858是高斯贝尔面向广电运营商发布的一款新一代具体广播级质量的高性价比标清MPEG-2/H.264编码器，可有效地进一步降低运营商在前端设备上的成本投入。',
          img: require('@/assets/images/resolve/fa3.jpg'),
          href: ''
        }
      ],
      data2: [
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa2.jpg'),
          left: '0',
          href: '0-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa3.jpg'),
          left: '25',
          href: '1-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa4.jpg'),
          left: '50',
          href: '2-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa5.jpg'),
          left: '75',
          href: '3-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa2.jpg'),
          left: '100',
          href: '0-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa3.jpg'),
          left: '125',
          href: '1-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa4.jpg'),
          left: '150',
          href: '2-0'
        },
        {
          label: '载货电梯',
          img: require('@/assets/images/resolve/fa5.jpg'),
          left: '175',
          href: '3-0'
        }
      ],
      resolves,
      resolveIndex: [0, 1, 4],
      sumLeft: 0
    }
    this.interval = this.interval.bind(this)
  }
  reload() {
    window.location.reload()
  }
  toNews() {
    // console.log('to news')
  }
  toPro() {
    // console.log('to pros')
  }
  toDetail() {
    // console.log('to detail')
  }
  interval() {
    this.setState({
      sumLeft: this.state.sumLeft - 25
    })
    timer0 = window.setTimeout(() => {
      const target = this.state.data2.splice(0, 1)[0]
      target.left = +target.left + 200
      this.state.data2.push(target)
      this.setState({
        data2: this.state.data2
      })
    }, 500)
  }
  clearTimer() {
    window.clearInterval(timer)
    window.clearTimeout(timer0)
  }
  addTimer() {
    timer = window.setInterval(this.interval, 2000)
  }
  initNews() {
    let news = {
      sort1: null,
      sort2: null
    }
    newsUrl.forEach((item, i) => {
      $fetch({
        url: '/api/newsList',
        method: 'GET',
        params: {
          news_sort: item
        }
      }).then(res => {
        if (res && res.length !== 0) {
          const detailRes = this.state.news
          detailRes[i].detail = res.map(
            (itemN, j) =>
              j <= 2 && {
                title: itemN.news_title,
                img: require(`@/assets/images/resolve/fa${
                  i === 0 ? j + 2 : 4 - j
                }.jpg`),
                href: itemN.id,
                desc: itemN.new_txt.substr(0, 70) + '...'
              }
          )
          this.setState({
            news: detailRes
          })
          news[item] = res
          this.props.cacheNews(news)
          // sessionStorage.setItem('news', JSON.stringify(news))
        }
      })
    })
  }
  componentDidMount() {
    this.addTimer()
    this.initNews()
  }
  componentWillUnmount() {
    this.clearTimer()
  }
  render() {
    return (
      <div>
        <Carousel className="self-wid1 carousel-hei1" autoplay>
          {this.state.data0.map((item, i) => {
            return (
              <div key={i}>
                <img
                  alt="通用电梯安装维保有限公司"
                  src={item.img}
                  className="topImg"
                  onClick={this.reload}
                />
              </div>
            )
          })}
        </Carousel>
        <div className="main-content">
          <div className="news">
            {this.state.news.map((item, i) => {
              return (
                <div className="detail" key={i}>
                  <div className="label">
                    <img alt="news_title" src={item.img} />
                    {item.label}
                  </div>
                  <div className="content">
                    <Carousel className="main-news-hei" autoplay>
                      {item.detail.map((item0, j) => {
                        return (
                          <div key={j}>
                            <div className="img">
                              <img
                                alt="news_detail"
                                src={item0.img}
                                onClick={this.toNews(item0, item.type)}
                              />
                            </div>
                            <div className="new-detail">
                              <div
                                className="title"
                                onClick={this.toNews(item0, item.type)}
                              >
                                {item0.title}
                              </div>
                              <div className="desc">{item0.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </Carousel>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="self-scroll">
            <div className="label flex-center">
              <img
                alt="product"
                src={require('@/assets/images/service/product.png')}
              />
              <span>产品系列</span>
            </div>
            <div
              className="content"
              ref="home_pro"
              onMouseMove={this.clearTimer}
              onMouseOut={this.addTimer.bind(this)}
            >
              <ul style={{ transform: `translate(${this.state.sumLeft}%)` }}>
                {this.state.data2.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="flex-center"
                      onClick={this.toPro(item.href)}
                      style={{ left: `${item.left}%` }}
                    >
                      <img alt="pro" src={item.img} />
                      <span>{item.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="resolve">
            <div className="label flex-center">
              <img
                src={require('@/assets/images/service/resolve.png')}
                alt="resolve"
              />
              <span>解决方案</span>
            </div>
            <div className="flex-center jsb">
              {this.state.resolves.map((item, i) => {
                if (this.state.resolveIndex.indexOf(i) >= 0) {
                  return (
                    <div
                      className="content"
                      key={i}
                      onClick={this.toDetail('resolves', item.href)}
                    >
                      <div className="img">
                        <img src={item.img} alt={`img${i}`} />
                      </div>
                      <div className="title">{item.label}</div>
                      <div className="desc">{item.desc}</div>
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    cacheNews: news => {
      dispatch({
        type: SetNews,
        news
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
