exports.routes = (server) => {
  return {
    // Everything under this route group with require authentication
    // By default, available by path "/admin/api"
    admin: [],
    // By default, available by path "/api"
    api: [
      {
        method: 'GET',
        path: '/hello/world',
        handler: async (request, h) => {
          return { hello: 'hello World!' }
        }
      }
    ],
    // By default, available by path "/"
    web: []
  }
}
