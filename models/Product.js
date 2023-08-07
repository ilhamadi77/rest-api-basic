module.exports = (Sequelize, DataTypes) => {
    const Product = Sequelize.define("Product", {

        id:{ 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
            },  
            name: {
             type: DataTypes.STRING,
             allowNull: false
            },
            brand: {
             type: DataTypes.STRING,
             allowNull: false
            },
            description: {
             type: DataTypes.TEXT,
             allowNull: true
            },
            createdAt: {
             type: DataTypes.DATE,
             allowNull: false
            },
            updatedAt: {
             type: DataTypes.DATE,
             allowNull: false
            }
    }, {
        tableName: "products"
    });

    return Product
}