app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [ ];

    $scope.init = () => {
        const username = prompt('Please enter the username');

        if(username) initSocket(username);
        else return false;
    };

    function initSocket(username){
        const connectionRe = {
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnection: true
        }
        indexFactory.connectSocket('http://localhost:3000', connectionRe)
        .then((socket) => {
            socket.emit('newUser', { username });

            socket.on('newUser', (data) => {
                const userInfo = 'Katıldı.';
                const messageData = {
                    type : 0, // info; 0 -> server info, 1 -> userinfo
                    username : data.username,
                    text : userInfo
                };

                $scope.messages.push(messageData);
                $scope.$apply();
            });

            socket.on('disUser', (data) => {
                const userInfo = 'Ayrıldı.';
                const messageData = {
                    type : 0, // info; 0 -> server info, 1 -> userinfo
                    username : data.username,
                    text : userInfo
                };

                $scope.messages.push(messageData);
                $scope.$apply();
            });
        }).catch((err) => {
            console.log(err);
        });
    };
}]);