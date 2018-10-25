import React from 'react'
import Header from '@/components/header'
import Main from '@/components/main'
import Product from '@/pages/product'
import Resolve from '@/pages/resolve'
import News from '@/pages/news'
import NewsDetail from '@/pages/news/detail'
import Footer from '@/components/footer'
import { Switch, Route, Redirect } from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <Header />
        <div className="home-content">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/products" component={Product} />
            <Route path="/resolves" component={Resolve} />
            <Route path="/compnews" component={News} />
            <Route path="/newsdetail" component={NewsDetail} />
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
