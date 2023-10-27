const db=require('../config/config')

const Product={}

Product.findByCategory = (id_category, result) => {
    const sql = `
    SELECT 
        P.id,
        P.name,
        P.description,
        P.price,
        P.patente,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM 
        products as P
    WHERE 
        P.id_category = ?
    `;

    db.query(
        sql,
        [id_category],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la nueva producto: ', res);
                result(null, res); // se utiliza para pasar el resultado de la operación 

            }
        }
    );
}

Product.create=(product,result)=>{
    const sql= `
    INSERT INTO
        products(
            name,
            description,
            price,
            patente,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // voy a realizar la consulta 
    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.patente,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date()
        ],
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la nueva producto: ', res.insertId);
                result(null, res.insertId); // se utiliza para pasar el resultado de la operación 

            }


        }
    )

}



Product.update=(product,result)=>{
    const sql=`
    UPDATE
        products
    SET
        name = ?,
        description= ?,
        price = ?,
        patente = ?,
        image1= ?,
        image2= ?,
        image3= ?,
        id_category= ?,
        updated_at= ?
    WHERE
        id=?
    `;

    db.query(
        sql,[
            product.name,
            product.description,
            product.price,
            product.patente,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.id
        ],
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la Empresa actualizada: ', product.id);
                result(null, product.id); // se utiliza para pasar el resultado de la operación 
            }
        }
    )
}








Product.delete=(id,result)=>{
    const sql=`
    DELETE FROM
        products 
    WHERE 
        id=?
    `;
    db.query(
        sql, 
        id,
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id del conductor eliminada: ', id);
                result(null, id); // se utiliza para pasar el resultado de la operación 

            }


        }
    )
}

module.exports = Product
