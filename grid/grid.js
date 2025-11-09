export default class Grid {

    constructor( rows, cols ) {
        this.rows = rows;
        this.cols = cols;
        this.cells = new Array(rows * cols).fill(undefined);
    }

    rows() {
        return this.rows;
    }

    cols() {
        return this.cols;
    }
    
    size() {
        return this.cells.length;
    }

    index( row, col) {
        return row*this.cols+col;
    }

    set( {row, col}, value ) {
        const index = this.indexFor({ row, col});
        if(index != undefined) {
            this.cells[index] = value;
        }
    }

    //Checks if the rows and cols are inside the grid
    inBounds (row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    cell(row, col){
        //Ex. row 1, col 2 og giver value fra den specifikke celle
        return this.inBounds(row, col) ? {row, col, value: this.get({row, col}) } : undefined;
    }

    get( {row, col} ) {
        //return value
        const index = this.indexFor({ row, col });
        //Returns the indexvalue if index is not equal to undefined, otherwise it returns undefined.
        return index != undefined ? this.cells[index] : undefined;
    }

    set({row, col}, value){
        if (!this.inBounds(row,col)) {throw new Error("Out of bounds");}
        this.data[this.index(row, col)] = value;
    }

    fill(value) {
        this.data.fill(value);
    }

    indexFor( {row, col} ) {
        //Either undefined or the placement, based on the value of index
        //Either lower than 0 or >= than the number of rows, if there is three rows, row number 3 is going to be 2
        if(row<0 || col<0 || row>=this.rows || col>=this.cols) {
            return undefined;
        }
        //First you find which row you are at, then you need to move that number of spaces, so you * with the cols, 
        return row*this.cols+col;
    }

    rowColFor( index ) {
        if(index < 0 || index >= this.data.length ) {return undefined;}
        return {row: Math.floor(index/this.cols), col: index%this.cols};
    }

    north({ row, col }) { return this.cell(row - 1, col); }
    south({ row, col }) { return this.cell(row + 1, col); }
    west({ row, col }) { return this.cell(row, col - 1); }
    east({ row, col }) { return this.cell(row, col + 1); }
    northWest({ row, col }) { return this.cell(row - 1, col - 1); }
    northEast({ row, col }) { return this.cell(row - 1, col + 1); }
    southWest({ row, col }) { return this.cell(row + 1, col - 1); }
    southEast({ row, col }) { return this.cell(row + 1, col + 1); }

    nextInRow(pos) { return this.east(pos); }
    nextInCol(pos) { return this.south(pos); }

    neighbours({ row, col }) {
        const directions = [
            [-1,  0], // north
            [ 1,  0], // south
            [ 0, -1], // west
            [ 0,  1], // east
            [-1, -1], // north-west
            [-1,  1], // north-east
            [ 1, -1], // south-west
            [ 1,  1]  // south-east
        ];
        return directions
                    .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
                    .filter(({ row, col }) => this.inBounds(row, col));
    }

    neighbourValues({ row, col }) {
        return this.neighbours({ row, col }).map(p => this.get(p));
    }
    
}