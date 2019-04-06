// require data.json
const data = require("./data.json");

// require express
const express = require("express");

const projects = data.projects;

// call express
const app = express();

// setup middleware, tell express to use pug
app.set("view engine", "pug");

// use a static route and the express.static method to serve the static files located in the public folder
app.use("/static", express.static("public"));

//An "index" route (/) to render the "Home" page with the locals set to data.projects
app.get("/", (req, res) => {
        res.render("index", { projects } );
});

//An "about" route (/about) to render the "About" page
app.get("/about", (req, res) => {
        res.render("about");
});

//Dynamic "project" routes (/project or /projects) based on the id of the project that render a customized version of the Pug project 
app.get("/project/:id", (req, res) => {
        const id = req.params.id;
        const allProject = projects[id];
        res.render("project", allProject);
});



//template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.


app.use((req, res, next) => {
        const err = new Error("Not Found");
        console.log("Sorry, this page doesn't exist!");
        err.status = 404;
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

/*
app.use((err, req, res, next) => {
        res.locals.error = err;
        if (err.status >= 100 && err.status < 600)
                res.status(err.status);
        else
                res.status(500);
        res.render('error');
});
*/