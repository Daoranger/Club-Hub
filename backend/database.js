const sqlite3 = require("sqlite3").verbose();

// db connection object
// TODO: connect with sqlite file
const db = new sqlite3.Database("db.db", (err) => {
    if (err) {
        return console.error(`Error while connecting to database: ${err.message}`);
    }
    console.log("Successfully connected to database");
    setup_tables();
});

// create a .query() method that allows us to run commands using async/await syntax
db.query = function (sql, params) {
    let that = this;
    return new Promise((resolve, reject) => {
        that.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

function setup_tables() {
    db.exec(`
        
        // TODO: Fill in with SQL table create statements
        // e.x. CREATE TABLE IF NOT EXISTS Users (attributes etc etc)
        `
    )
}

class DB {
    // queries

    static async
}