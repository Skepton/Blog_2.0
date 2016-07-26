module.exports = {
  "blocks": [
    {
      "name": "root",
      "type": "coreHtml",
      "template": "1column.html",
      "blocks": [
        {
          "name": "header",
          "type": "coreHtml",
          "template": "header.html",
          "blocks": [
            {
              "name": "headerContent",
              "type": "coreHtml",
              "template": "header-content.html",
              "blocks": []
            }
          ]
        },
        {
          "name":"content",
          "type": "blockList",
          "blocks": []
        }
      ]
    }
  ]
}
