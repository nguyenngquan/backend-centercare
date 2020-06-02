var Connection = require('tedious').Connection;
var config = {
    server: 'DESKTOP-PV97V6L',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: '123456',
        }
    },
    options: {
        database: 'HOCVIEN',
        instanceName: 'MSSQLSERVER',
        rowCollectionOnDone: true,
        useColumnNames: false,
        enableArithAbort: true,
        trustServerCertificate: true,
        encrypt: false
    },
}
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});
module.exports = connection;