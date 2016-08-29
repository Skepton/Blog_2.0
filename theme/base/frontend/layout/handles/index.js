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
      "handles": ['admin','admin/postCenter']
    },
    {
      "path": "/admin/composer/:hashid",
      "conditional":"isAdmin",
      "handles": ['admin']
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
