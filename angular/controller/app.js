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
    $scope.scrollToBottom = function () {
        const element = document.getElementById("scroll");
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    let data = await http.get('allMessages')
    if (data.data.success) {
        $scope.messages = data.data.messages
        setTimeout(() => {
            $scope.scrollToBottom()
        }, 1000)
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
        $scope.scrollToBottom()
    })

    $scope.checkEvent = function (event) {
        if (event.key === 'Enter') {
            $scope.addMessage()
        }
    }

    $scope.addMessage = function () {
        if ($scope.message === undefined || $scope.message === '') {
            return
        }
        let value = { name: $scope.name || 'Anonymous', message: $scope.message }
        chatSocket.emit('sendMessage', value)
        $scope.message = ''
        $scope.messages.push(value)
        setTimeout(() => {
            $scope.scrollToBottom()
        }, 1000)
    }

    $scope.saveName = function () {
        localStorage.setItem('chat_user_name', $scope.name)
        alert('UserName is Saved!')
    }

}]);