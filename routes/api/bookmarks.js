const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const bookmarks = require("../../src/bookmarks");

//create bookmark
router.post("/", (req, res) => {
	const newBookmark = {
		id: uuid.v4(),
		name: req.body.name,
		source: req.body.source,
		category: req.body.category,
	};
	if (!newBookmark.name || !newBookmark.source || !newBookmark.category) {
		return res
			.status(400)
			.json({ msg: "Please include a name, source, and category" });
	}

	bookmarks.push(newBookmark);

	res.json(bookmarks);
});

//update a member
router.put("/:id", (req, res) => {
	const found = bookmarks.some(
		(bookmark) => bookmark.id === parseInt(req.params.id)
	);

	if (found) {
		const updBookmark = req.body;
		bookmarks.forEach((bookmark) => {
			if (bookmark.id === parseInt(req.params.id)) {
				bookmark.name = updBookmark.name ? updBookmark.name : bookmark.name;
				bookmark.source = updBookmark.source
					? updBookmark.source
					: bookmark.source;
				bookmark.category = updBookmark.category
					? updBookmark.category
					: bookmark.category;
				res.json({ msg: "Bookmark updated", bookmark });
			}
		});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

//Delete single bookmark
router.delete("/:id", (req, res) => {
	const found = bookmarks.some(
		(bookmark) => member.id === parseInt(req.params.id)
	);
	if (found) {
		res.json({
			msg: "Bookmark deleted",
			members: bookmarks.filter(
				(bookmark) => bookmark.id !== parseInt(req.params.id)
			),
		});
	} else {
		res
			.status(400)
			.json({ msg: `No bookmark with the id of ${req.params.id}` });
	}
});

//Gets single member -- API
router.get("/:id", (req, res) => {
	const found = bookmarks.some(
		(bookmark) => bookmark.id === parseInt(req.params.id)
	);
	if (found) {
		res.json(
			bookmarks.filter((bookmark) => bookmark.id === parseInt(req.params.id))
		);
	} else {
		res
			.status(400)
			.json({ msg: `No bookmarks with the id of ${req.params.id}` });
	}
});

//Gets all members -- API
router.get("/", (req, res) => res.json(bookmarks));

module.exports = router;
