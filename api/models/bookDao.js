const dataSource = require('./dataSource')

const getBooksByGenre = async(genreId) => {
  return await dataSource.query(
    `SELECT
    g.id AS genre_id,
    g.genre AS genre,
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', b.id,
          'title', b.title,
          'writer', b.author,
          'rating', b.avg_rating
        )
      )
      FROM (
        SELECT
          b.id,
          b.title,
          b.author,
          AVG(r.rating) AS avg_rating
        FROM
          books b
          INNER JOIN book_genre bg ON b.id = bg.book_id
          INNER JOIN genres g ON bg.genre_id = g.id
          LEFT JOIN reviews r ON b.id = r.book_id
        WHERE
          g.id = g.id IN (?)
        GROUP BY
          b.id, b.title, b.author
      ) b
    ) AS list
  FROM genres g
  WHERE g.id IN (?)
   `,
    [genreId, genreId]
  )
}


const getBestBooks = async() => {
  return await dataSource.query(
    `SELECT
      b.id,
      b.title,
      b.author,
      b.publisher,
      AVG(r.rating) as avgRating,
      COUNT(o.id) as ownerRatio

    FROM books b
    INNER JOIN reviews r ON b.id = r.book_id
    INNER JOIN owners o ON b.id = o.single_volume_id
    GROUP BY b.id
    HAVING avgRating >= 4 AND avgRating <= 5
    ORDER BY ownerRatio DESC
    LIMIT 9
    `
  )
}


module.exports = {
  getBooksByGenre,
  getBestBooks
}