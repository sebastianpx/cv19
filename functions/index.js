const functions = require("firebase-functions");
const app = require("express")();

const {
  getAllDonors,
  createDonor,
} = require("./api/donors");


app.get("/donors", getAllDonors);
app.post("/donor", createDonor);

exports.api = functions.https.onRequest(app);
