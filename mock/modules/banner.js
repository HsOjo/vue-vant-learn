const Mock = require('mockjs');

let banner_items = Mock.mock({
  '_|3-5': [
    {
      url: '#banner-@increment',
      img: require('@/assets/logo.png'),
    },
  ]
})['_']

module.exports = [
  {
    url: '/api/banner',
    type: 'get',
    response() {
      return {code: 0, data: banner_items};
    }
  }
]