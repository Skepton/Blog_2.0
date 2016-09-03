module.exports = [
  {
    "type": "get",
    "path": "/",
    "handles": ['default'],
    "childRoutes": []
  },
  {
    "type": "get",
    "path": "/register",
    "handles": ['default','userRegister'],
    "childRoutes": []
  },
  {
    "type": "post",
    "path": "/register",
    "model": "userRegister/post"
  },
  {
    "type": "get",
    "path": "/login",
    "handles": ['default','userLogin'],
    "childRoutes": []
  },
  {
    "type": "post",
    "path": "/login",
    "model": "userLogin/post"
  },
  {
    "type": "get",
    "path": "/logout",
    "handles": ['userLogout'],
    "childRoutes": []
  },
  //Admin
  {
    "type": "get",
    "path": "/admin",
    "conditional": "isAdmin",
    "handles": ['admin','admin/postCenter'],
    "childRoutes": [
      {
        "type": "get",
        "path": "/settings",
        "handles": ['admin','admin/settings'],
        "childRoutes": [
          {
            "type": "get",
            "path": "/categorizer",
            "handles": ['admin','admin/settings/categorizer'],
            "childRoutes": []
          }
        ]
      },
      {
        "type": "get",
        "path": "/composer/:hashid",
        "handles": ['admin','admin/composer'],
        "childRoutes": []
      },
      {
        "type": "post",
        "path": "/composer/save/:hashid",
        "model": "admin/composer/save"
      },
      {
        "type": "post",
        "path": "/composer/delete/:hashid",
        "model": "admin/composer/delete"
      },
      {
        "type": "setupRedirects",
        "path": "/new/post",
        "model": "admin/setupRedirects/newPost"
      }
    ]
  }
]
