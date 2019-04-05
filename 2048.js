window.onload = function () {
    randomGeneration();
};
let tryagain=document.getElementById("try-again");
let ans=0;
let state=[ ];
let scorestate=[ ];
let statenum=-1;
let mark=document.getElementById("ans");
mark.innerHTML=ans;
let rcs = document.getElementsByClassName("rc");
let board = new Array(4);
for (let i = 0; i < 4; i++)
    board[i] = new Array(4);
for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) board[i][j] = 0;

function init() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) board[i][j] = 0;
    ans=0;
}

function randomGeneration() {
    let sign = [ ];
    let lose = true;
    let k = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                lose = false;//有空格
                sign[k] = 4 * i + j;
                k++;
            }
        }
    }
    if(lose===false){//有空格，随机生成
        let cnt = Math.ceil(Math.random() * 2);
        for (let i = 0; i < cnt&&i<k; i++) {//生成一个或两个,当空格只剩下1(k=1)只生成一个
            let index = sign[Math.floor(Math.random()*k)];//取得随机生成的棋块编号
            let str = "<b>2</b>";
            board[Math.floor(index / 4)][index % 4] = 2;
            rcs[(index % 4) * 4 + Math.floor(index / 4)].className = "rc color-2";
            rcs[(index % 4) * 4 + Math.floor(index / 4)].innerHTML = str;
            renderBoard();
        }
    }
    else {//满格
        if(is_Lose()===true) lose_f();//满格且为输
    }
    //记录当前状态
    var tmp=new Array();
    for(var i=0;i<4;i++)tmp[i]=new Array(4);
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
            tmp[i][j]=board[i][j];
    scorestate[statenum+1]=ans;
    state[statenum+1]= [].concat(tmp);
    statenum++;
}


function toRight() {
    for (let i = 0; i < 4; i++) {
        let nums = [ ],//记录非空的数
            k = 0;
        for (let j = 0; j < 4; j++)
            if (board[i][j] > 0) {
                nums[k] = board[i][j];
                k++;
            }
        if (k === 1) {
            board[i][3] = nums[0], board[i][0] = 0, board[i][1] = 0, board[i][2] = 0;
        } else if (k === 2) {
            if (nums[0] === nums[1]) board[i][3] = 2 * nums[0], board[i][0] = 0, board[i][1] = 0, board[i][2] = 0,ans+=2 * nums[0];
            else {
                board[i][3] = nums[1], board[i][2] = nums[0], board[i][0] = 0, board[i][1] = 0;
            }
        } else if (k === 3) {
            if (nums[2] === nums[1]) board[i][3] = 2 * nums[1], board[i][2] = nums[0], board[i][0] = 0, board[i][1] = 0,ans+=2 * nums[1];
            else if (nums[0] === nums[1]) board[i][3] = nums[2], board[i][2] = 2 * nums[0], board[i][0] = 0, board[i][1] = 0,ans+=2 * nums[0];
            else board[i][3] = nums[2], board[i][2] = nums[1], board[i][1] = nums[0], board[i][0] = 0;
        } else if (k === 4) {
            if (nums[3] === nums[2]) {
                if (nums[0] === nums[1]) board[i][3] = 2 * nums[2], board[i][2] = 2 * nums[0], board[i][1] = 0, board[i][0] = 0,ans+=2 * nums[0],ans+=2 * nums[2];
                else board[i][3] = 2 * nums[2], board[i][2] = nums[1], board[i][1] = nums[0], board[i][0] = 0,ans+=2 * nums[2];
            } else if (nums[2] === nums[1]) board[i][3] = nums[3], board[i][2] = 2 * nums[1], board[i][1] = nums[0], board[i][0] = 0,ans+=2 * nums[1];
            else if (nums[1] === nums[0]) board[i][3] = nums[3], board[i][2] = nums[2], board[i][1] = 2 * nums[0], board[i][0] = 0;
            else
                for (let p = 0; p < 4; p++) board[i][p] = nums[p];
        }
    }
}

