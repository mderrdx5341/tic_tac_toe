import { Mediator } from '../Mediator';
import * as Model from '../Model';

class AuthForm
{
    private _mediator: Mediator;


    public constructor(mediator: Mediator)
    {

        this._mediator = mediator;
    }

    public build(): HTMLElement
    {
        let html = document.createElement('form');
        let input = document.createElement('input');
        let button = document.createElement('button');
        button.innerHTML = 'Войти';
        html.addEventListener('submit', (e) => {
            e.preventDefault();
            let player = new Model.Player(1, input.value, 0);
            this._mediator.setPlayer(player);
            this._mediator.handleEvent('auth');
            return false;
        });
        html.appendChild(input);
        html.appendChild(button);
        return html;
    }
}

export {AuthForm};