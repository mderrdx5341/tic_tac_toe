class Player
{
    private _id: number;
    private _name: string;
    private _wings: number;

    constructor(id: number, name: string, wings: number)
    {
        this._id = id;
        this._name = name;
        this._wings = wings;
    }

    public name(): string
    {
        return this._name;
    }
}

export {Player};