function toLeft() {
    for (let i = 0; i < 4; i++) {
        let nums = [ ],//记录非空的数
            k = 0;
        for (let j = 0; j < 4; j++)
            if (board[i][j] > 0) {
                nums[k] = board[i][j];
                k++;
            }
        if (k === 1) {
            board[i][0] = nums[0], board[i][1] = 0, board[i][2] = 0, board[i][3] = 0;
        } else if (k === 2) {
            if (nums[0] === nums[1]) board[i][0] = 2 * nums[0], board[i][1] = 0, board[i][2] = 0, board[i][3] = 0,ans+=2 * nums[0];
            else {
                board[i][0] = nums[0], board[i][1] = nums[1], board[i][2] = 0, board[i][3] = 0;
            }
        } else if (k === 3) {
            if (nums[0] === nums[1]) board[i][0] = 2 * nums[1], board[i][1] = nums[2], board[i][2] = 0, board[i][3] = 0,ans+=2 * nums[0];
            else if (nums[1] === nums[2]) board[i][0] = nums[0], board[i][1] = 2 * nums[1], board[i][2] = 0, board[i][3] = 0,ans+=2 * nums[1];
            else board[i][0] = nums[0], board[i][1] = nums[1], board[i][2] = nums[2], board[i][3] = 0;
        } else if (k === 4) {
            if (nums[0] === nums[1]) {
                if (nums[2] === nums[3]) board[i][0] = 2 * nums[0], board[i][1] = 2 * nums[2], board[i][2] = 0, board[i][3] = 0,ans+=2 * nums[0],ans+=2 * nums[2];
                else board[i][0] = 2 * nums[0], board[i][1] = nums[2], board[i][2] = nums[3], board[i][3] = 0,ans+=2 * nums[0];
            } else if (nums[1] === nums[2]) board[i][0] = nums[0], board[i][1] = 2 * nums[1], board[i][2] = nums[3], board[i][3] = 0,ans+=2 * nums[1];
            else if (nums[2] === nums[3]) board[i][0] = nums[0], board[i][1] = nums[1], board[i][2] = 2 * nums[3], board[i][3] = 0,ans+=2 * nums[3];
            else
                for (let p = 0; p < 4; p++) board[i][p] = nums[p];
        }
    }
}

function toDown() {
    for (let j = 0; j < 4; j++) {
        let nums = [ ], k = 0;
        for (let i = 0; i < 4; i++)
            if (board[i][j] > 0) {
                nums[k] = board[i][j];
                k++;
            }
        if (k === 1) board[3][j] = nums[0], board[2][j] = 0, board[1][j] = 0, board[0][j] = 0;
        else if (k === 2) {
            if (nums[0] === nums[1]) board[3][j] = 2 * nums[0], board[2][j] = 0, board[1][j] = 0, board[0][j] = 0,ans+=2 * nums[0];
            else board[3][j] = nums[1], board[2][j] = nums[0], board[1][j] = 0, board[0][j] = 0;
        } else if (k === 3) {
            if (nums[2] === nums[1]) board[3][j] = 2 * nums[2], board[2][j] = nums[0], board[1][j] = 0, board[0][j] = 0,ans+=2 * nums[2];
            else if (nums[0] === nums[1]) board[3][j] = nums[2], board[2][j] = 2 * nums[1], board[1][j] = 0, board[0][j] = 0,ans+=2 * nums[1];
            else board[3][j] = nums[2], board[2][j] = nums[1], board[1][j] = nums[0], board[0][j] = 0;
        } else if (k === 4) {
            if (nums[3] === nums[2]) {
                if (nums[0] === nums[1]) board[3][j] = 2 * nums[3], board[2][j] = 2 * nums[1], board[1][j] = 0, board[0][j] = 0,ans+=2 * nums[1],ans+=2 * nums[3];
                else board[3][j] = 2 * nums[3], board[2][j] = nums[1], board[1][j] = nums[0], board[0][j] = 0,ans+=2 * nums[3];
            } else if (nums[2] === nums[1]) board[3][j] = nums[3], board[2][j] = 2 * nums[2], board[1][j] = nums[1], board[0][j] = 0,ans+=2 * nums[2];
            else if (nums[1] === nums[0]) board[3][j] = nums[3], board[2][j] = nums[2], board[1][j] = 2 * nums[1], board[0][j] = 0,ans+=2 * nums[1];
            else
                for (let p = 0; p < 4; p++) board[p][j] = nums[p];
        }
    }
}

