module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "categorizer",
          "type": "coreHtml",
          "template": "admin/content/settings/categorizer/categorizer.html",
          "model": "admin/settings/categorizer",
          "blocks": []
        }
      }
    ]
  }
}
