class MainPage
{
    private _container: HTMLElement;
    private _playerPanel: HTMLElement;
    private _playersPanel: HTMLElement;
    private _gamePanel: HTMLElement;

    public constructor(container: HTMLElement)
    {
        this._container = container;
        this._playerPanel = document.createElement('div');
        this._playerPanel.className = "player-info";
        this._playersPanel = document.createElement('div');
        this._playersPanel.className = "players-list";
        this._gamePanel = document.createElement('div');
        this._gamePanel.className = "game-block";
    }

    public build()
    {
        this._container.appendChild(this._playerPanel);
        this._container.appendChild(this._playersPanel);
        this._container.appendChild(this._gamePanel);
    }

    public playerPanel(): HTMLElement
    {
        return this._playerPanel;
    }

    public playersPanel(): HTMLElement
    {
        return this._playersPanel;
    }

    public gamePanel(): HTMLElement
    {
        return this._gamePanel;
    }
}

export {MainPage};