const express = require('express');
const router = express.Router();
const db = require('../config/config'); // Asume que aquí configuras tu conexión a la base de datos

router.get('api/getDrivers', async (req, res) => {
  try {
    const [drivers] = await db.query(`
      SELECT users.name, users.lastname 
      FROM users
      INNER JOIN user_has_roles ON users.id = user_has_roles.id_user
      INNER JOIN roles ON user_has_roles.id_rol = roles.id
      WHERE roles.name = 'Conductor' 
    `);

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
