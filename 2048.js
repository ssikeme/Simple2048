var rcs=document.getElementsByClassName("rc");
var board=new Array(4);
for(var i=0;i<4;i++)
    board[i]=new Array(4);
for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)board[i][j]=0;



function randomGeneration() {
    var sign=new Array();
    var lose=true;
    var k=0;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                lose=false;
                sign[k]=4*i+j;
                k++;
            }
        }
    }
    if(lose==true){alert("Game Over");}
    else {
        var cnt=Math.ceil(Math.random()*2);
        for(var i=0;i<cnt;i++){//生成一个或两个
            var index=sign[Math.ceil(Math.random()*(k+1))-1];//取得随机生成的棋块编号
            var str="<b>2</b>";
            board[Math.floor(index/4)][index%4]=2;
            rcs[(index%4)*4+Math.floor(index/4)].innerHTML=str;

        }
    }
}
window.onload=function () {
    randomGeneration();

}
function toRight(){
    for(var i=0;i<4;i++){
        var nums=new Array(),//记录非空的数
            k=0;
        for(var j=0;j<4;j++)
            if(board[i][j]>0){
                nums[k]=board[i][j];
                k++;
            }
        if(k==1){
            board[i][3]=nums[0],board[i][0]=0,board[i][1]=0,board[i][2]=0;}
        else if(k==2){
            if(nums[0]==nums[1])board[i][3]=2*nums[0],board[i][0]=0,board[i][1]=0,board[i][2]=0;
            else {
                board[i][3]=nums[1],board[i][2]=nums[0],board[i][0]=0,board[i][1]=0;
            }
        }
        else if(k==3){
            if(nums[2]==nums[1])board[i][3]=2*nums[1],board[i][2]=nums[0],board[i][0]=0,board[i][1]=0;
            else if(nums[0]=nums[1])board[i][3]=nums[2],board[i][2]=2*nums[0],board[i][0]=0,board[i][1]=0;
            else board[i][3]=nums[2],board[i][2]=nums[1],board[i][1]=nums[0],board[i][0]=0;
        }
        else if(k==4){
          if(nums[3]==nums[2]){
              if(nums[0]==nums[1])board[i][3]=2*nums[2],board[i][2]=2*nums[0],board[i][1]=0,board[i][0]=0;
              else board[i][3]=2*nums[2],board[i][2]=nums[1],board[i][1]=nums[0],board[i][0]=0;
          }
          else if(nums[2]==nums[1])board[i][3]=nums[3],board[i][2]=2*nums[1],board[i][1]=nums[0],board[i][0]=0;
          else if(nums[1]==nums[0])board[i][3]=nums[3],board[i][2]=nums[2],board[i][1]=2*nums[0],board[i][0]=0;
          else
              for(var p=0;p<4;p++)board[i][p]=nums[p];
        }
    }
}

function toLeft(){
    for(var i=0;i<4;i++){
        var nums=new Array(),//记录非空的数
            k=0;
        for(var j=0;j<4;j++)
            if(board[i][j]>0){
                nums[k]=board[i][j];
                k++;
            }
        if(k==1){
            board[i][0]=nums[0],board[i][1]=0,board[i][2]=0,board[i][3]=0;}
        else if(k==2){
            if(nums[0]==nums[1])board[i][0]=2*nums[0],board[i][1]=0,board[i][2]=0,board[i][3]=0;
            else {
                board[i][0]=nums[0],board[i][1]=nums[1],board[i][2]=0,board[i][3]=0;
            }
        }
        else if(k==3){
            if(nums[0]==nums[1])board[i][0]=2*nums[1],board[i][1]=nums[2],board[i][2]=0,board[i][3]=0;
            else if(nums[1]=nums[2])board[i][0]=nums[0],board[i][1]=2*nums[1],board[i][2]=0,board[i][3]=0;
            else board[i][0]=nums[0],board[i][1]=nums[1],board[i][2]=nums[2],board[i][3]=0;
        }
        else if(k==4){
            if(nums[0]==nums[1]){
                if(nums[2]==nums[3])board[i][0]=2*nums[0],board[i][1]=2*nums[2],board[i][2]=0,board[i][3]=0;
                else board[i][0]=2*nums[0],board[i][1]=nums[2],board[i][2]=nums[3],board[i][3]=0;
            }
            else if(nums[1]==nums[2])board[i][0]=nums[0],board[i][1]=2*nums[1],board[i][2]=nums[3],board[i][3]=0;
            else if(nums[2]==nums[3])board[i][0]=nums[0],board[i][1]=nums[1],board[i][2]=2*nums[3],board[i][3]=0;
            else
                for(var p=0;p<4;p++)board[i][p]=nums[p];
        }
    }
}

