import React from 'react'
import { fromJS, is } from 'immutable'
import { products, resolves, supports, compnews, aborts } from '@/utils/data'
import { contains } from '@/utils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SetProductInfo, SetResolveInfo, SetNewsInfo } from '@/redux/action'
import './header-nav.less'

class HeaderNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.navActiveIndex,
      products,
      resolves,
      supports,
      compnews,
      aborts
    }
  }
  toDetail(name, href, type = null) {
    const query = {
      id: href,
      type
    }
    this.props[name] && this.props[name](query)
    this.props.history.push({
      pathname: `/${name}`,
      query
    })
  }
  componentDidMount() {
    const $html = document.documentElement
    const $nav = document.getElementsByClassName('nav-detail')[0]

    $html.onmouseover = e => {
      if (!contains($nav, e.target)) {
        this.setState({
          value: -1
        })
        this.props.onIndexChange(-1)
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.navActiveIndex
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.state), fromJS(nextState)) ||
      !is(fromJS(this.props), fromJS(nextProps))
    )
  }
  render() {
    return (
      <div className="nav-detail" onMouseOver={this.onMouseOver}>
        <div
          className={`product-nav ${this.state.value === 5 ? 'heiAuto' : ''}`}
          onMouseOver={this.onMouseOver}
        >
          {this.state.products.map((product, i) => {
            return (
              <div className="detail0 flex-center" key={`product-detail${i}`}>
                <ul>
                  <li>{product.label}</li>
                  {product.detail.map(item => {
                    return (
                      <li
                        onClick={this.toDetail.bind(
                          this,
                          'products',
                          item.href,
                          null
                        )}
                        key={item.name}
                      >
                        {item.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        <div
          className={`resolve-nav flex-center ${
            this.state.value === 4 ? 'heiAuto' : ''
          }`}
          ref="nav_resolve"
        >
          {this.state.resolves.map(item => {
            return (
              <div
                className="detail flex-center"
                onClick={this.toDetail.bind(this, 'resolves', item.href, null)}
                key={item.label}
              >
                <img alt="resolves" src={item.img} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
        <div
          className={`service-nav flex-center ${
            this.state.value === 3 ? 'heiAuto' : ''
          }`}
        >
          {this.state.supports.map(item => {
            return (
              <div className="detail flex-center" key={item.label}>
                <img alt="supports" src={item.img} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
        <div
          className={`news-nav ${this.state.value === 2 ? 'heiAuto' : ''}`}
          ref="nav_news"
        >
          {this.state.compnews.map(item => {
            return (
              <div className="detail" key={item.label}>
                <div>
                  <img
                    alt="news"
                    src={item.img}
                    onClick={this.toDetail.bind(
                      this,
                      'compnews',
                      item.href,
                      item.type
                    )}
                  />
                </div>
                <div>
                  <div
                    className="title"
                    onClick={this.toDetail.bind(
                      this,
                      'compnews',
                      item.href,
                      item.type
                    )}
                  >
                    {item.label}
                  </div>
                  <div className="desc">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div
          className={`partner-nav ${this.state.value === 1 ? 'heiAuto' : ''}`}
        />
        <div
          className={`about-nav flex-center ${
            this.state.value === 0 ? 'heiAuto' : ''
          }`}
          ref="nav_abort"
        >
          {this.state.aborts.map(item => {
            return (
              <div
                className="detail flex-center"
                key={item.label}
                onClick={() => console.log('$router.push({name: item.href})')}
              >
                <img alt="aborts" src={item.img} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    products: info => {
      dispatch({
        type: SetProductInfo,
        info
      })
    },
    resolves: info => {
      dispatch({
        type: SetResolveInfo,
        info
      })
    },
    compnews: info => {
      dispatch({
        type: SetNewsInfo,
        info
      })
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderNav)
)
