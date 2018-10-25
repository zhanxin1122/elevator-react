import React from 'react'
import contentObj, { navs } from '@/utils/data'

export default class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      contentObj,
      navs
    }
  }
  toPage() {
    // console.log('to page')
  }
  render() {
    return (
      <footer>
        <div className="content">
          <div className="all">
            <ul>
              {this.state.navs.map((item, i) => {
                if (i !== 2) {
                  return <li key={i}>{navs[5 - i].label}</li>
                } else {
                  return null
                }
              })}
            </ul>
            <div>
              {Object.keys(contentObj).map((key, i) => {
                if (key !== 'supports') {
                  return (
                    <ul key={`obj-${key}`}>
                      {contentObj[key].map((item0, j) => {
                        return (
                          <li
                            key={`${key}-${j}`}
                            onClick={this.toPage(key, item0.href)}
                          >
                            {item0.label}
                          </li>
                        )
                      })}
                    </ul>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
          <div className="code flex-center">
            <img alt="code" src={require('@/assets/images/code.jpg')} />
            <span>扫一扫加入微信</span>
          </div>
        </div>
        <div className="copyright">
          Copyright © 2014 - 2018 通用电梯安装维保(广州)有限公司
          粤ICP备18068287号
        </div>
      </footer>
    )
  }
}
