const Mouse = require('../models/mouse.js') //import the mouse model into this file

const index = async (req, res) => {
    res.render("index.ejs");
};

const miceIndex = async (req, res) => {
    const allMice = await Mouse.find({});
    console.log(allMice); // log the mice!
    res.render("mice/index.ejs", { mice: allMice });
};

const newMice = (req, res) => {
    res.render("mice/new.ejs");
};

const showMice = async (req, res) => {
    const foundMice = await Mouse.findById(req.params.miceId);
    res.render("mice/show.ejs", { mice: foundMice });
};

const createMice = async (req, res) => {
    if (req.body.isReadyToClick === "on") {
        req.body.isReadyToClick = true;
    } else {
        req.body.isReadyToClick = false;
    }
    await Mouse.create(req.body);
    res.redirect("/mice");
};

const deleteMice = async (req, res) => {
    await Mouse.findByIdAndDelete(req.params.miceId);
    res.redirect("/mice");
};

const editMice = async (req, res) => {
    const foundMice = await Mouse.findById(req.params.miceID);
    console.log(foundMice);
    res.render(`mice/edit.ejs`, {
        mice: foundMice,
    });
};

const updateMice = async (req, res) => {
    if (req.body.isReadyToClick === "on") {
        req.body.isReadyToClick = true;
    } else {
        req.body.isReadyToClick = false;
    }
    await Mouse.findByIdAndUpdate(req.params.miceId, req.body);
    res.redirect(`/mice/${req.params.miceId}`);
};

module.exports = {
    index,
    newMice,
    miceIndex,
    showMice,
    createMice,
    deleteMice,
    editMice,
    updateMice
};