import { Mediator } from './Mediator';



class App
{
    private _selector: string;
    private _container: HTMLElement;

    constructor(selector: string) {
        this._selector = selector;
    }
    
    async run()
    {
        this._container = document.querySelector(this._selector);

        let mediator = new Mediator(this._container);
        mediator.handleEvent('start');
    }
}

class Constroller
{
    constructor()
    {

    }

    public print()
    {
        console.log('controller');
    }
}


export default App;