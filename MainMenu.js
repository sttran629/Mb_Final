game.MainMenu = function(game){
    
};

var titlescreen;

    game.MainMenu.prototype = {
        
    create:function(game){
        
        this.button = game.add.group();
        
        this.createButton(game,"",game.world.centerX,game.world.centerY  -175, 250, 100,
        function(){
            this.state.start('main');
        }),
        
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 200, 'titlescreen')
        titlescreen.anchor.setTo(0.5 , 0.5);
        
        game.world.sendToBack(titlescreen);
},
    update: function(game){
        
    },
    
    createButton:function(game,string, x, y, w, h, callback){
        var button1 = game.add.button(x, y, 'button', callback, this, 0);
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x,button1.y, string,{
            font:"14px Arial",
            fill:"#fff",
            align:"center"
        });
                                
        txt.anchor.setTo(0.5, 0.5);
        },
};


