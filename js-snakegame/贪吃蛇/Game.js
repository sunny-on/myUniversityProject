
//自调用函数---游戏
(function () {
    var that=null;
    //游戏的构造函数
    function Game(map) {
        this.food=new Food();//食物对象
        this.snake=new Snake();//小蛇对象
        this.map=map;//地图
        that=this;//实例化对象保存在that
    }

    //初始化游戏---可以设置小蛇和食物显示出来
    Game.prototype.init=function () {
        //初始化游戏
        this.food.init(this.map);
        this.snake.init(this.map);
        //调用自动移动小蛇的方法
        this.runSnake(this.food,this.map);
        //调用按键的方法
        this.bindKey();

        // setInterval(function () {
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map);
        // },150);
    };

    //添加原型方法---设置小蛇可以自动移动
    Game.prototype.runSnake=function (food,map) {
        //自动的移动
        var timeId=setInterval(function () {
            //此时的this是window
            //移动小蛇
            this.snake.move(food,map);
            //初始化小蛇
            this.snake.init(map);
            //横坐标最大值
            var maxX=map.offsetWidth/this.snake.width;//40
            var maxY=map.offsetHeight/this.snake.height;
            //小蛇的头的坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //判断小蛇是否超出地图
            if (headX<0||headX>=maxX){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
            if (headY<0||headY>=maxY){
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that),100);//bind改变了this的指向，
    };

    //添加原型方法---按键改变方向
    Game.prototype.bindKey=function(){
        //获取用户的按键，改变小蛇方向
        document.addEventListener("keydown",function (e) {
            //这里的this应该是触发keydown的事件的对象---document
            //所以这里的this就是document
            //获取按键的值
            switch (e.keyCode) {
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;

            }
        }.bind(that),false);
    };

    //把Game暴露给window
    window.Game=Game;
}());