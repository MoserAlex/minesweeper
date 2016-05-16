// More a class than a function
function Field (x, y)
{
	this.m_iPositionX = x;
	this.m_iPositionY = y;
	this.m_iWidth = 44;
	this.m_iHeight = 44;
	this.m_iSurroundingMines = 0;

	this.m_bIsMine = false;
	this.m_bIsFlagged = false;
	this.m_bIsNotOpened = true;

	this.m_img;
	this.m_surroundingFields;

	this.init = function()
	{
		this.m_img = game.add.sprite(this.m_iPositionX * this.m_iWidth, this.m_iPositionY * this.m_iHeight, 'closed');
		this.m_img.inputEnabled = true;
		this.m_img.events.onInputDown.add(this.onClick, this);
		this.getSurroundingFields();
	}

	this.setMine = function()
	{
		this.m_bIsMine = true;
		for (var i = 0; i < this.m_surroundingFields.length; i++)
		{
			this.m_surroundingFields[i].m_iSurroundingMines += 1;
		}
	}

	this.onClick = function()
	{
		if (game.input.activePointer.leftButton.isDown)
		{
			this.openField();
		}
		else if (game.input.activePointer.rightButton.isDown)
		{
			this.flagAsMine();
		}		
	}

	this.openField = function()
	{
		debugInformation.text = "left-clicked on star: " + this.m_iPositionX + " " + this.m_iPositionY;

		if (this.m_bIsNotOpened === true)
		{
			this.m_bIsNotOpened = false;

			if (this.m_bIsMine)
			{
				this.m_img.loadTexture('mine', 0);
			}
			else
			{
				this.m_img.loadTexture('open', 0);

				var x = this.m_iPositionX * this.m_iWidth + 15;
				var y = this.m_iPositionY * this.m_iHeight + 11;
				game.add.text(x, y, this.m_iSurroundingMines, { fill: '#000000', fontSize: '23px' })

				if (this.m_iSurroundingMines === 0)
				{
					for (var i = 0; i < this.m_surroundingFields.length; i++)
					{
						this.m_surroundingFields[i].openField();
					}
				}
			}
		}
	}

	this.flagAsMine = function()
	{
		debugInformation.text = "right-clicked on star: " + this.m_iPositionX + " " + this.m_iPositionY;
	}

	this.getSurroundingFields = function()
	{
		this.m_surroundingFields = new Array();
		
		// following part finds the fields surrounding the mine and adds +1 to their respective surrounding mine counter
		// top
		if (this.m_iPositionY > 0)
		{
			this.m_surroundingFields.push(starfield[this.m_iPositionX][this.m_iPositionY - 1]);
			// top left
			if (this.m_iPositionX > 0)
			{
				this.m_surroundingFields.push(starfield[this.m_iPositionX - 1][this.m_iPositionY - 1]);
			}
			// top right
			if (this.m_iPositionX < widthOfStarField - 1)
			{
				this.m_surroundingFields.push(starfield[this.m_iPositionX + 1][this.m_iPositionY - 1]);
			}
		}
		
		// bottom
		if (this.m_iPositionY < heightOfStarField - 1)
		{
			this.m_surroundingFields.push(starfield[this.m_iPositionX][this.m_iPositionY + 1]);
			// bottom left
			if (this.m_iPositionX > 0)
			{
				this.m_surroundingFields.push(starfield[this.m_iPositionX - 1][this.m_iPositionY + 1]);
			}
			// bottom right
			if (this.m_iPositionX < widthOfStarField - 1)
			{
				this.m_surroundingFields.push(starfield[this.m_iPositionX + 1][this.m_iPositionY + 1]);
			}
		}

		// left
		if (this.m_iPositionX > 0)
		{
			this.m_surroundingFields.push(starfield[this.m_iPositionX - 1][this.m_iPositionY]);
		}

		// right
		if (this.m_iPositionX < widthOfStarField - 1)
		{
			this.m_surroundingFields.push(starfield[this.m_iPositionX + 1][this.m_iPositionY]);
		}
	}
}