const express = require("express");
const bookmarks = express.Router();
const { getAllBookmarks } = require("../queries/bookmarks")
const { getBookmark } = require("../queries/bookmarks")
const { createBookmark } = require("../queries/bookmarks")
const { checkName } = require("../validations/checkBookmarks.js");

// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if(allBookmarks[0]){
    res.status(200).json(allBookmarks)
  } else {
    res.status(500).json({ error: "server error" })
  }
});

bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params
  try{
    const oneBookmark = await getBookmark(id)
    // console.log(oneBookmark)
    if(oneBookmark.id){
      res.status(200).json(oneBookmark)
    } else {
      res.status(500).json({ error: "not found" })
    }
  } catch (error) {
    console.log(error)
  }
})

bookmarks.post("/", checkName, async (req, res) => {
  const { body } = req
  try {
    const createdbookmark = await createBookmark(body);
    if(createdbookmark.id){
      res.json(createdbookmark);
    } else {
      res.status(500).json({ error: "not found" })
    }
  } catch (error) {
    res.status(400).json({ error: "Bookmark creation error!" });
  }
})

module.exports = bookmarks;