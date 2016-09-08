module.exports = {
  "name": "admin/root",
  "type": "coreHtml/root",
  "template": "admin/root.html",
  "blocks": [
    {
        "name":"message",
        "type":"flashMessage",
        "template": "admin/message/message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "coreHtml",
      "template": "admin/header/header.html",
      "blocks": []
    },
    {
      "name":"content",
      "type": "blockList",
      "blocks": []
    }
  ]
}
