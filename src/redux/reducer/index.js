import { SetNews, SetProductInfo, SetResolveInfo, SetNewsInfo } from '../action'
import { SStorageSetJson } from '@/utils'

export default (state, action) => {
  switch (action.type) {
    case SetNews:
      SStorageSetJson('elevator_news', action.news)
      state.news = action.news
      return state
    case SetProductInfo:
      SStorageSetJson('product_info', action.info)
      state.productInfo = action.info
      return state
    case SetResolveInfo:
      SStorageSetJson('resolve_info', action.info)
      state.resolveInfo = action.info
      return state
    case SetNewsInfo:
      SStorageSetJson('news_info', action.info)
      state.newsInfo = action.info
      return state
    default:
      return state
  }
}