function toDown() {
    for(var j=0;j<4;j++){
        var nums=new Array(),k=0;
        for(var i=0;i<4;i++)
            if(board[i][j]>0){
                nums[k]=board[i][j];
                k++;
            }
        if(k==1)board[3][j]=nums[0],board[2][j]=0,board[1][j]=0,board[0][j]=0;
        else if(k==2){
            if(nums[0]==nums[1])board[3][j]=2*nums[0],board[2][j]=0,board[1][j]=0,board[0][j]=0;
            else board[3][j]=nums[1],board[2][j]=nums[0],board[1][j]=0,board[0][j]=0;
        }
        else if(k==3){
            if(nums[2]==nums[1])board[3][j]=2*nums[2],board[2][j]=nums[0],board[1][j]=0,board[0][j]=0;
            else if(nums[0]==nums[1])board[3][j]=nums[2],board[2][j]=2*nums[1],board[1][j]=0,board[0][j]=0;
            else board[3][j]=nums[2],board[2][j]=nums[1],board[1][j]=nums[0],board[0][j]=0;
        }
        else if(k==4){
            if(nums[3]==nums[2]){
                if(nums[0]==nums[1])board[3][j]=2*nums[3],board[2][j]=2*nums[1],board[1][j]=0,board[0][j]=0;
                else board[3][j]=2*nums[3],board[2][j]=nums[1],board[1][j]=nums[0],board[0][j]=0;
            }
            else if(nums[2]==nums[1])board[3][j]=nums[3],board[2][j]=2*nums[2],board[1][j]=nums[1],board[0][j]=0;
            else if(nums[1]==nums[0])board[3][j]=nums[3],board[2][j]=nums[2],board[1][j]=2*nums[1],board[0][j]=0;
            else
                for(var p=0;p<4;p++)board[p][j]=nums[p];
        }
    }
}

function toUp() {
    for(var j=0;j<4;j++){
        var nums=new Array(),k=0;
        for(var i=0;i<4;i++)
            if(board[i][j]>0){
                nums[k]=board[i][j];
                k++;
            }
        if(k==1)board[0][j]=nums[0],board[2][j]=0,board[1][j]=0,board[3][j]=0;
        else if(k==2){
            if(nums[0]==nums[1])board[0][j]=2*nums[0],board[2][j]=0,board[1][j]=0,board[3][j]=0;
            else board[0][j]=nums[0],board[1][j]=nums[1],board[2][j]=0,board[3][j]=0;
        }
        else if(k==3){
            if(nums[0]==nums[1])board[0][j]=2*nums[0],board[1][j]=nums[2],board[2][j]=0,board[3][j]=0;
            else if(nums[1]==nums[2])board[0][j]=nums[0],board[1][j]=2*nums[1],board[2][j]=0,board[3][j]=0;
            else board[0][j]=nums[0],board[1][j]=nums[1],board[2][j]=nums[2],board[3][j]=0;
        }
        else if(k==4){
            if(nums[0]==nums[1]){
                if(nums[2]==nums[3])board[0][j]=2*nums[0],board[1][j]=2*nums[2],board[2][j]=0,board[3][j]=0;
                else board[0][j]=2*nums[0],board[1][j]=nums[2],board[2][j]=nums[3],board[3][j]=0;
            }
            else if(nums[1]==nums[2])board[0][j]=nums[0],board[1][j]=2*nums[2],board[2][j]=nums[3],board[3][j]=0;
            else if(nums[2]==nums[3])board[0][j]=nums[0],board[1][j]=2*nums[1],board[2][j]=2*nums[2],board[3][j]=0;
            else
                for(var p=0;p<4;p++)board[p][j]=nums[p];
        }
    }
}

function renderBoard(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]>0){
                str="<b>"+board[i][j]+"</b>";
                rcs[4*j+i].innerHTML=str;
            }
            else rcs[4*j+i].innerHTML="";
        }
}

document.onkeydown=function (e) {
    var e=window.event||e;
    if(e.keyCode==39)
        toRight();
    if(e.keyCode==37)
        toLeft();
    if(e.keyCode==40)
        toDown();
    if(e.keyCode==38)
        toUp();
    renderBoard();
    randomGeneration();
}