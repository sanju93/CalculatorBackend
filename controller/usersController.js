let User = require("../models/user");
let jwt = require("jsonwebtoken");
let Gallery = require("../models/Gallery");
let Audio = require("../models/audio");
let fs = require("fs");
let mm = require("musicmetadata");
let Video = require("../models/Videos");
let Documents = require("../models/documents");

module.exports.signIN = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      if (password == user.password) {
        let token = jwt.sign({ user }, "sanjay", { expiresIn: "1d" });
        return res.status(200).json({ token, user });
      } else {
        return res.status(401).json({ user: null, token: null });
      }
    } else {
      return res.status(501).json({ user: null, token: null });
    }
  } catch (err) {
    return res.status(500).json({ user: null, token: null });
  }
};

module.exports.SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(300).json({ user: null });
    } else {
      user = await User.create({
        name: name,
        email: email,
        password: password,
        CalcPass: "NA",
      });

      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ user: null });
  }
};

module.exports.newUser = (req, res) => {
  if (req.user) {
    if (req.user.CalcPass === "NA") {
      return res.status(200).json({ user: true });
    } else {
      return res.status(200).json({ user: false });
    }
  }
};

module.exports.setCalsPass = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    user.CalcPass = req.body.password;
    user.save();
    return res.status(200).json({ data: true, user });
  } catch (err) {
    return res.status(301).json({ data: false });
  }
};

// images

module.exports.Images = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    let images = user.Gallery;
    let gallery = [];
    for (let i = 0; i < images.length; i++) {
      let image = await Gallery.findById(images[i]);

      gallery.push({ name: image.name });
    }

    return res.status(200).send(gallery);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ images: [] });
  }
};

module.exports.Image = async (req, res) => {
  let path = __dirname + "/../uploads/gallery/" + req.params.name;

  if (fs.existsSync(path)) {
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename = " + req.params.name,
    });

    fs.createReadStream(path).pipe(res);
    return;
  }

  res.writeHead(400, { "Content-Type": "text/plain" });
  res.end("ERROR File does not exist");
};

module.exports.Musics = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let musics = user.audio;
    let music = [];
    for (let i = 0; i < musics.length; i++) {
      let audio = await Audio.findById(musics[i]);
      music.push({ name: audio.name });
    }

    return res.status(200).send(music);

    // let audio = await Audio.find({});
    // return res.status(200).json({ audio });
  } catch (err) {
    return res.status(500).end("Internal Server Error");
  }
};

module.exports.Music = async (req, res) => {
  let range = req.headers.range;


  if (!range) {
    res.status(400).send("requires range");
  }

  let path = __dirname + "/../uploads/music/" + req.params.name;

  let musicSize = fs.statSync(path).size;

  const CHUNK_SIZE = 1024 * 1024;

  const start = Number(range.replace(/\D/g, ""));

  const end = Math.min(start + CHUNK_SIZE, musicSize - 1);
  let contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${musicSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/*",
  };

  res.writeHead(206, headers);

  let musicStream = fs.createReadStream(path, { start, end });
  musicStream.pipe(res);
};

module.exports.Thumbnail = async (req, res) => {
  let path = __dirname + "/../uploads/music/" + req.params.name;

  let parser = new mm(fs.createReadStream(path), function (err, metadata) {
    if (err) {
      console.log(err);
    }
    // res.writeHead(200, {
    //   "Content-Type": "application/octet-stream",
    //   "Content-Disposition": "attachment; filename = " + req.params.name,
    // });
     if (metadata.picture.length !== 0){
     
      // res.status(200).json({picture : metadata.picture[0].data,title : metadata.title,album : metadata.album,duration : metadata.duration})
       return res.status(200).end(metadata.picture[0].data);
    
     }else{
      return res.status(500).end("error in finding the thumbnail");
     }
   
  });
};

module.exports.videos = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let video = user.videos;
    
    let Data = [];
    for (let i = 0; i < video.length; i++) {
      let videos = await Video.findById(video[i]);
      Data.push({ name: videos.name });
    }
    return res.status(200).send(Data);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
module.exports.VideoOne = async (req, res) => {
  let path = __dirname + "/../uploads/videos/" + req.params.name;

  if (fs.existsSync(path)) {
    let range = req.headers.range;

    if (!range) {
      return res.status(400).send("requires range");
    } else {
      //video size
      let videoSize = fs.statSync(path).size;

      //chunk size

      const CHUNK_SIZE = 5 * 1024 * 1024;

      //start byte

      let start = Number(range.replace(/\D/g, ""));
      //end
      let end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      let contentLength = end - start + 1;

      let headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/*",
      };

      res.writeHead(206, headers);

      fs.createReadStream(path, { start, end }).pipe(res);
    }
  } else {
    return res.status(400).end();
  }
};

module.exports.Documents = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let documents = user.documents;
    let results = [];
    for (let i = 0; i < documents.length; i++) {
      let document = await Documents.findById(documents[i]);
      results.push({ name: document.name });
    }

    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

module.exports.DocumentOne = async (req, res) => {
  let name = req.params.name;
  let path = __dirname + "/../uploads/documents/" + name;
  if (fs.existsSync(path)) {
    let data = fs.readFileSync(path);

    res.status(200).send(data);
    return;
  } else {
    return res.status(400).end();
  }
};

//deleting

module.exports.Delete_Video =  (req,res) => {
  let {name} = req.query;
  if (fs.existsSync(__dirname + `/../uploads/videos/${name}`)){
    fs.unlink(__dirname + `/../uploads/videos/${name}`,async (err) => {
        if (err){
          console.log(err);
          return res.status(500).send("Internal server error");
        }else{

         let deleted_video = await Video.findOneAndDelete({name : name});
         let user = await  User.findById(req.user.id);
         let index = user.videos.indexOf(deleted_video.id);
         user.videos.splice(index,1);
        
         user.save();

          return res.status(200).send("video deleted");

        }

       
    })
  }else{
    return res.status(404).send("file doesn't exist");
  }
 
}


module.exports.Delete_Music = (req,res) => {
  let {name} = req.query;
  let path = __dirname + `/../uploads/music/${name}`;

  if (fs.existsSync(path)){
      fs.unlink(path,async (err) => {
        if(err){
          console.log(err);
          return res.status(500).send("Error occuring deleting the file");
        }

        try{

          let music = await Audio.findOneAndDelete({name : name});

          let user = await User.findById(req.user.id);

          let index = user.audio.indexOf(music.id);

          user.audio.splice(index,1);
          user.save();
         
         // user.audio = user.audio.filter((item) => item._id != music._id);
         // console.log(user.audio);
         // user.save();
          return res.status(200).send("Music Deleted Successfully");

        }catch(err){

          return res.status(500).send("internal server error");

        }

       
      })
  }else{

    return res.status(500).send("Internal server Error");

  }
}



