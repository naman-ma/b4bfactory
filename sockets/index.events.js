const EVENTS = {
    MESSAGE_RECEIVED: 'incoming_message',
    DISCONNECT: 'disconnect'
}

module.exports = (socket) => {

    socket.on(EVENTS.MESSAGE_RECEIVED, function (event) {
        console.log('8--event', event);
    });

    socket.on(EVENTS.DISCONNECT, function (event) {
        console.log('user disconnected');
        socketsContainer = socketsContainer.filter(id => id !== socket.id)
    });

}
