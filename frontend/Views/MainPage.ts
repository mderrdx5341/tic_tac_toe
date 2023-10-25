class MainPage
{
    private _container: HTMLElement;
    private _playerPanel: HTMLElement;
    private _playersPanel: HTMLElement;

    public constructor(container: HTMLElement)
    {
        this._container = container;
        this._playerPanel = document.createElement('div');
        this._playerPanel.className = "player-info";
        this._playersPanel = document.createElement('div');
        this._playerPanel.className = "player-info";
    }

    public build()
    {
        this._container.appendChild(this._playerPanel);
        this._container.appendChild(this._playersPanel);
    }

    public playerPanel(): HTMLElement
    {
        return this._playerPanel;
    }

    public playersPanel(): HTMLElement
    {
        return this._playersPanel;
    }
}

export {MainPage};