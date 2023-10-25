class Player
{
    private _id: number;
    private _name: string;
    private _wins: number;
    private _status: string

    constructor(id: number, name: string, wins: number, status: string)
    {
        this._id = id;
        this._name = name;
        this._wins = wins;
        this._status = status;
    }

    public name(): string
    {
        return this._name;
    }

    public wins(): number
    {
        return this._wins;
    }

    public status(): string
    {
        return this._status;
    }
}

export {Player};