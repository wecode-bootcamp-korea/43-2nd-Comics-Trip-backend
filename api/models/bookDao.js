const dataSource = require("./dataSource");

const getBooksByGenre = async (genreId) => {
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
  );
};

const getBestBooks = async () => {
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
  );
};

const getRecommendedList = async (bookId) => {
  return await dataSource.query(
    `SELECT
      b.id,
      b.title,
      AVG(r.rating) AS avgRating
    FROM books b
    INNER JOIN book_genre bg ON b.id = bg.book_id
    INNER JOIN reviews r ON b.id = r.book_id
    WHERE bg.genre_id IN (
      SELECT genre_id
      FROM book_genre
      WHERE book_id = ?
    )
    GROUP BY b.id
    ORDER BY AVG(r.rating) DESC;
    `,
    [bookId]
  );
};
const getBookDetailById = async (bookId) => {
  return await dataSource.query(
    `SELECT
      b.id,
      b.title,
      b.author,
      b.publisher,
      (
        SELECT 
          book_image_url
		    FROM 
          single_volumes sv2
		    WHERE 
          sv2.book_id = b.id
			  AND 
          sv2.sequence = (
    	      SELECT 
              MAX(sequence)
    	      FROM 
              single_volumes sv3
    	      WHERE 
              sv3.book_id = b.id
		      )
	    ) AS image,
      AVG(r.rating) AS bookRate,
      (
        SELECT 
          COUNT(*) 
        FROM 
          single_volumes sv 
        WHERE 
          sv.book_id = b.id
      ) AS single_volume_number,
      (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', sv.id,
                'rental_price', sv.rental_price, 
                'owner_price', sv.owner_price,
                'published_date', sv.published_date,
                'book_image', sv.book_image_url,
                'name', sv.name,
                'sequence', sv.sequence,
                'single_volume_pages', (
                    SELECT 
                      COUNT(id)
                    FROM 
                      single_volume_pages
                    WHERE 
                      single_volume_id = sv.id
                ),
                'discount', d.discount_rate,
                'discount_rental_price', sv.rental_price * (100 - d.discount_rate) / 100,
                'discount_owner_price', sv.owner_price * (100 - d.discount_rate) / 100
            )
        )
        FROM 
          single_volumes sv
        LEFT JOIN 
          discounts d ON d.book_id = sv.book_id
        WHERE 
          sv.book_id = b.id
    ) AS single_volumes,
    (
        SELECT 
          GROUP_CONCAT(DISTINCT g.genre ORDER BY g.genre ASC SEPARATOR ', ') 
        FROM 
          genres g
        JOIN 
          book_genre bg ON bg.genre_id = g.id
        WHERE 
          bg.book_id = b.id
    ) AS genres,
    (
        SELECT 
          COUNT(*) 
        FROM 
          single_volumes sv 
        WHERE 
          sv.book_id = b.id
    ) AS single_volume_number
    FROM 
      books b
    JOIN 
      single_volumes sv ON sv.book_id = b.id
    LEFT JOIN 
      reviews r ON r.book_id = b.id
    WHERE 
      b.id = ${bookId}
    GROUP BY 
      b.id;
        `
  );
};

const createRentalBookById = async (values, bookId) => {
  const result = await dataSource.query(
    `INSERT INTO 
        rentals 
        (
        user_id,
        single_volume_id,
        rental_status_id
        ) 
      VALUES 
        ${values}
          `
  );
  await dataSource.query(
    `UPDATE 
      rentals
    SET 
      return_date = DATE_ADD(created_at, INTERVAL 3 DAY)
    WHERE 
      single_volume_id IN (?)
          `,
    [bookId]
  );
  return result;
};
const createOwnerBookById = async (values) => {
  return await dataSource.query(
    `INSERT INTO 
        owners 
        (
        user_id,
        single_volume_id,
        owner_status_id
        ) 
      VALUES 
        ${values}
          `
  );
};

const deductPointsFromUser = async (userId, bookIds, type) => {
  const [sumPrice] = await dataSource.query(
    `SELECT 
      SUM(${type}) as price 
    FROM 
      single_volumes
    WHERE 
      id IN (${bookIds})  
          `
  );
  const price = sumPrice.price;
  const deductPoints = await dataSource.query(
    `UPDATE 
      users
     SET 
      point = point - ?
    WHERE 
      id = ?
          `,
    [price, userId]
  );

  return deductPoints;
};

const isInCollection = async (userId, bookIds) => {
  const isIn = await dataSource.query(
    `SELECT id
    FROM owners
    WHERE user_id = ${userId}
    AND single_volume_id IN (${bookIds})
    
    UNION ALL
    
    SELECT id
    FROM rentals
    WHERE user_id = ${userId}
    AND single_volume_id IN (${bookIds})
          `
  );
  return !!isIn.length;
};

module.exports = {
  getBooksByGenre,
  getBestBooks,
  getRecommendedList,
  getBookDetailById,
  createRentalBookById,
  createOwnerBookById,
  deductPointsFromUser,
  isInCollection,
};
