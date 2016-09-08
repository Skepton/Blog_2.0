module.exports = [
  {
    "type": "get",
    "path": "/",
    "handles": ['default'],
  },
  {
    "type": "get",
    "path": "/register",
    "handles": ['default','userRegister'],
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
            "childRoutes": [
              {
                "type": "get",
                "path": "/add/:parentCategory",
                "handles": ['admin','admin/settings/categorizer/add']
              },
              {
                "type": "post",
                "path": "/add/:parentCategory",
                "model": "admin/settings/categorizer/add/post",
                "handles": ['admin','admin/settings/categorizer/add/post']
              }
            ]
          }
        ]
      },
      {
        "type": "get",
        "path": "/composer/:hashid",
        "handles": ['admin','admin/composer'],
      },
      {
        "type": "post",
        "path": "/composer/save/:hashid",
        "model": "admin/composer/post/save"
      },
      {
        "type": "post",
        "path": "/composer/delete/:hashid",
        "model": "admin/composer/post/delete"
      },
      {
        "type": "setupRedirects",
        "path": "/new/post",
        "model": "admin/newPost/setupRedirects"
      }
    ]
  }
]
