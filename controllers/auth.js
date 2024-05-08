const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");

const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

const { userModel } = require("../models");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };

    const dataUser = await userModel.create(body);

    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await userModel
      .findOne({ email: req.email })
      .select("password name role email");

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "INVALID_PASSWORD", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerCtrl, loginCtrl };
