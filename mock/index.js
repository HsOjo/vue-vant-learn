const Mock = require('mockjs');
const mockFiles = require.context('./modules', false, /\.js$/);

let mocks = [];
mockFiles.keys().forEach(key => {
  mocks.push(...mockFiles(key))
})

mocks.forEach(item => {
  Mock.mock(item.url, item.type, (req) => {
    let _req = {
      raw: req,
      params: null,
      data: JSON.parse(req.body),
    }
    if (item.url instanceof RegExp) {
      let url_match = item.url.exec(req.url);
      if (url_match) {
        _req.params = url_match.groups;
      }
    }

    console.log('Mock Request:', _req);
    return item.response(_req);
  })
})
