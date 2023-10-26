import { Mediator } from "../Mediator";

class GameBoard
{
    private _mediator: Mediator;
    private _cells: HTMLElement[];

    public constructor(mediator: Mediator)
    {
        this._mediator = mediator;
        this._cells = [];
    }

    public build(): HTMLElement
    {
        let html = document.createElement('div');
        html.className = 'game-board';
        for (let i = 0; i <= 8; i++)
        {
            let cell = document.createElement('div');
            cell.className = 'game-board__cell';
            cell.setAttribute('id', i.toString());
            this._cells.push(cell);
            html.appendChild(cell);
            
        }

        this.start();

        return html;
    }

    private start() {
        let i = 0;
        let _this = this;
        console.log(this._cells);
        for (let cell of this._cells) {
            cell.addEventListener('click', function step() {
                this.textContent = ['X', 'O'][i % 2];
                this.removeEventListener('click', step);
    
                if (_this.isVictory(_this._cells)) {
                    alert(this.textContent);
                } else if (i == 8) {
                    alert('ничья');
                }
                i++;
            });
        }
    }

    private isVictory(cells: HTMLElement[]) {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for (let comb of combs) {
            if (
                cells[comb[0]].textContent == cells[comb[1]].textContent &&
                cells[comb[1]].textContent == cells[comb[2]].textContent &&
                cells[comb[0]].textContent != ''
            ) {
                return true;
            }
        }
        
        return false;
    }

}

export {GameBoard};