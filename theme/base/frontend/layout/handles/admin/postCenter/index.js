module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "postCenter",
          "type": "coreHtml",
          "model": "admin/postCenter/list",
          "template": "postCenterList.html",
          "blocks": []
        }
      }
    ]
  }
}
