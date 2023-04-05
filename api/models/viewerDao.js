const dataSource = require("./dataSource");

const getViewerUserBooks = async (userId, bookId, type) => {
  const [userBooks] = await dataSource.query(
    `SELECT 
        GROUP_CONCAT(single_volume_id) AS id
     FROM 
        ${type}
     WHERE 
        user_id = ${userId};
    `
  );

  const result = await dataSource.query(
    `SELECT 
        books.id AS book_id,
        books.title,
        books.author,
        books.publisher,
        JSON_ARRAYAGG(
    JSON_OBJECT(
        'single_volumes_id', single_volumes.id,
        'book_image_url', single_volumes.book_image_url,
        'name', single_volumes.name,
        'sequence', single_volumes.sequence,
        'single_volume_page_count', 
        (
          SELECT 
            COUNT(id)
          FROM 
            single_volume_pages
          WHERE 
            single_volume_pages.single_volume_id = single_volumes.id
        ),'pages', 
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', single_volume_pages.id,
                'image_url', single_volume_pages.image_url,
                'name', single_volume_pages.name,
                'sequence', single_volume_pages.sequence
              )
            )
          FROM 
            single_volume_pages
          WHERE 
            single_volume_pages.single_volume_id = single_volumes.id
        )
      )
    ) AS volumes
  FROM 
    books
  LEFT JOIN 
    single_volumes ON books.id = single_volumes.book_id
  WHERE 
    single_volumes.id IN (${userBooks.id})
  AND 
    books.id = ${bookId}
  GROUP BY 
    books.id
          `
  );
  return result;
};

module.exports = {
  getViewerUserBooks,
};
