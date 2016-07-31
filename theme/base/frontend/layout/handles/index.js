module.exports = {
  "get": [
    {
      "path": "/",
      "handles": ['default']
    },
    {
      "path": "/register",
      "handles": ['default','userRegister']
    },
    {
      "path": "/login",
      "handles": ['default','userLogin']
    },
    {
      "path": "/logout",
      "handles": ['userLogout']
    },
    //Admin
    {
      "path": "/admin",
      "conditional":"isAdmin",
      "handles": ['default','admin']
    },
    {
      "path": "/admin",
      "conditional":"isAdmin",
      "handles": ['default','admin']
    },
    {
      "path": "/admin/composer/:hashid",
      "conditional":"isAdmin",
      "handles": ['default','admin']
    }
  ],
  "post": [
    {
      "path": "/register",
      "model": "userRegister/post"
    },
    {
      "path": "/login",
      "model": "userLogin/post"
    }
  ],
  "setupRedirects": [
    {
      "path": "/admin/new/post",
      "conditional":"isAdmin",
      "model": "admin/newPost"
    }
  ]
}
