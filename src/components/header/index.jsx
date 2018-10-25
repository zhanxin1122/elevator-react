import React from 'react'
import HeaderNav from './header-nav'
import { navs } from '@/utils/data'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      shadowFlag: false,
      navs,
      navActiveIndex: -1
    }
  }
  toDetail() {}
  onMouseOver(i) {
    this.setState({ navActiveIndex: i })
  }
  render() {
    return (
      <header className={this.state.shadowFlag ? 'headerShadow' : ''}>
        <div>
          <Link to="/">
            <img alt="logo" src={require('@/assets/images/logo2.jpg')} />
          </Link>
          <div className="nav-box">
            <img alt="phone" src={require('@/assets/images/phone.jpg')} />
            <ul>
              {this.state.navs.map((item, i) => {
                if (i !== 3) {
                  return (
                    <li
                      className={
                        this.state.navActiveIndex === i ? 'active' : ''
                      }
                      key={`home-nav${i}`}
                      onClick={this.toDetail.bind(this, item.label)}
                      onMouseOver={this.onMouseOver.bind(this, i)}
                    >
                      {item.label}
                    </li>
                  )
                } else {
                  return null
                }
              })}
            </ul>
          </div>
        </div>
        <HeaderNav
          onIndexChange={this.onMouseOver.bind(this)}
          navActiveIndex={this.state.navActiveIndex}
        />
      </header>
    )
  }
}
