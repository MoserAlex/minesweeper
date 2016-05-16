var game = new Phaser.Game(360 + 350, 360, Phaser.AUTO, 'phaser_minesweeper', { preload: preload, create: create, update: update });
var widthOfStarField;
var heightOfStarField;
var widthOfStar;
var heightOfStar;
var numberOfMines;
var numberOfOpenFields;

var starfield;
var gameOver;

var debugInformation;

function restart()
{
	//game.paused = false;
	game.destroy();
	game = new Phaser.Game(widthOfStarField * widthOfStar + 350, heightOfStarField * heightOfStar, Phaser.AUTO, 'phaser_minesweeper', { preload: preload, create: create, update: update });
}

function preload()
{
    game.load.image('closed', 'assets/closed.png');
    game.load.image('flagged', 'assets/flagged.png');
    game.load.image('open', 'assets/open.png');
    game.load.image('mine', 'assets/mine.png');
}

function create()
{
	var maxSize = 15;
	var minSize = 6;

    widthOfStar = game.cache.getImage('closed').width;
    heightOfStar = game.cache.getImage('closed').height;
	widthOfStarField = Math.min(Math.max(parseInt(document.getElementById("width").value), minSize), maxSize);
	heightOfStarField = Math.min(Math.max(parseInt(document.getElementById("height").value), minSize), maxSize);
	game.scale.setGameSize(widthOfStarField * widthOfStar + 350, heightOfStarField * heightOfStar);

	var minNumberOfMines = minSize * minSize / 3;
	var maxNumberOfMines = parseInt(widthOfStarField * heightOfStarField / 3);
	numberOfMines = Math.min(Math.max(parseInt(document.getElementById("mines").value), minNumberOfMines), maxNumberOfMines);
	numberOfOpenFields = 0;

    debugInformation = game.add.text(widthOfStarField * game.cache.getImage('closed').width, 10, '', { fill: '#888888' });

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
}

function update()
{
	if (gameOver === true)
	{
		//game.paused=true;
	}
}

function checkForGameOver()
{

}