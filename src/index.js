const express = require("express");
const path = require("path");
const hbs = require("hbs");
const PORT = process.env.PORT || 3000;

const app = express();

//paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//init body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static directory
app.use(express.static(publicDirectoryPath));

//API
app.use("/api/bookmarks", require("../routes/api/bookmarks"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//App routes
app.get("", (req, res) => {
	res.render("index", {
		title: "Sign Up/Log In",
		msg: "Currently under construction",
	});
});

//App routes
app.get("/home", (req, res) => {
	res.render("home", {
		name: "Anna Prentice",
		msg: "Home page currently under construction",
	});
});

//app.com/help
app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help!",
		msg: "Help page currently under construction",
	});
});

//app.com/about
app.get("/about", (req, res) => {
	res.render("about", {
		title: "About clusterfu",
		msg: "About page currently under construction",
	});
});

//app.com/help
app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help!",
		msg: "Help page currently under construction",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404!!",
		msg: "This page does not yet exist",
	});
});
