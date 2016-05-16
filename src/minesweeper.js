var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_minesweeper', { preload: preload, create: create, update: update });
//document.getElementById("width");
var widthOfStarField;
var heightOfStarField;
var numberOfMines;
var starfield;
var debugInformation;
var numberOfOpenFields;
var gameOver;

function restart()
{
	game.destroy();
	game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser_minesweeper', { preload: preload, create: create, update: update });
}

function preload()
{
    game.load.image('closed', 'assets/closed.png');
    game.load.image('flagged', 'assets/flagged.png');
    game.load.image('open', 'assets/open.png');
    game.load.image('mine', 'assets/mine.png');

    debugInformation = game.add.text(450, 10, '', { fill: '#888888' });
}

function create()
{
	var maxSize = 15;
	var minSize = 6;

	widthOfStarField = Math.min(Math.max(parseInt(document.getElementById("width").value), minSize), maxSize);
	heightOfStarField = Math.min(Math.max(parseInt(document.getElementById("height").value), minSize), maxSize);

	var minNumberOfMines = minSize * minSize / 3;
	var maxNumberOfMines = parseInt(widthOfStarField * heightOfStarField / 3);
	numberOfMines = Math.min(Math.max(parseInt(document.getElementById("mines").value), minNumberOfMines), maxNumberOfMines);
	numberOfOpenFields = 0;

	//game.width = widthOfStarField * 40;
	//game.height = heightOfStarField * 40;

	initDebugInformation();
	initStarfield();
	initMines();
}

function initDebugInformation()
{
	debugInformation.text = "Debug";
}

function initStarfield()
{
	starfield = new Array();

	for (var y = 0; y < heightOfStarField; y++)
	{
		starfield[y] = new Array();
		for (var x = 0; x < widthOfStarField; x++)
		{
			starfield[y][x] = new Field(x, y);
		}
	}

	for (var y = 0; y < heightOfStarField; y++)
	{
		for (var x = 0; x < widthOfStarField; x++)
		{
			starfield[y][x].init();
		}
	}

	debugInformation.text = "End of initializing starfield";
}

function initMines()
{
	for (var i = 0; i < numberOfMines; i++)
	{
		var y = game.rnd.integerInRange(0, heightOfStarField - 1);
		var x = game.rnd.integerInRange(0, widthOfStarField - 1);

		if (starfield[y][x].m_bIsMine === true)
		{
			i--;
		}
		else
		{			
			starfield[y][x].setMine();
		}
	}

	debugInformation.text = "End of initializing mines";
}

function update()
{

}