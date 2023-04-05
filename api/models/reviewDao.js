const dataSource = require("./dataSource");

const getReviewList = async (bookId) => {
  const result = await dataSource.query(
    `SELECT
       r.Id,
       r.user_id,
       r.content,
       r.rating,
       r.created_at,
       u.email
     FROM
       reviews r
     LEFT JOIN users u ON r.user_id = u.id
     WHERE 
       book_id = ?
     ORDER BY id DESC
          `,
    [bookId]
  );
  return result;
};

const createReview = async (userId, bookId, content, rating) => {
  return await dataSource.query(
    `INSERT INTO
        reviews
        (
          user_id,
          book_id,
          content,
          rating
        )
     VALUES
        (
          ?,
          ?,
          ?,
          ?
        )
          `,
    [userId, bookId, content, rating]
  );
};

const deleteReview = async (userId, bookId) => {
  return await dataSource.query(
    `DELETE FROM 
        reviews 
     WHERE 
        user_id = ? AND book_id = ?
            `,
    [userId, bookId]
  );
};

module.exports = {
  getReviewList,
  createReview,
  deleteReview,
};
