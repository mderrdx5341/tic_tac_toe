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

        return html;
    }
}

export {Players};