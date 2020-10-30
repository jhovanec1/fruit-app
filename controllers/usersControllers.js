const express = require('express');
const router = express.Router();

const User = require('../models').User;
const Fruit = require('../models').Fruit;



// Get Users profile
router.get("/profile/:id", (req, res) => {
    // IF USER ID FROM TOKEN MATCHES THE REQUESTED ENDPOINT, LET THEM IN
    if (req.user.id == req.params.id) {
      User.findByPk(req.params.id, {
        include: [
          {
            model: Fruit,
            attributes: ["id", "name"],
          },
        ],
      }).then((userProfile) => {
        res.render("users/profile.ejs", {
          user: userProfile,
        });
      });
    } else {
      // res.json("unauthorized");
      res.redirect("/");
    }
  });
// Edit Profile
router.put('/profile/:id', (req,res)=>{
    User.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    }).then((updatedUser)=>{
        res.redirect(`/users/profile/${req.params.id}`);
    })
})

module.exports = router;