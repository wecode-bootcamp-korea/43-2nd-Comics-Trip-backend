const dataSource = require("./dataSource");

const getOwnerLibraryBooks = async (userId) => {
  return await dataSource.query(
    `
      SELECT 
        sv.book_id,
        MAX(sv.book_image_url) as book_image_url, 
      COUNT(DISTINCT sv.id) as book_count,
      JSON_ARRAYAGG(
        sv.id  
       )AS single_volume_id_list
      FROM 
        single_volumes sv
      JOIN 
        owners o ON sv.id = o.single_volume_id
      WHERE 
        o.user_id = ?
      GROUP BY 
        sv.book_id
          `,
    [userId]
  );
};

const getRentalLibraryBooks = async (userId) => {
  return await dataSource.query(
    `
      SELECT 
        sv.id as single_volume_id, 
        sv.book_id, 
        sv.book_image_url, 
        r.return_date, sv.sequence
      FROM 
        rentals r
      JOIN 
        single_volumes sv ON r.single_volume_id = sv.id
      WHERE 
        r.user_id = ?
          `,
    [userId]
  );
};

module.exports = {
  getOwnerLibraryBooks,
  getRentalLibraryBooks,
};
