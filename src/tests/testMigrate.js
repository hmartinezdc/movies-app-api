const sequelize = require('../utils/connection');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        sequelize.sync()
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();