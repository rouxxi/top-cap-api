export const GAMEPRESET= {
    '1': {
        grid: gridGenerator(6,6),
        teams: [
            {
                kingPosition: [1,1],
                teamPawns:[[1,2],[2,2],[3,2],[4,2]]
            },
            {
                kingPosition: [6,6],
                teamPawns:[[3,5],[4,5],[5,5],[6,5]]
            },
        ]},
    '2': {
        grid: gridGenerator(6,6),
        teams: [
            {
                kingPosition: [1,1],
                teamPawns:[[1,2],[2,2],[5,3],[6,3]]
            },
            {
                kingPosition: [6,6],
                teamPawns:[[1,4],[2,4],[5,5],[6,5]]
            },
        ]},
    '3': {
        grid: gridGenerator(6,6),
        teams: [
            {
                kingPosition: [1,1],
                teamPawns:[[1,3],[2,3],[3,2],[3,1]]
            },
            {
                kingPosition: [6,6],
                teamPawns:[[4,6],[4,5],[5,4],[6,4]]
            },
        ]}
}

function gridGenerator (rowNumber: number, columnNumber: number) {
    let grid : [number, number][]= [];
    
    for (let ligne = 1; ligne <= rowNumber; ligne++ ) {
        for (let column = 1; column <= columnNumber; column++ ) {
            grid.push([ligne, column])
        }
    }
    return grid;    
}

function getPreset (preset: number) {
    return GAMEPRESET[preset]
}
export {getPreset}