app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {
    indexFactory.connectSocket('http://localhost:3000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnection: true
    }).then((socket) => {
        console.log('bağlantı başarılı', socket);
    }).catch((err) => {
        console.log(err);
    });
}]);