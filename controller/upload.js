let Gallery = require("../models/Gallery");
let Audio = require("../models/audio");
let User = require("../models/user");
let Video = require("../models/Videos");
let Document = require('../models/documents');

module.exports.Upload = async (req, res) => {
  let name = req.files.gallery.name;
  let index = name.lastIndexOf('.');

  name = name.substring(0,index) + Date.now() + name.substring(index,name.length);
  let path = __dirname + "/../uploads/gallery/" + name;
 
 
    req.files.gallery.mv(path, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      try{
        let gallery = await Gallery.create({
          name
        });
    
        let user = await User.findById(req.user.id);
    
        user.Gallery.push(gallery.id);
        user.save();
  
        return res.status(200).send("file uploaded");
      }catch(err){

        console.log(err);
        return res.status(500).end("Internal server Error");

      }
     
    });
  
};

module.exports.Audio = (req, res) => {
  try {
    let name = req.files.music.name;

    let index = name.lastIndexOf('.');


    name = name.substring(0,index) + Date.now() + name.substring(index,name.length);
   

    let path = __dirname + "/../uploads/music/"  + name;
    req.files.music.mv(path, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }

      let audio = await Audio.create({
        name
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

  let index = name.lastIndexOf('.');


  name = name.substring(0,index) + Date.now() + name.substring(index,name.length);
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
    let index = name.lastIndexOf('.');


    name = name.substring(0,index) + Date.now() + name.substring(index,name.length);
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
