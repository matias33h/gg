const db=require('../config/config')

const Address={}


Address.findByUser=(id_user,result)=>{
    const sql = `
    SELECT
        CONVERT(id,char) AS id,
        address,
        neighborhood,
        lat,
        lng,
        CONVERT(id_user, char) AS id_user
    FROM
        address
    WHERE
         id_user=?
    `;

    db.query(sql,
        id_user,
        (err,data) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                result(null,data); // se utiliza para pasar el resultado de la operación 

            }


        }
        
        )
}


Address.create=(address,result)=>{
    const sql= `
    INSERT INTO
        address(
            address,
            neighborhood,
            lat,
            lng,
            id_user,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    // voy a realizar la consulta 
    db.query(
        sql,
        [
            address.address,
            address.neighborhood,
            address.lat,
            address.lng,
            address.id_user,
            new Date(),
            new Date(),
        ],
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la nueva direccion: ', res.insertId);
                result(null, res.insertId); // se utiliza para pasar el resultado de la operación 

            }


        }
    )

}


module.exports = Address
