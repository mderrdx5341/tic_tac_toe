import * as Controllers from './Controllers';

let Router: {[k: string]: any} = {};

Router.Players = Controllers.Players;
Router.Game = Controllers.Game;

export {Router};