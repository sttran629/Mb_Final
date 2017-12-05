game.PS = function(game){
    
};

var titlescreen;

    game.PS.prototype = {
        
    create:function(game){
        
        this.createButton(game,"Replay",game.world.centerX -400 ,game.world.centerY, 300, 100,
        function(){
            this.state.start('main');
        }),
            
        this.createButton(game,"Main Menu",game.world.centerX + 400,game.world.centerY, 300, 100,
        function(){
            this.state.start('MM');
        }),
        
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 200, 'background2')
        titlescreen.anchor.setTo(0.5 , 0.5);
        
        titlescreen2 = game.add.sprite(game.world.centerX -275,game.world.centerY - 675, 'gameover');
        
        game.world.sendToBack(titlescreen);
},
    update: function(game){
        
    },
    
    createButton:function(game,string, x, y, w, h, callback){
        var button2 = game.add.button(x, y, 'button2', callback, this, 0);
        button2.anchor.setTo(0.5, 0.5);
        button2.width = w;
        button2.height = h;
        
        
        
        var txt = game.add.text(button2.x,button2.y, string,{
            font:"30px Arial",
            fill:"#fff",
            align:"center"
        });
                                
        txt.anchor.setTo(0.5, 0.5);
        },
};





