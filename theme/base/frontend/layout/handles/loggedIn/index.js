module.exports = {
  "@reference": {
    "name": "header",
    "type": "content",
    "@actions" : [
      {
        "@modify": {
          "key":"template",
          "value": "new-header.html"
        },
        "@removeChildBlock": {
          "name": "headerContent"
        }
      }
    ]
  }
}
