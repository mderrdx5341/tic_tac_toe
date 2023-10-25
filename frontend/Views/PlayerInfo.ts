import * as Model from '../Model';
class PlayerInfo
{
    private _player: Model.Player;

    public constructor(player: Model.Player)
    {
        this._player = player;
    }

    public build(): HTMLElement
    {
        let html = document.createElement('div');
        html.innerHTML = `<h3>name: ${this._player.name()}</h3><div>wins: ${this._player.wins()}</div>`;
        return html;
    }
}

export { PlayerInfo };