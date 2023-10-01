const express = require("express");
const router = express.Router();
const {getAllNotes, createNote, updateNote, deleteNote} = require("../controllers/notes");

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").patch(updateNote).delete(deleteNote);

module.exports = router;