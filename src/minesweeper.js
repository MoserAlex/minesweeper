var game = new Phaser.Game(360 + 350, 360, Phaser.AUTO, 'phaser_minesweeper', { preload: preload, create: create, update: update });
var iWidthOfStarField;
var iHeightOfStarField;
var iWidthOfStar;
var iHeightOfStar;

var iNumberOfMines;
var iNumberOfOpenFields;
var iNumberOfFlaggedFields;

var starfield;
var bGameOver;

var strInformation;

function restart()
{
	game.destroy();
	game = new Phaser.Game(iWidthOfStarField * iWidthOfStar + 350, iHeightOfStarField * iHeightOfStar, Phaser.AUTO, 'phaser_minesweeper', { preload: preload, create: create, update: update });
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

    iWidthOfStar = game.cache.getImage('closed').width;
    iHeightOfStar = game.cache.getImage('closed').height;
	iWidthOfStarField = Math.min(Math.max(parseInt(document.getElementById("width").value), minSize), maxSize);
	iHeightOfStarField = Math.min(Math.max(parseInt(document.getElementById("height").value), minSize), maxSize);
	game.scale.setGameSize(iWidthOfStarField * iWidthOfStar + 350, iHeightOfStarField * iHeightOfStar);

	var minNumberOfMines = minSize * minSize / 3;
	var maxNumberOfMines = parseInt(iWidthOfStarField * iHeightOfStarField / 3);
	iNumberOfMines = Math.min(Math.max(parseInt(document.getElementById("mines").value), minNumberOfMines), maxNumberOfMines);
	iNumberOfOpenFields = 0;
	iNumberOfFlaggedFields = 0;
	bGameOver = false;

    strInformation = game.add.text(iWidthOfStarField * game.cache.getImage('closed').width, 10, '', { fill: '#888888' });

	initStarfield();
	initMines();
}

function initStarfield()
{
	starfield = new Array();

	for (var y = 0; y < iHeightOfStarField; y++)
	{
		starfield[y] = new Array();
		for (var x = 0; x < iWidthOfStarField; x++)
		{
			starfield[y][x] = new Field(x, y);
		}
	}

	for (var y = 0; y < iHeightOfStarField; y++)
	{
		for (var x = 0; x < iWidthOfStarField; x++)
		{
			starfield[y][x].init();
		}
	}
}

function initMines()
{
	for (var i = 0; i < iNumberOfMines; i++)
	{
		var y = game.rnd.integerInRange(0, iHeightOfStarField - 1);
		var x = game.rnd.integerInRange(0, iWidthOfStarField - 1);

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
	strInformation.text = "Mines left: " + (iNumberOfMines - iNumberOfFlaggedFields) + "\n";
	if (bGameOver === true)
	{
		game.paused = true;
		strInformation.text += "Sorry, you lost...";
	}
	else if (iNumberOfOpenFields + iNumberOfMines === iWidthOfStarField * iHeightOfStarField)
	{
		game.paused = true;
		strInformation.text += "Yay, you won!";
	}

}

