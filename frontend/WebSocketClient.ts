class WebSocketClient
{
    private _url: string;
    private _socket: WebSocket;
    private _playerName: string;

    constructor(url: string, socket: WebSocket, playerName: string)
    {
        this._url = url;
        this._socket = socket;
        this._playerName = playerName;
        //console.log(this._socket);
        this.pong();
    }
/*
    public run()
    {
        this._socket = new WebSocket(this._url);
        
        //console.log(this._socket);
        
        this._socket.onmessage = function(event: any) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };
        
        this._socket.onclose = function(event: any) {
            if (event.wasClean) {
                console.log(event);
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        };
        
        this._socket.onerror = function(error: any) {
            console.log(error);
        };

        this._socket.send('{"teswtset":"sadf"}');
        this.pong();
    }
*/
    public send(message: string)
    {
        if (this._socket.readyState === 1){
            this._socket.send(message);
        }
    }

    public pong(): void
    {
        console.log('pong');
        console.log(this._socket);
        console.log(this);
        if (!this._socket) {console.log('err 1', this._socket); return};
        if (this._socket.readyState === 0) {setTimeout(this.pong, 1000); return}
        if (this._socket.readyState !== 1) {console.log('err 2', this._socket); return};
        this._socket.send("heartbeat: " + this._playerName);
        //setTimeout(() => {return this.pong()}, 1000);
    }

}




export {WebSocketClient};