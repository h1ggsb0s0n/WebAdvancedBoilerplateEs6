import account from "../Model/account.js"
import express from "express";
import config from "../config.js";
import jwt from "jsonwebtoken";
import validateUser from "../Middleware/ValidateUser.js";

function setup(app, port, mongoose) {
  app.use(express.json());
  app.listen(port, () => {
    mongoose;
    console.log(`App listening at http://localhost:${port}.`);
  });

    /*
    //Erstelle einn Account
    app.post("/account/create", async (req, res) => {
      const body = req.body;
      try {
        const ret = await account.create(body);
        res.status(201).send(ret);
      } catch (error) {
        res.status(204).send("Account konnte nicht generiert werden");
      }
    });*/


    //Hole Einen Account
    app.get("/account/:id",validateUser, async (req, res) => {
      const id = req.params.id;
      try {
        const ret = await account.findById(id);
        res.status(201).send(ret);

      } catch (error) {
        res.status(204).send("Der Account konnte nicht zurückgegeben werden.");
      }
    });


//Überschreibt einn accoutn
app.put("/account/update/:id", validateUser, async (req, res) => {
  var id = req.params.id;
  const body = req.body;

  // nur prüfung auf leeren Body nicht auf ungültige
  try {
    const ret = await account.findByIdAndUpdate( id ,  body ,{ new: true,overwrite:true} );
    res.status(201).send(ret);
  } catch (error) {
    res.status(200).send("Der Account konnte nicht überschrieben werden");
  }
 
});

//Aktualisert einen Account
app.patch("/account/update/:id", validateUser,async (req, res) => {
  const id = req.params.id;
  const body = req.body;

   // nur prüfung auf leeren Body nicht auf ungültige
   try {
      const ret = await account.findByIdAndUpdate( id ,  body ,{ new: true} );
      res.status(201).send(ret);
    } catch (error) {
      res.status(200).send("Der Account konnte nicht überschrieben werdcen");
    }

});

//Löscht einen Account
app.delete("/account/delete/:id",validateUser, async (req, res) => {
  const id = req.params.id;
  try {
      const ret = await account.deleteOne( {_id: id} );
      res.status(202).send(ret);
    } catch (error) {
      res.status(200).send("Der Account konnte nicht gelöscht werden");
    }

  });



/*
--------------------- Unimplemented methdos
*/

  app.post("/user/signup", async (req, res) => {
    const body = req.body;
    try {
      let user = await account.findOne({ email: body.email});

      if (!user) {

        const newUser = await account.create(body);
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, config.tokenPw, {
          expiresIn: "24h",
        });

        return res.status(200).json({ msg: "you're successfully registered", token });
      } else{
        return res
      .status(422)
      .json({ errors: ["this email is already registered "] });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: ["some error occured"] });
    }
  });


    

  //Sign in
  app.post("/account/signin", async (req, res) => {
    const { email, password } = req.body;

  try {
    let user = await account.findOne({ email });

    if (!user) return res.status(422).json({ errors: ["no such user exists"] });

    if (await user.comparePassword(password)) {
      const token = jwt.sign({ id: user._id }, config.tokenPw, {
        expiresIn: "24h",
      });

      return res.status(200).json({ msg: "user logged in", token });
    }

    return res.status(403).json({ errors: ["invalid password"] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: ["some error occured"] });
  }
  });

  //recover
  app.post("/account/recover", async (req, res) => {
    try {
      res.status(200).send("Not Implemented");
    } catch (error) {
      res.status(200).send("Not Implemented");
    }
  });

  //activete
  app.post("/account/activate", async (req, res) => {
    try {
      res.status(200).send("Not Implemented");
    } catch (error) {
      res.status(200).send("Not Implemented");
    }
  });

}
// Export der funktionen
export default {
  setup,
};
