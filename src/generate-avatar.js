const { AvatarGenerator } = require("random-avatar-generator");
const fs = require("fs");
const https = require("https");

const generator = new AvatarGenerator();
const avatarURL = generator.generateRandomAvatar();

https.get(avatarURL, (res) => {
  const path = `./files/avatar.svg`;
  const filePath = fs.createWriteStream(path);
  res.pipe(filePath);

  filePath.on("finish", () => {
    filePath.close();
    console.log("Avatar creation done!");
  });
});
