import bcrypt from "bcrypt";
import User from "../Models/User.js";
import Place from "../Models/Place.js";
import jwt from "jsonwebtoken";

const salt = await bcrypt.genSalt();
export const jwtSecret = "t9y8hjn4fv6bndf98g7v6b1nd6x6c5vb";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passok = bcrypt.compareSync(password, user.password);
      if (passok) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("pass is not ok");
      }
    }
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

export const getUser = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(data.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

export const allPlaces = async (req, res) => {
  res.json(await Place.find());
};
