import {Player} from './Model/Player';

class PlayersRepository
{
    private _players: Map<string, Player>;

    constructor()
    {
        this._players = new Map<string, Player>;
    }

    public add(player: Player): boolean
    {
        if (!this._players.has(player.name())) {
            this._players.set(player.name(), player);
            return true;
        }
        return false;
    }

    public get(name: string)
    {
        if(this._players.has(name))
        {
            return this._players.get(name);
        }
        return false;
    }
}

export {PlayersRepository};