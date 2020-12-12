import {Types} from "mongoose"

export enum HTTP_STATUS {
    SUCCESS = 200,
    SUCCESS_CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
     INTERNAL_ERROR= 500
}




export class GameNotFound extends Error {
    constructor(id) {
        super();
        this.message = `We cannot find any Game with this ID: ${id}, please check and request with correct game ID`
    }
}
export class GameNotReady extends Error {
    constructor() {
        super();
        this.message = "This game is not ready yet. Please ask your friend to join the game";
    }
}

export class GameNotStarted extends Error {
    constructor() {
        super();
        this.message = "This game is not started yet. Please ask your host to start the game";
    }
}


export class NotAuthorized extends Error {
    constructor() {
        super();
        this.message = "You are not Authorized to do this, Please contact the host";
    }
}

export class WrongGame extends Error {
    constructor() {
        super();
        this.message = "Sorry!! But it seems you came into wrong game";
    }
}

export class WrongTurn extends Error {
    constructor(nextPlayerName) {
        super();
        this.message = `Sorry!! But it seems this is not your turn. This is ${nextPlayerName}'s turn`;
    }
}

export class WrongChoice extends Error {
    constructor() {
        super();
        this.message = "This Column is already Filled, you can not drop coin in this column";
    }
}

export class GameEnded extends Error {
    constructor() {
        super();
        this.message = "This game is already ended, You can check the winner by requesting '/?roomID=<<Your Game ID>>";
    }
}
