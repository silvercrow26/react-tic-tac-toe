import { WINNER_COMBINATION } from "../constants";

export const checkWiner = (boardToCheck) => {
    for (const combi of WINNER_COMBINATION) {
        const [a, b, c] = combi
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a];
        }
    }
    return null;
}

export const checkEndGame = (newBoard) => {
    return newBoard.every(square => square !== null);
}
