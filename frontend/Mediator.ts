import * as Views from './Views';
import { Player } from './Model/Player';
import { WebSocketClient } from './WebSocketClient';


class Mediator
{
    private _player: Player;
    private _container: HTMLElement;
    private _webSocketAddress: string;

    constructor(container: HTMLElement){
        this._container = container;
        this._webSocketAddress = this._container.getAttribute('ws-server');
    }

    public async handleEvent(event: string) {
        if (event === 'start')
        {  
            let af = new Views.AuthForm(this);
            this._container.appendChild(af.build());
        }

        if(event === 'auth')
        {
            let socket = await WSconnect(this._webSocketAddress);
            let a = new WebSocketClient(this._webSocketAddress, socket, this._player.name());
            a.send('message');

        }
    }

    public setPlayer(player: Player)
    {
        this._player = player;
    }
}

function WSconnect(url: string): Promise<WebSocket>
{
	return new Promise(function(resolve, reject) {
		var socket = new WebSocket(url);

		socket.onclose = function(event) {
			if (event.wasClean) {
			  console.log('Соединение закрыто чисто');
			} else {
			  console.log('Обрыв соединения'); // например, "убит" процесс сервера
			}

			console.log('Код: ' + event.code + ' причина: ' + event.reason);
			console.log(event);
		};
	  
		socket.onmessage = function(event) {
			console.log("Получены данные " + event.data);
		};
	  
		socket.onerror = function(error) {
			console.log(error);
		};

		socket.onopen = function() {
			//socket.send('{"action": "registration", "employee": "'+employeeId+'"}');
			//console.log(user_aterisk_login);
			resolve(socket);
		};
		socket.onerror = function(err) {
			reject(err);
		};
	}); 
}

export {Mediator};