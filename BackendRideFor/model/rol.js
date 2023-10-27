const db = require('../config/config');
const Rol = {};

// Función para crear un nuevo rol para un usuario
Rol.create = (id_user, id_rol, result) => {
    const sql = `
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) => {
            if (err) {
                console.log('Error: ', err);
                result(err, null);
            } else {
                console.log('Rol creado con éxito: ', res.insertId);
                result(null, res.insertId);
            }
        }
    );
};

// Función para actualizar el estado 'is_active' de un rol existente
Rol.updateRoleActiveStatus = (id_user, roleName, isActive, result) => {
    // Verificar si result es una función válida
    if (typeof result === 'function') {
        const sql = `
        UPDATE 
            user_has_roles
        SET 
            is_active = ?
        WHERE 
            id_user = ? AND id_rol = (
            SELECT id FROM roles WHERE name = ?
            )
            `;
            
            db.query(sql, [isActive, id_user, roleName], (err, res) => {
                if (err) {
                    console.log('Error al actualizar el estado del rol:', err);
                    result(err, null);
                } else {
                    console.log(`Estado del rol ${roleName} actualizado con éxito. Resultado:`, res);
                    result(null, res);
                }
            });
        } else {
            console.error('result no es una función válida.');
        }
    };
    
    Rol.findUserRoles = (userId, result) => {
        const sql = `
        SELECT 
            roles.name, user_has_roles.is_active
        FROM 
            roles
        INNER JOIN 
            user_has_roles 
        ON 
            roles.id = user_has_roles.id_rol
        WHERE user_has_roles.id_user = ?
        `;
    
        db.query(sql, [userId], (err, res) => {
            if (err) {
                console.log('Error al obtener los roles del usuario: ', err);
                result(err, null);
            } else {
                console.log('Roles del usuario obtenidos con éxito: ', res);
                result(null, res);
            }
        });
    };

    Rol.deleteInactiveRoles = (userId, rolesToUpdate, result) => {
        const inactiveRolesToDelete = rolesToUpdate
            .filter((role) => !role.isActive) // Filtrar los roles inactivos
            .map((role) => role.roleName); // Obtener solo los nombres de roles
    
        if (inactiveRolesToDelete.length === 0) {
            // No hay roles inactivos para eliminar, simplemente devuelve éxito
            return result(null, { message: 'No se encontraron roles inactivos para eliminar' });
        }
    
        const sql = `
            DELETE FROM user_has_roles
            WHERE id_user = ? AND id_rol IN (
                SELECT id FROM roles WHERE name IN (?)
            )
        `;
    
        db.query(sql, [userId, inactiveRolesToDelete], (err, res) => {
            if (err) {
                console.log('Error al eliminar roles inactivos:', err);
                result(err, null);
            } else {
                console.log('Roles inactivos eliminados con éxito. Resultado:', res);
                result(null, res);
            }
        });
    };
   
    
    
    
    
    
    module.exports = Rol;
