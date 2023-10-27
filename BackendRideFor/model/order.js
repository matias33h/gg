const db = require('../config/config');

const Order = {};

Order.findByStatus = (status, result) => {

    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_conductor, char) AS id_conductor,
        O.status,
        O.timestamp,
        JSON_OBJECT(
            'id', CONVERT(A.id, char),
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS conductor,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_conductor
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address 
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        status = ?
    GROUP BY
        O.id;
    `;

    db.query(
        sql,
        status,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

Order.findByConductorAndStatus = (id_conductor, status, result) => {

    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_conductor, char) AS id_conductor,
        O.status,
        O.timestamp,
        JSON_OBJECT(
            'id', CONVERT(A.id, char),
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS conductor,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_conductor
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address 
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        O.id_conductor = ? AND O.status = ?
    GROUP BY
        O.id;
    `;

    db.query(
        sql,
        [id_conductor, status],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

Order.findByClientAndStatus = (id_client, status, result) => {

    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_conductor, char) AS id_conductor,
        O.status,
        O.timestamp,
        JSON_OBJECT(
            'id', CONVERT(A.id, char),
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS conductor,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_conductor
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address 
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        O.id_client = ? AND O.status = ?
    GROUP BY
        O.id;
    `;

    db.query(
        sql,
        [id_client, status],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

Order.create = (order, result) => {

    const sql = `
    INSERT INTO
        orders(
            id_client,
            id_address,
            status,
            timestamp,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            order.id_client,
            order.id_address,
            'PAGADO', // 1. PAGADO 2. DESPACHADO 3. EN CAMINO 4. ENTREGADO
            Date.now(),
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva orden:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Order.updateToDispatched = (id_order, id_conductor, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_conductor = ?,
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            id_conductor,
            'DESPACHADO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateToOnTheWay = (id_order, id_conductor, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_conductor = ?,
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            id_conductor,
            'EN CAMINO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateToConductor = (id_order, id_conductor, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_conductor = ?,
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            id_conductor,
            'ENTREGADO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}


module.exports = Order;