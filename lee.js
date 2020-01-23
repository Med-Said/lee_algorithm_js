//helpers
function createArray(length) {//to creat an matrix
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


//a simulation of ArrayDeque in java
function ArrayDeque()
{
    this.stac=new Array();

    this.poll=function(){
        return this.stac.pop();
    }
    this.add=function(item){
        this.stac.push(item);
    }

    this.isEmpty=function(){
        return (this.stac.length == 0)
    }
}


//Lee algorithm

function Node(x, y, dist) {
    this.x = x || 0;
    this.y = y || 0;
    this.dist = dist || 0;

};



function Util(){
    // M x N matrix
    let M = 10;
    let N = 10;

    //max possible length
    let MAX_VALUE = 77777;


	// Below arrays details all 4 possible movements from a cell
    var row = [-1, 0, 0, 1];
    var col = [0, -1, 1, 0];

    // Function to check if it is possible to go to position (row, col)
	// from current position. The function returns false if (row, col)
    // is not a valid position or has value 0 or it is already visited
    function isValid(mat, visited, row, col){
        return (row >= 0) && (row < M) && (col >= 0) && (col < N)
        && mat[row][col] == 1 && !visited[row][col];
    }

    // Find Shortest Possible Route in a matrix mat from source
    // cell (i, j) to destination cell (x, y)
    function BFS(mat, i, j, x, y){
        // construct a matrix to keep track of visited cells
        var visited = createArray(M,N);

        //create an empty queue
        var q = new ArrayDeque();

        // mark source cell as visited and enqueue the source node
        visited[i][j] = true;
        q.add(new Node(i, j, 0));

        // stores length of longest path from source to destination
        var min_dist = MAX_VALUE;
        


        // run till queue is not empty
        while (!q.isEmpty()) {
            // pop front node from queue and process it
            var node = q.poll();
            
            // (i, j) represents current cell and dist stores its
			// minimum distance from the source
			i = node.x;
			j = node.y;
            var dist = node.dist;
            
            // if destination is found, update min_dist and stop
			if (i == x && j == y)
			{
				min_dist = dist;
				break;
            }
            

			// check for all 4 possible movements from current cell
			// and enqueue each valid movement
			for ( k = 0; k < 4; k++)
			{
				// check if it is possible to go to position
				// (i + row[k], j + col[k]) from current position
				if (isValid(mat, visited, i + row[k], j + col[k]))
				{
					// mark next cell as visited and enqueue it
					visited[i + row[k]][j + col[k]] = true;
					q.add(new Node(i + row[k], j + col[k], dist + 1));
				}
			}

        }

		if (min_dist != MAX_VALUE) {
			alert("The shortest path from source to destination "
							+ "has length " + min_dist);
		}
		else {
			alert("Destination can't be reached from source");
		}
    }


    // Shortest path in a Maze
    

        // input maze    
		var  mat =
		[
			[ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 ],
			[ 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
			[ 0, 0, 1, 0, 1, 1, 1, 0, 0, 1 ],
			[ 1, 0, 1, 1, 1, 0, 1, 1, 0, 1 ],
			[ 0, 0, 0, 1, 0, 0, 0, 1, 0, 1 ],
			[ 1, 0, 1, 1, 1, 0, 0, 1, 1, 0 ],
			[ 0, 0, 0, 0, 1, 0, 0, 1, 0, 1 ],
			[ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
			[ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 ],
			[ 0, 0, 1, 0, 0, 1, 1, 0, 0, 1 ],
        ];

		// Find shortest path from source (0, 0) to
		// destination (7, 5)
		BFS(mat, 0, 0, 7, 5);
    

}

Util();