// require data.json
const data = require("./data.json");

// require express
const express = require("express");

// variable that hold the data of the projects in data.json
const projects = data.projects;

// call express
const app = express();

// setup middleware, tell express to use pug
app.set("view engine", "pug");

// use a static route and the express.static method to serve the static files located in the public folder
app.use("/static", express.static("public"));

// an "index" route (/) to render the "Home" page with the locals set to data.projects
app.get("/", (req, res) => {
        res.render("index", { projects } );
});

// an "about" route (/about) to render the "About" page
app.get("/about", (req, res) => {
        res.render("about");
});

// dynamic "project" routes (/project or /projects) based on the id of the project that render a customized version of the Pug project 
app.get("/project/:id", (req, res) => {
        const id = req.params.id;
        const allProject = projects[id];
        res.render("project", allProject);
});

// create error middleware
app.use((req, res, next) => {
        // new "not found" error
        const err = new Error("Uh oh! There's nothing to see here.");
        // log error to console
        console.log("Sorry, this page doesn't exist!");
        // set error status to 404 status error
        err.status = 404;
        // pass errors to express
        next(err);
});

// check for errors and then when that is complete move on
app.use((err, req, res, next) => {
        res.locals.error = err;
        res.status(err.status)
        res.render("error");
});

// start the server, the port to serve the application on
app.listen(3000, () => {
        // log a string to the console that says which port the app is listening to.
        console.log("Your application is now connected to port 3000!")
});