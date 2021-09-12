import account from "../Model/account.js"
import express from "express";


function setup(app, port, mongoose) {
  app.use(express.json());
  app.listen(port, () => {
    mongoose;
    console.log(`App listening at http://localhost:${port}.`);
  });


    //Erstelle einn Account
    app.post("/account/create", async (req, res) => {
      const body = req.body;
      try {
        const ret = await account.create(body);
        res.status(201).send(ret);
      } catch (error) {
        res.status(204).send("Account konnte nicht generiert werden");
      }
    });


    //Hole Einen Account
    app.get("/account/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const ret = await account.findById(id);
        res.status(201).send(ret);

      } catch (error) {
        res.status(204).send("Der Account konnte nicht zurückgegeben werden.");
      }
    });


//Überschreibt einn accoutn
app.put("/account/update/:id", async (req, res) => {
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
app.patch("/account/update/:id",async (req, res) => {
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
app.delete("/account/delete/:id",async (req, res) => {
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



    

  //Sign in
  app.post("/account/signin", async (req, res) => {
    try {
      res.status(200).send("Not Implemented");
    } catch (error) {
      res.status(200).send("Not Implemented");
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
