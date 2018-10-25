import { createStore } from 'redux'
import reducer from '../reducer'
import { SStorageGetJson } from '@/utils'

const initValue = {
  news: SStorageGetJson('elevator_news') || [],
  productInfo: SStorageGetJson('product_info') || Object.create(null),
  resolveInfo: SStorageGetJson('resolve_info') || Object.create(null),
  newsInfo: SStorageGetJson('news_info') || Object.create(null)
}

const store = createStore(reducer, initValue)

export default store
