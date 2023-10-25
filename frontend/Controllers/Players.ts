import * as Model from '../Model';
import * as Views from '../Views';
import { Mediator } from "../Mediator";
import { WebSocketClient } from "../WebSocketClient";

class Players
{
    private _mediator: Mediator;
    private _webSocketClient: WebSocketClient;

    constructor(mediator: Mediator, webSocketClient: WebSocketClient)
    {
        this._mediator = mediator;
        this._webSocketClient = webSocketClient;
    }

    public auth(args: any)
    {      
        console.log(args, 'auth');
        if (args.ok === true) {
            //this._mediator.handleEvent('players');				
        } else {
            return;
        }
    }

    public players(args: any)
    {
        console.log(args, 'players');
        if (!this.isObject(args.playersData)) {
            return;
        }
        let players: Model.Player[] = [];
        for(let index in args.playersData) {
            players.push(new Model.Player(0, args.playersData[index].name, args.playersData[index].wins, args.playersData[index].status));
        }
        let html = new Views.Players(players);
        this._mediator.container().appendChild(html.build());
    }

    private isObject(value: any): boolean {
		return value !== null && typeof value === 'object';
	}
}

export { Players };