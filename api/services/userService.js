const jwt = require("jsonwebtoken");
const axios = require("axios");
const userDao = require("../models/userDao");

const kakaoSignin = async (kakaoToken) => {
  const getKakaoToken = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (getKakaoToken.ok) {
    const error = new Error("KAKAO_TOKEN_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const { data } = getKakaoToken;

  const kakaoId = data.id;
  const email = data.kakao_account.email;
  const gender = data.kakao_account.gender;
  const ageRange = data.kakao_account.age_range;
  const ageArr = ageRange.split("~");
  const age = parseInt(ageArr[0], 10);

  const user = await userDao.getUserbyKakaoId(kakaoId);

  let userId;

  if (!user) {
    const newUser = await userDao.createUser(kakaoId, email, age, gender);
    userId = newUser.insertedId;
  } else {
    userId = user.id;
  }
  return jwt.sign({ userId: userId }, process.env.SECRET_KEY);
};

module.exports = {
  kakaoSignin,
};
