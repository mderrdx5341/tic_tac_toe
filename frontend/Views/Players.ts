import * as Model from '../Model';

class Players
{
    private _players: Model.Player[];

    public constructor(players: Model.Player[])
    {
        this._players = players;
    }

    public build(): HTMLElement
    {
        let html = document.createElement('div');
        let users = document.createElement('ul');
        for(let i = 0; i < this._players.length; i++)
        {
            let player = document.createElement('li');
            console.log(this._players);
            player.setAttribute('id', this._players[i].id().toString());
            player.innerHTML = `
                ${this._players[i].name()},
                wins: ${this._players[i].wins()},
                <span class="status${this.statusClassModificator(this._players[i].status())}"> status: ${this._players[i].status()}</span>
            `;
            users.appendChild(player);
        }
        html.appendChild(users);
        return html;
    }

    private statusClassModificator(status: string): string
    {
        switch(status) {
            case 'Offline': return ' status--offline';
            case 'Online': return ' status--online';
        }    
    }
}

export {Players};