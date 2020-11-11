let users = [
  {username: 'user1', password: '123456', phone: '12345678910'},
  {username: 'user2', password: '123456', phone: '12345678910'},
]

module.exports = [
  {
    url: '/api/user/register',
    type: 'post',
    response(req) {
      let is_existed = users.filter(i => i.username === req.data.username).length > 0;

      if (is_existed) {
        return {
          code: 1,
          msg: 'User is existed.'
        };
      } else {
        return {
          code: 0,
          msg: 'Register success.',
        };
      }
    }
  },
  {
    url: '/api/user/login',
    type: 'post',
    response(req) {
      console.log(users);
      let match_users = users.filter(i => i.username === req.data.username && i.password === req.data.password);

      if (match_users.length > 0) {
        let user = match_users[0];
        return {
          code: 0,
          msg: 'Login success.',
          data: {username: user.username, phone: user.phone}
        };
      } else {
        return {
          code: 1,
          msg: 'Login failed.',
        };
      }
    }
  },
];