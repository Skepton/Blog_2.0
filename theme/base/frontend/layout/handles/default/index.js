module.exports = {
  "blocks": [
    {
      "name": "root",
      "type": "root",
      "template": "1column.html",
      "blocks": [
        {
          "name": "header",
          "type": "content",
          "template": "header.html",
          "blocks": [
            {
              "name": "headerContent",
              "type": "content",
              "template": "header-content.html",
              "blocks": []
            }
          ]
        },
        {
          "name":"content",
          "type": "content",
          "template": "content.html",
          "blocks": []
        }
      ]
    }
  ]
}
