const {db} = require("../utils/admin");

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
  console.log(typeof(request.body.email));

  if (request.body == null) {
    return response.status(400).json({body: "Must not be empty"});
  }

  if (request.body.email == null || request.body.email.trim() === "") {
    return response.status(400).json({email: "Must not be empty"});
  }

  if (request.body.blood_type == null || request.body.blood_type.trim() === "") {
    return response.status(400).json({email: "Must not be empty"});
  }

  const newDonor = {
    email: request.body.email,
    blood_type: request.body.blood_type,
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
