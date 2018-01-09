let express = require("express");
let router = express.Router();
let fs = require("fs");
let path = require("path");

router.all("*", function(req, res, next) {
  switch (req.body.result.action) {
    case "desserts":
      fs.readFile(path.join(__dirname, "sushibase.json"), "utf8", function(
        err,
        data
      ) {
        if (err) {
          return console.log(err);
        }
        var sushibase = JSON.parse(data).filter(el => {
          return el.id_category_default == 294;
        });
        if (sushibase.length) {
          res.json({
            speech:
              "Voici des exemples de desserts: " +
              sushibase
                .map(d => {
                  return d.name;
                })
                .slice(0,3)
                .join(", "),
            source: "webhook"
          });
        } else {
          res.json({
            speech: "je n'ai pas trouvé de desserts prenez donc un autre sushi plutôt",
            source: "webhook"
          });
        }
      });

      break;
      
      case "sushis":
      fs.readFile(path.join(__dirname, "sushibase.json"), "utf8", function(
        err,
        data
      ) {
        if (err) {
          return console.log(err);
        }
        var sushibase = JSON.parse(data).filter(el => {
          return el.id_category_default == 111
        });
        if (sushibase.length) {
          res.json({
            speech:
              "Voici une sélection de nos sushis: " +
              sushibase
                .map(d => {
                  return d.name;
                })
                .slice(0,6)
                .join(", "),
            source: "webhook"
          });
        } else {
          res.json({
            speech: "Je n'ai pas réussis à récupérer les sushis",
            source: "webhook"
          });
        }
      });
    
      break;

      default:
      res.json({
        speech: "Je n'ai pas compris",
        source: "webhook"
      });
  
    }
});

module.exports = router;
