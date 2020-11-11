const Mock = require('mockjs');

let categories = Mock.mock({
  '_|5-10': [
    {
      'id': '@id',
      'name': '@name',
      'img': require('@/assets/logo.png'),
      'items|1-10': [
        {
          'id': '@id',
          'name': '@name',
          'img': require('@/assets/logo.png'),
          'price|1-100.1-2': 1,
          'price_origin|1-100.1-2': 1,
          'description': '@sentence(10)',
          'picture|1-5': [
            require('@/assets/logo.png'),
          ]
        }
      ],
    }
  ]
})['_']

let commodities = [];
for (let category of categories) {
  for (let item of category.items) {
    commodities.push(item);
  }
}

let shopping_cart = [];
for (let i = 0; i < 3; i++) {
  let commodity = commodities[Math.ceil(Math.random() * commodities.length - 1)];
  let cart_item = Object.assign({num: Math.ceil(Math.random() * 3)}, commodity)
  shopping_cart.push(cart_item);
}

module.exports = [
  {
    url: '/api/categories',
    type: 'get',
    response() {
      return {
        code: 0,
        data: categories.map(x => {
          return {id: x.id, name: x.name, img: x.img}
        })
      };
    },
  },
  {
    url: /\/api\/category\/(?<id>\d+)/,
    type: 'get',
    response(req) {
      let items = categories.filter(x => x.id === req.params.id)

      if (items.length > 0) {
        return {code: 0, data: items[0]};
      } else {
        return {code: 1, msg: 'Category not exist.'}
      }
    },
  },
  {
    url: /\/api\/commodity\/(?<id>\d+)/,
    type: 'get',
    response(req) {
      let items = commodities.filter(x => x.id === req.params.id)

      if (items.length > 0) {
        return {code: 0, data: items[0]};
      } else {
        return {code: 1, msg: 'Commodity not exist.'}
      }
    },
  },
  {
    url: '/api/shopping-cart',
    type: 'get',
    response() {
      return {
        code: 0,
        data: shopping_cart,
      };
    },
  },
  {
    url: '/api/shopping-cart/remove',
    type: 'post',
    response(req) {
      let success = false;
      let new_cart = shopping_cart.filter(x => x.id !== req.data.id);
      if (new_cart.length !== shopping_cart.length) {
        shopping_cart = new_cart;
        success = true
      }
      return {
        code: success ? 0 : 1,
        msg: success ? '添加购物车成功' : '添加购物车失败',
      };
    },
  },
  {
    url: '/api/shopping-cart/clear',
    type: 'get',
    response() {
      shopping_cart = [];
      return {
        code: 0,
        msg: '清空购物车成功',
      };
    },
  },
  {
    url: '/api/shopping-cart/add',
    type: 'post',
    response(req) {
      let success = false;
      let cart_items = shopping_cart.filter(x => x.id === req.data.id);
      if (cart_items.length > 0) {
        cart_items[0].num++;
        success = true;
      } else {
        let items = commodities.filter(x => x.id === req.data.id);
        if (items.length > 0) {
          let cart_item = Object.assign({num: 1}, items[0])
          shopping_cart.push(cart_item);
          success = true
        }
      }

      return {
        code: success ? 0 : 1,
        msg: success ? '添加购物车成功' : '添加购物车失败',
      };
    },
  },
]