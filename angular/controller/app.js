let app = angular.module('chatModule', []);

let url = 'http://localhost:3000';

app.factory('chatSocket', function () {
    let socket = io.connect(url);
    return socket;
});

app.controller('ChatController', ['$scope', 'chatSocket', '$http', async function ($scope, chatSocket, http) {

    if (localStorage.getItem('chat_user_name')) {
        $scope.name = localStorage.getItem('chat_user_name')
    }

    let data = await http.get('allMessages')
    if (data.data.success) {
        $scope.messages = data.data.messages
    } else {
        $scope.messages = []
    }
    $scope.userCount = 1
    chatSocket.on('getTotalOnlineUser', function (count) {
        $scope.userCount = count
        $scope.$digest();
    })

    chatSocket.on('newMessage', function (data) {
        $scope.messages.push(data)
        $scope.$digest();
    })

    $scope.addMessage = function () {
        let value = { name: $scope.name || 'Anonymous', message: $scope.message }
        chatSocket.emit('sendMessage', value)
        $scope.message = ''
        $scope.messages.push(value)
    }

    $scope.saveName = function () {
        localStorage.setItem('chat_user_name', $scope.name)
        alert('UserName is Saved!')
    }

}]);