function toUp() {
    for (let j = 0; j < 4; j++) {
        let nums = [ ], k = 0;
        for (let i = 0; i < 4; i++)
            if (board[i][j] > 0) {
                nums[k] = board[i][j];
                k++;
            }
        if (k === 1) board[0][j] = nums[0], board[2][j] = 0, board[1][j] = 0, board[3][j] = 0;
        else if (k === 2) {
            if (nums[0] === nums[1]) board[0][j] = 2 * nums[0], board[2][j] = 0, board[1][j] = 0, board[3][j] = 0,ans+=2 * nums[0];
            else board[0][j] = nums[0], board[1][j] = nums[1], board[2][j] = 0, board[3][j] = 0;
        } else if (k === 3) {
            if (nums[0] === nums[1]) board[0][j] = 2 * nums[0], board[1][j] = nums[2], board[2][j] = 0, board[3][j] = 0,ans+=2 * nums[0];
            else if (nums[1] === nums[2]) board[0][j] = nums[0], board[1][j] = 2 * nums[1], board[2][j] = 0, board[3][j] = 0,ans+=2 * nums[1];
            else board[0][j] = nums[0], board[1][j] = nums[1], board[2][j] = nums[2], board[3][j] = 0;
        } else if (k === 4) {
            if (nums[0] === nums[1]) {
                if (nums[2] === nums[3]) board[0][j] = 2 * nums[0], board[1][j] = 2 * nums[2], board[2][j] = 0, board[3][j] = 0,ans+=2 * nums[0],ans+=2 * nums[2];
                else board[0][j] = 2 * nums[0], board[1][j] = nums[2], board[2][j] = nums[3], board[3][j] = 0,ans+=2 * nums[0];
            } else if (nums[1] === nums[2]) board[0][j] = nums[0], board[1][j] = 2 * nums[2], board[2][j] = nums[3], board[3][j] = 0,ans+=2 * nums[2];
            else if (nums[2] === nums[3]) board[0][j] = nums[0], board[1][j] = nums[1], board[2][j] = 2 * nums[2], board[3][j] = 0,ans+=2 * nums[1];
            else
                for (let p = 0; p < 4; p++) board[p][j] = nums[p];
        }
    }
}

function renderBoard() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
               let str = "<b>" + board[i][j] + "</b>";
                let newClassName = null;
                if(board[i][j]===0){
                    str="";
                    newClassName="rc big color-0";
                }
                else
                    newClassName="rc color-"+board[i][j];
                rcs[4 * j + i].className = newClassName;
                rcs[4 * j + i].innerHTML = str;

        }
}

document.onkeydown = function (ev) {
    let e = window.event || ev;
    switch (e.keyCode) {
        case 39:toRight();break;
        case 37:toLeft();break;
        case 40:toDown();break;
        case 38:toUp();break;
    }
    mark.innerHTML=ans;
    renderBoard();
    randomGeneration();

};

tryagain.onclick=function () {
    restart();

};

function lose_f() {
    document.getElementById("final-score").innerHTML=ans;
    let gameover=document.getElementById("gameover-div");
    gameover.style.visibility="initial";
    let total=document.getElementById("total");
    total.style.opacity="0.4";

}



function is_Lose() {
    for(let i=0;i<4;i++)
        for(let j=0;j<3;j++)if(board[i][j]===board[i][j+1])
            return false;
    for(let i=0;i<3;i++)
        for(let j=0;j<4;j++)if(board[i][j]===board[i+1][j])
            return false;
    return true;
}

function restart() {
    statenum=-1,state=[ ],scorestate=[ ];
    init();
    renderBoard();
    randomGeneration();
    let total=document.getElementById("total");
    total.style.opacity=1;
    let gameover=document.getElementById("gameover-div");
    gameover.style.visibility="hidden";
    let ans=document.getElementById("ans");
    ans.innerHTML="0";
}
function retreat() {
    if(statenum<1){mark.innerHTML="0";}
    else {
        mark.innerHTML=scorestate[statenum-1];
        let tmp=new Array();
        for(let i=0;i<4;i++)tmp[i]=new Array(4);
        tmp=state[statenum-1].slice();
        for(let i=0;i<4;i++)
            for(let j=0;j<4;j++)
                board[i][j]=tmp[i][j];
        renderBoard();
        statenum--;
    }
}