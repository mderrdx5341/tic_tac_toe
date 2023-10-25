import * as Views from './Views';
import * as Model from './Model';
import { WebSocketClient } from './WebSocketClient';


class Mediator
{
    private _player: Model.Player;
    private _container: HTMLElement;
    private _webSocketAddress: string;
	private _webSocketClient: WebSocketClient;

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
            this._webSocketClient = new WebSocketClient(this._webSocketAddress, socket, this._player.name());
			
			this._webSocketClient.setMessageHandler((e) => {
				let response = JSON.parse(e.data);
				//console.log(e.data,  'auth');
				console.log(response);
				if (response.ok === true) {
					this.handleEvent('players');				
				} else {
					return;
				}
			});
			this._webSocketClient.send(`{"controller": "Players", "action": "auth", "data":"${this._player.name()}"}`);
        }

		if (event === 'players') {
			this._webSocketClient.setMessageHandler((e) => {
				console.log(e.data, 'players');
				let playersData = JSON.parse(e.data);
				if (!this.isObject(playersData)) {
					return;
				}
				let players: Model.Player[] = [];
				for(let index in playersData) {
					players.push(new Model.Player(0, playersData[index].name, playersData[index].wins, playersData[index].status));
				}
				let html = new Views.Players(players);
				this._container.appendChild(html.build());
			});
			this._webSocketClient.send('{"controller": "Players", "action":"getPlayers", "data": ""}');
		}
    }

	private MessageHandler(e: any){
		let request = JSON.parse(e.data);
		request.controller;
		request.args;

		let controller = new request.controller(this);
		controller.index(request.args);
		
	}

	private isObject(value: any): boolean {
		return value !== null && typeof value === 'object';
	}

	public setPlayer(player: Model.Player)
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