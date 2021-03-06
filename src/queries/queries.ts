const queries = {
    addNewCard: `INSERT INTO card set ?`,
    getAllCards: `SELECT * FROM card ORDER BY category`,
    getRandomCard: `SELECT category, sideA, sideB FROM card ORDER BY RAND() LIMIT 1`,
    getRandomCardWithCategory: `SELECT category, sideA, sideB FROM card WHERE category=? ORDER BY RAND() LIMIT 1`,
};

export default queries;
