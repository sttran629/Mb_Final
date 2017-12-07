
var game = new Phaser.Game(1200,1200, Phaser.auto, "game");

var menuState  = {
    preload:function(){
    game.load.image('titlescreen',"Assets/Assets_MainMenu/background_2.jpg");
    game.load.image('button',"Assets/Assets_MainMenu/button.png");
        
    },
    create:function(){
        game.state.add('MM',game.MainMenu);
        this.game.state.start('MM');
    },

    update:function(){
        
    },
};

var lightning;
var mainState = {
    
    preload:function(){
        game.load.spritesheet('player','Assets/player(final).png', 40, 40);
        game.load.image('ground','Assets/Structure.png');
        game.load.image('border','Assets/borders.jpg');
        game.load.image('background','Assets/background.jpg');
        game.load.image('door','Assets/Nest- Unfinished.png');
        game.load.image('end','Assets/birds_finished.png');
        game.load.spritesheet('enemy','Assets/Enemy.png', 40, 40);
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
        //im adding this to tell whether to check for collisions or not
        this.isLightning = true;
        
        this.player = game.add.sprite(100,550,'player');
        this.player.animations.add('going_left',[0, 1, 2, 3, 4, 5, 6, 7],12, true);
        this.player.animations.add('idle',[8, 9, 10, 11, 12, 13, 14, 15], 12,true);
        this.player.animations.add('going_right',[8, 9, 10, 11, 12, 13, 14, 15], 12,true);
        
        
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
			'x 	         ooo             x',
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
                game.physics.arcade.enable(door);
                door.body.immovable = true;
            }else if (level[i][j] == 'e'){
				var enemy = game.add.sprite(40+40*j, 40+40*i, 'enemy');
                this.enemySprite = enemy;
                this.enemySprite.body.velocity.y = 100;
                this.enemySprite.animations.add('going_up', [1],1, true);
                this.enemySprite.animations.add('going_down', [0],1, true);
                this.enemySprite.animations.play('going_down');
                this.count = 0;
				this.enemy.add(enemy);
                this.enemy.add(this.enemySprite);
                enemy.body.movable = true;
            }else if (level[i][j] == 't'){
				var enemy = game.add.sprite(40+40*j, 40+40*i, 'enemy');
                this.enemySprite1 = enemy;
                this.enemySprite1.body.velocity.y = 100;
                this.enemySprite1.animations.add('going_up', [1],1, true);
                this.enemySprite1.animations.add('going_down', [0],1, true);
                this.enemySprite1.animations.play('going_down');
                this.count = 0;
				this.enemy.add(enemy);
                enemy.body.movable = true;
            }  else if (level[i][j] == 'u'){
				var lightning = game.add.sprite(40+40*j, 40+40*i, 'lightning');
				this.lightning.add(lightning);
                lightning.body.immovable = true;
                lightning.visible = true;
                game.time.events.add(Phaser.Timer.SECOND * 1,this.disappear_lightning,this);
            }//if-else
		}//inner-for
	}//outer-for
 }, //create

    update:function(){
        game.physics.arcade.collide(this.player,this.border);
        game.physics.arcade.collide(this.player,this.ground);
        game.physics.arcade.overlap(this.player,this.door, this.Lvl2_link, null, this);
        game.physics.arcade.overlap(this.player,this.enemy,this.splash,null, this);
        if(this.isLightning){
        game.physics.arcade.overlap(this.player,this.lightning,this.splash,null,this);
        }
        
         this.count++;
        if (this.count % 300 == 0) {
          this.enemySprite.body.velocity.y *= -1;
          this.enemySprite1.body.velocity.y *= -1;
          this.enemySprite.animations.play('going_up');
          this.enemySprite1.animations.play('going_up');
        }
        if(this.count % 600 == 0){
          this.enemySprite.animations.play('going_down');
            this.enemySprite1.animations.play('going_down');
        }
        	
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
			this.player.body.velocity.y=-320;
            this.player.animations.play('idle');
        }//end if
    },//update
     Lvl2_link: function (){
game.state.start('Lvl2_2');
},
    
splash:function(){
    game.state.start('PS');
},
disappear_lightning: function (){
        this.lightning.visible = false;
    this.lightning.bodyEnable = false;
    this.isLightning = false;
        game.time.events.add(Phaser.Timer.SECOND * 3 ,this.appear_lightning,this)
 },
appear_lightning: function (){
    this.lightning.visible = true;
    this.lightning.bodyEnable = true;
    this.isLightning = true;
    game.time.events.add(Phaser.Timer.SECOND * 1 ,this.disappear_lightning,this)
},
};


var Lv2State = {
    preload:function(){},
    
    create:function(){
        game.state.add('Lvl2',game.Lvl2);
        game.state.start('Lvl2');
    },
    update:function(){},
};

var postState  = {
    preload:function(){
    game.load.image('background2',"Assets/Assets_Splash/background_4.jpg");
    game.load.image('button2',"Assets/Assets_splash/background_button.png");
    game.load.image('gameover','Assets/Assets_Splash/gameover stuff.png');
        
    },
    create:function(){
        game.state.add('PS',game.PS);
        game.state.start('PS');
    },
   update:function(){},
};

function Lvl2_start(){
    game.state.start('Lvl2_2');
};


game.state.add('main',mainState);
game.state.add('menu',menuState);
game.state.add('Lvl2_2',Lv2State);
game.state.add('PS',postState);
game.state.start('menu');  

//add an time for lightning and make lightning condiitons work
//make the plane move
//
