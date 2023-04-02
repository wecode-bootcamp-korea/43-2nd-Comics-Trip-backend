const dataSource = require("./dataSource");

const createUser = async (kakaoid, email, age, gender) => {
  return dataSource.query(
    `
    INSERT INTO users(
      kakao_id,
      email,
      age,
      gender,
      point
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      100000
    )
    `,
    [kakaoid, email, age, gender]
  );
};

const getUserbyKakaoId = async (kakaoId) => {
  const [result] = await dataSource.query(
    `SELECT
      u.id,
      u.kakao_id AS kakaoid
    FROM 
      users AS u
    WHERE 
      u.kakao_id = ?`,
    [kakaoId]
  );
  return result;
};

const checkUserId = async (userId) => {
  const [result] = await dataSource.query(
    `SELECT
        id,
        kakao_id,
        email,
        age,
        gender
      FROM
        users
      WHERE
        id=?
        `,
    [userId]
  );
  return result;
};

module.exports = {
  createUser,
  getUserbyKakaoId,
  checkUserId,
};
