var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });
//document.getElementById("width");
var widthOfStarField;
var heightOfStarField;
var numberOfMines;
var starfield;
var debugInformation;

function reset()
{
	//game.destroy();
	//game = new Phaser.Game(800, 600, Phaser.AUTO, '', { create: create });
	create();
}

function preload()
{
    game.load.image('logo', 'assets/phaser.png');
    game.load.image('closed', 'assets/closed.png');
    game.load.image('open', 'assets/open.png');
    game.load.image('mine', 'assets/mine.png');
}

function create()
{
	widthOfStarField = parseInt(document.getElementById("width").value);
	heightOfStarField = parseInt(document.getElementById("height").value);
	numberOfMines = 10;

	placeDebugInformation();
	placeStarfield();
	placeMines();
}

function placeDebugInformation()
{
	debugInformation = game.add.text(450, 10, 'Debug', { fill: '#888888' });
}

function placeStarfield()
{
	starfield = new Array();

	for (var y = 0; y < heightOfStarField; y++)
	{
		starfield[y] = new Array();
		for (var x = 0; x < widthOfStarField; x++)
		{
				starfield[y][x] = new Field(y, x);
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

function placeMines()
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