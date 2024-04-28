const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Db = require("../../models/userDataSchema");

exports.Login = async (req, res) => {
  try {
    const { number, password } = req.body;

    const user = await Db.findOne({ number, isVerified: true });

    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", msg: "User not found or not verified" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ status: "Failed", msg: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: "Failed", msg: error });
  }
};

exports.Signup = async (req, res) => {
  try {
    let { name, email, number, image, role, password } = req.body;

    const formatMatch = image.match(/^data:image\/(\w+);base64,/);
    const base64Data = image.replace(formatMatch[0], "");
    let exten = email.substring(0, email.indexOf("@"));
    const imageName = `image_${exten}.${formatMatch[1]}`;
    const imagePath = path.join(__dirname, "../images", imageName);
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(imagePath, buffer);

    await Db.create({ name, email, number, image: imageName, role, password });

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MyMail,
        pass: process.env.Mail_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MyMail,
      to: email,
      subject: "Account Verification",
      html: `<p>Please click <a href="http://localhost:1234/verify/${token}">here</a> to verify your email address and login.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ status: "Success", mgs: "Mail Sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", mgs: error });
  }
};

exports.VerifyMail = (req, res) => {
  try {
    const token = req.params.token;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res
          .status(400)
          .json({ status: "Failed", msg: "Invalid or expired token" });
      }

      const { email } = decoded;

      const updatedUser = await Db.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );

      if (!updatedUser) {
        console.error("User not found with email:", email);
        return res
          .status(404)
          .json({ status: "Failed", msg: "User not found" });
      }

      res
        .status(200)
        .json({ status: "Success", mgs: "Email verified successfully" });
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", mgs: error });
  }
};

exports.Getdata = async (req, res) => {
  try {
    const userId = req.user.userId;
    let response = await Db.findById(userId);
    console.log(response);

    let exten = response.email.substring(0, response.email.indexOf("@"));
    const parts = response?.image?.split(".");
    const ImgExt = parts[parts.length - 1];

    const imagePath = path.join(
      __dirname,
      "../images",
      `image_${exten}.${ImgExt}`
    );
    let imageBase64 = "";
    if (fs.existsSync(imagePath)) {
      imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
    }

    (response.image = imageBase64
      ? `data:image/png;base64,${imageBase64}`
      : ""),
      res.status(200).json({
        status: "Success",
        mgs: "Successfully fetched",
        data: response,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", mgs: error });
  }
};

exports.Admindata = async (req, res) => {
  try {
    let response = await Db.find();

    response.forEach((item) => {
      let exten = item.email.substring(0, item.email.indexOf("@"));
      const parts = item?.image?.split(".");
      const ImgExt = parts[parts.length - 1];
      const imagePath = path.join(
        __dirname,
        "../images",
        `image_${exten}.${ImgExt}`
      );
      let imageBase64 = "";
      if (fs.existsSync(imagePath)) {
        imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
      }

      item.image = imageBase64 ? `data:image/png;base64,${imageBase64}` : "";
    });

    res.status(200).json({
      status: "Success",
      mgs: "Successfully fetched",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed", mgs: error });
  }
};

exports.RoleVerify = async (req, res) => {
  try {
    let userId = req.user.userId;

    let response = await Db.findById(userId);
    if (response?.role == "user") throw "not an admin";

    res.status(200).json({
      status: "Success",
      mgs: "Successfully fetched",
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", mgs: error });
  }
};
