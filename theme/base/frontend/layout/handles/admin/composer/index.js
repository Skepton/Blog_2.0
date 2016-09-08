module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "composer",
          "type": "coreHtml",
          "model": "admin/composer",
          "template": "admin/content/composer/composer.html",
          "blocks": []
        }
      }
    ]
  }
}
