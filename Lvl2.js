 var Lvl2 = {
    
    preload:function(){
        game.load.spritesheet('player','Assets/player(final).png', 40, 40);
        game.load.image('ground','Assets/Structure.png');
        game.load.image('border','Assets/borders.jpg');
        game.load.image('background','Assets/background.jpg');
        game.load.image('door','Assets/Nest- Unfinished.png');
        game.load.image('end','Assets/birds_finished.png');
        game.load.image('enemy','Assets/Enemy.png');
        game.load.image('lightning','Assets/lightning bolt.png');
        
    },//preload 
    
    create:function(){
        
        game.add.sprite(0,0,'background'); 
     	game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
        game.physics.setBoundsToWorld();

        this.player = game.add.group();
        this.border = game.add.group();   
        this.ground = game.add.group();
        this.door = game.add.group();
        this.enemy = game.add.group();
        this.lightning = game.add.group();
        this.end = game.add.group();
        
        this.player = game.add.sprite(100,100,'player');
        this.player.animations.add('going_left',[0, 1, 2, 3, 4, 5, 6, 7],12, true);
        this.player.animations.add('idle',[8, 9, 10, 11, 12, 13, 14, 15], 12,true);
        this.player.animations.add('going_right',[8, 9, 10, 11, 12, 13, 14, 15], 12,true);
        
        this.player.animations.play('going_right');
        this.player.animations.play('going_left');
        this.player.animations.play('idle');
        
        this.cursor = game.input.keyboard.createCursorKeys();
        this.player.body.gravity.y=600;
		
		var level = [
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			'x 	                         x',
            'x 	                         x',
            'x 	                         x',
            'x 	                         x',
            'x 	                         x',
            'x 	                         x',
            'x 	                      v  x',
            'x 	                     ooo x',
            'x 	                         x',
            'x 	                ooo      x',
			'x 		       oo            x',
			'x 	 ooo  	                 x',
			'x		                     x',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		]; //level
		//create the level by going through the array
	for (var i = 0; i<level.length;i++){
		for (var j = 0; j<level[i].length;j++){
			
			//walls
			if (level[i][j] == 'x'){
				var border = game.add.sprite(40+40*j, 40+40*i, 'border');
				this.border.add(border);
				border.body.immovable = true;
                border.visible = false;
		    }else if (level[i][j] == 'o'){
				var ground = game.add.sprite(40+40*j, 40+40*i, 'ground');
				this.ground.add(ground);
                ground.body.immovable = true;
            }else if (level[i][j] == 'v'){
				var door = game.add.sprite(40+40*j, 40+42*i, 'door');
				this.door.add(door);
                door.body.immovable = true;
            }else if (level[i][j] == 'e'){
				var enemy = game.add.sprite(40+40*j, 40+40*i, 'enemy');
				this.enemy.add(enemy);
                enemy.body.immovable = true;
            }  else if (level[i][j] == 'u'){
				var lightning = game.add.sprite(40+40*j, 40+40*i, 'lightning');
				this.lightning.add(lightning);
                lightning.body.immovable = true;
			}//if-else
		}//inner-for
	}//outer-for
    function nextLvl(){
        game.state.start("Lvl2");
    };
 }, //create

    update:function(){
        game.physics.arcade.collide(this.player,this.border);
        game.physics.arcade.collide(this.player,this.ground);
        game.physics.arcade.overlap(this.player,this.door, this.nextLvl, null, this);
        	
		if(this.cursor.left.isDown){
			this.player.body.velocity.x = -300;
            this.player.animations.play('going_left');
		}else if(this.cursor.right.isDown){
			this.player.body.velocity.x= 300;
		}else{
			this.player.body.velocity.x = 0;
             this.player.animations.play('going_right');
		}//if-else

		if (this.cursor.up.isDown && this.player.body.touching.down){
			this.player.body.velocity.y=-350;
            this.player.animations.play('idle');
        }//end if
    },//update
};


