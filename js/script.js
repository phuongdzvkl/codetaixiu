const buttonDatCuoc = document.querySelector('.button-cuoc');
const buttonBet = document.querySelectorAll('.button-bet');
const bets = document.querySelectorAll('.bet');
const tagCoin = document.querySelector('#coin');
const totalBet = document.querySelectorAll('.total-bet');
//button all in
const buttonAllin = document.querySelector('.button-allin');
// coin các thứ
let myCoin = 0;
let coinPassTime = 0;
let myChoice = '';
let tagchoice;
let coin;

tagCoin.innerText = `coin: ${myCoin}`;

// sự kiện kéo thả đĩa plate
const plateMove = document.querySelector('.plate-move');
let setX = 0;
let setY = 0;
let isDragging = false;
plateMove.addEventListener('mousedown', (event) => {
    isDragging = true;
    setX = event.clientX - plateMove.offsetLeft;
    setY = event.clientY - plateMove.offsetTop;

});
document.addEventListener('mousemove', (event) => {

    if (isDragging) {
        let x = event.clientX - setX;
        let y = event.clientY - setY;
        plateMove.style.left = x + 'px';
        plateMove.style.top = y + 'px';
    }
});
document.addEventListener('mouseup', (event) => {
    isDragging = false;
})
// set 30s 1 turn
const plateShowtime = document.querySelector('.plate-move');
let setInter;
let timeStart = 30;
const noti = document.querySelector('#noti-system');
// đếm ngược sau 30s random 3 cục dice ngẫu nhiên
const SystemTurnTime = () => {
    if (timeStart < 1) {
        DiceRamdon();
        noti.innerText = 'System: Đã xáo xúc xắc, vui lòng mở bát'
        clearInterval(setInter);
    };
    plateShowtime.innerText = timeStart;
    --timeStart;
}
// set cứ 40s lại gọi lại set 30 1turn
setInterval(() => {
    // gọi hàm xử lí turn cược
    handleMoney();
    buttonDatCuoc.classList.add('disabled');
    // reset để sang turn mới
    resetAll();
    setInter = setInterval(SystemTurnTime, 1000);
}, 40000);
setInter = setInterval(SystemTurnTime, 1000);

// ham random xuc xac 
const dices = document.querySelectorAll('.dice');
const DiceRamdon = () => {
    dices.forEach(dice => {
        const numberRandom = Math.floor(Math.random() * 6 + 1);
        dice.innerText = numberRandom;
    });
}
// bắt sự kiện cược của 2 cược tài cược xỉu

buttonBet.forEach(button => {
    button.addEventListener('click', (event) => {
        buttonAllin.classList.remove('disabled');
        const tag = event.target;
        myChoice = tag.getAttribute('choiceValue');
        tagchoice = tag;
        buttonBet.forEach(button => {
            if (tag != button) {
                button.classList.add('disabled');
            }
        });
        tag.classList.add('button-bet-click');
        bets.forEach((bet) => {
            bet.classList.remove('disabled');
        });
    });
});

// bắt sự kiện khi click vào các bet cược
bets.forEach(bet => {
    bet.addEventListener('click', (event) => {
        buttonDatCuoc.classList.remove('disabled');
        coinValueButton = Number(event.target.getAttribute('coinValue'));
        coinPassTime += coinValueButton;

        if (coinPassTime > myCoin) {
            noti.innerText = 'Số dư không đủ';
            coinPassTime -= coinValueButton;
            setTimeout(() => {
                noti.innerText = '';
            }, 1000);
        }
    });
});
// bắt sự kiện đặt cược 
buttonDatCuoc.addEventListener('click', (event) => {
    if (tagchoice) {
        let coinNeedTotal = tagchoice.previousElementSibling;
        coinNeedTotal.innerText = coinPassTime;
        coin = coinPassTime;
    }
});
// xử lí xúc xắc

const handleDice = (list) => {
    const newList = Array.from(list);
    return newList.reduce((total, elm) => {
        return total + Number(elm.innerText);
    }, 0);
}
// xử máy dịch tài hay xỉu
const handleBotChoiceTX = (value) => {
    if (value >= 11) {
        return 'tai';
    }
    return 'xiu';
}
const handleMoney = () => {

    if (coin) {
        if (handleBotChoiceTX(handleDice(dices)) === myChoice) {
            noti.innerText = 'CHÚC MỪNG BẠN ĐÃ THẮNG CƯỢC =))))'
            myCoin += coin;
        } else {
            noti.innerText = 'CƯỢC NGU CHẾT THUA CMMR KÌA =(((('
            myCoin -= coin;
        }
    }

}
// reset turn
const resetAll = () => {
    // reset các trở về mặc định là không thể click
    buttonBet.forEach(button => {
        button.classList.remove('button-bet-click');
        button.classList.remove('disabled');
    });
    bets.forEach((bet) => {
        bet.classList.add('disabled');
    });
    // set hiện tổng xu cược về 0
    totalBet.forEach(total => {
        total.innerText = '0';
    });
    // tất cả dữ liệu xèng cược reset về 0 để sang turn mới
    coinPassTime = 0;
    myChoice = '';
    tagchoice = undefined;
    setTimeout(() => {
        noti.innerText = '';
    }, 3000);
    coin = undefined;
    // reset đĩa về vị trị mặc định sau khi sang turn mới ..phuongdz
    plateShowtime.style.left = 50 + '%';
    plateShowtime.style.top = 40 + '%';
    timeStart = 30;
    // cập nhật lại số xu sau khi thắng/thua ván cược
    tagCoin.innerText = `coin: ${myCoin}`;
}


// xử lí gift 
const gift = document.querySelector('.gift');
const ogift = document.querySelector('.ogift');
gift.addEventListener('click', (event) => {
    if (ogift.value === 'phuongdz') {
        myCoin += 9999;
        tagCoin.innerText = myCoin;
    }
});

buttonAllin.addEventListener('click', (event) => {
    if (tagchoice) {
        coin = myCoin;
        tagchoice.previousElementSibling.innerText = coin;
    }
});
// xử lí hiệu ứng âm thanh âm thanh của tất cả button
const buttonSound = document.querySelectorAll('.button-sound');
buttonSound.forEach((button)=> {
    button.addEventListener('click',()=> {
        const audio = new Audio('audioclick/click.wav');
        audio.play();
    });
});
// xử lí nhạc
let isPlaying = false;
function playMusic() {
    var audio = document.getElementById("background-music");
    if(isPlaying) {
        audio.pause();
        isPlaying = false;
    }else {
        audio.play();
        isPlaying = true;
    }
}

const iconSound = document.querySelector('.icon-sound');
iconSound.addEventListener('click',()=> {
    playMusic();
});