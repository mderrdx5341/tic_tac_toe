class App
{
    private _selector: string;
    private _container: HTMLElement;

    constructor(selector: string) {
        this._selector = selector;
    }
    
    run(): void
    {
        this._container = document.querySelector(this._selector);
		console.log(this._container);
    }
}

export default App;