module.exports = {
  "name": "admin/root",
  "type": "coreHtml/root",
  "template": "admin-root.html",
  "blocks": [
    {
        "name":"message",
        "type":"flashMessage",
        "template": "message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "coreHtml",
      "template": "header.html",
      "blocks": []
    },
    {
      "name":"content",
      "type": "blockList",
      "blocks": []
    }
  ]
}
