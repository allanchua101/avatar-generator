const { AvatarGenerator } = require("random-avatar-generator");
const fs = require("fs");
const https = require("https");
const colors = require("colors"); // Added to access color utilities.
const Font = require("ascii-art-font"); // Added to render awesome fonts

// Configured to reference any font i like.
Font.fontPath = "./fonts/";

const generator = new AvatarGenerator();
const avatarURL = generator.generateRandomAvatar();

// Function used for rendering font.
const getFont = (str) => {
  return new Promise((resolve) => {
    Font.create(str, "Doom", function (err, result) {
      resolve(result);
    });
  });
};

https.get(avatarURL, (res) => {
  const path = `./files/avatar.svg`;
  const filePath = fs.createWriteStream(path);
  res.pipe(filePath);

  filePath.on("finish", async () => {
    filePath.close();

    // Generate ascii art.
    let logs = await getFont("Success");

    console.log(`\n${logs}\n`.green); // .green.bgBrightWhite Added for color manipulation
  });
});
