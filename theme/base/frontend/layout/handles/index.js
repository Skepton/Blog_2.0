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
      "handles": ['admin','admin/composer']
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
    },
    //admin
    {
      "path":"/admin/composer/save/:hashid",
      "model": "admin/composer/save"
    },
    {
      "path":"/admin/composer/delete/:hashid",
      "model": "admin/composer/delete"
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
