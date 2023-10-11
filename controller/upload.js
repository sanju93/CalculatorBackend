let Gallery = require("../models/Gallery");
let Audio = require("../models/audio");
let User = require("../models/user");
let Video = require("../models/Videos");
let Document = require('../models/documents');
const { disconnect } = require("mongoose");
module.exports.Upload = async (req, res) => {
  try {
   let gallery = await Gallery.create({
      name: req.files.gallery.name,
    });

    let user = await User.findById(req.user.id);

    user.Gallery.push(gallery.id);
    user.save();
    let path = __dirname + "/../uploads/gallery/" + req.files.gallery.name;
    let file = req.files;
    file.gallery.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.send("file uploaded");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

module.exports.Audio = (req, res) => {
  try {
    let path = __dirname + "/../uploads/music/" + req.files.music.name;
    req.files.music.mv(path, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }

      let audio = await Audio.create({
        name: req.files.music.name,
      });

      let user = await User.findById(req.user.id);

      user.audio.push(audio.id);
      user.save();

      return res.status(200).end();
    });
  } catch (err) {
    console.log(err);
    return res.status(501).end();
  }
};

module.exports.video = async (req, res) => {
  let name = req.files.video.name;
  let path = __dirname + "/../uploads/videos/" + name;

  try {
   
      req.files.video.mv(path, async (err) => {
        if (err) {
          return res.status(500).end();
        }

        let video = await Video.create({ name: name });

        let user = await User.findById(req.user.id);

        user.videos.push(video.id);
        user.save();

        return res.status(200).end();
      });
    
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};


module.exports.Document =  (req,res) => {
  try{
    let name = req.files.document.name;
    let path = __dirname + '/../uploads/documents/' + name;

    req.files.document.mv(path,async function(err){
      if (err){
        return res.status(500).send("Internal server error");
      }

      let document = await Document.create({
        name : name
      });

      let user = await User.findById(req.user.id);

      user.documents.push(document.id);
      user.save();

      return res.status(200).end();
    })
  }catch(err)
  {
    return res.status(500).send("Internal server error");
  }
}
