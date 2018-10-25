import React from 'react'
import { products, productInfo } from '@/utils/data'
import { fromJS, is } from 'immutable'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './product.less'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: getProductDetail(this.props.product)
    }
  }
  toProduct(id) {
    this.setState({
      product: getProductDetail(id.split('-'))
    })
  }
  componentWillReceiveProps(nextProps) {
    this.toProduct(nextProps.location.query.id)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.state), fromJS(nextState)) ||
      !is(fromJS(this.props), fromJS(nextProps))
    )
  }
  render() {
    return (
      <div>
        <div className="detail-logo">
          <img
            alt="product-logo"
            src={require('@/assets/images/product.jpg')}
          />
        </div>
        <div className="detail-content">
          <div className="product-list">
            <div className="title">{this.state.product.listTitle}</div>
            <ul>
              {this.state.product.productList.map((item, i) => {
                return (
                  <li
                    key={`product${i}`}
                    onClick={this.toProduct.bind(this, item.href)}
                  >
                    {item.name}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="product-detail">
            <div className="title">产品详细</div>
            <div className="info relative">
              <img alt="pro" src={this.state.product.productImg} />
              <div className="detail">
                <div className="detail-title">
                  {this.state.product.productTitle}
                </div>
                {Object.keys(this.state.product.prodcuctDetail).map(key => {
                  return (
                    <div className="detail-info" key={key}>
                      <label>{key}：</label>
                      {this.state.product.prodcuctDetail[key]}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function getProductDetail(product) {
  return {
    listTitle: products[product[0]].label,
    productList: products[product[0]].detail,
    productTitle: products[product[0]].detail[product[1]].name,
    prodcuctDetail: (() => {
      const info = products[product[0]].detail[product[1]].content
      const obj = {}
      productInfo.forEach((item, i) => {
        obj[item] = info[i]
      })
      return obj
    })(),
    productImg: products[product[0]].detail[product[1]].img
  }
}

function mapStateToProps(state) {
  return {
    product: state.productInfo.id.split('-') || ''
  }
}

function mapDispatchToProps(state) {
  return {}
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Product)
)
