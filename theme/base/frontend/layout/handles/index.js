module.exports = {
  "get": [
    {
      "path": "/",
      "handles": ['default']
    },
    {
      "path": "/register",
      "handles": ['default','userRegister']
    }
  ],
  "post": [
    {
      "path": "/register",
      "handles": ['post/userRegister']
    }
  ]
}
