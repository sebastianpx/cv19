const {db} = require("../utils/admin");
const functions = require("firebase-functions");


const donorCollection = "donor";
exports.getAllDonors = (request, response) => {
  db
      .collection(donorCollection)
      .get()
      .then((data) => {
        const todos = [];
        data.forEach((doc) => {
          todos.push({
            donorId: doc.id,
            email: doc.data().email,
            bloodType: doc.data().bloodType,
            zipCode: doc.data().zipCode,

          });
        });
        return response.json(todos);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

exports.createDonor = (request, response) => {
  functions.logger.log("Hello here is the body:", request.body);

  if (request.body == null) {
    return response.status(400).json({body: "Must not be empty"});
  }

  if (request.body.email == null || request.body.email.trim() === "") {
    return response.status(400).json({email: "Must not be empty"});
  }

  if (request.body.bloodType == null ||
      request.body.bloodType.trim() === "") {
    return response.status(400).json({bloodType: "Must not be empty"});
  }

  if (request.body.zipCode == null ||
        request.body.zipCode.trim() === "") {
    return response.status(400).json({zipCode: "Must not be empty"});
  }

  const newDonor = {
    email: request.body.email,
    bloodType: request.body.bloodType,
    zipCode: request.body.zipCode,
    createdAt: new Date().toISOString(),
  };
  db
      .collection(donorCollection)
      .add(newDonor)
      .then((doc)=>{
        const responseDonor = newDonor;
        responseDonor.id = doc.id;
        return response.json(responseDonor);
      })
      .catch((err) => {
        response.status(500).json({error: "Something went wrong"});
        console.error(err);
      });
};
