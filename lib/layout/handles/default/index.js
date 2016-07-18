module.exports = {
  "blocks": [{
    "root": {
      "name": "root",
      "type": "root",
      "template": "1column.html",
      "blocks": [{
        "header": {
          "name": "header",
          "type": "content",
          "template": "header.phtml"
        },
        "content": {
          "name":"content",
          "type": "content",
          "template": "content.html"
        }
      }]
    }
  }]
};