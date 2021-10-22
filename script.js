// JavaScript source code
const $input = document.querySelector('input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');


const numbers = [];
for (let n = 1; n <= 9; n++) {
    numbers.push(n);
}

const answer = [];
for (let n = 0; n < 4; n++) {   // 네 번 반복
    const index = Math.floor(Math.random() * numbers.length);    // 0 ~ 8
    answer.push(numbers[index]);  
    numbers.splice(index, 1);
}


let tries = [];
function checkInput(input) {   
    /* < 입력값 검증하기 >
     * 1. 4자리 수인가
     * 2. 중복된 숫자가 있는가
     * 3. 이미 시도한 값인가(!)
    */

    if (input.length !== 4) {    // 길이는 4가 아닌가
        return alert('please typing 4 number');
    }
    if (new Set(input).size !== 4) {   // 중복된 숫자가 있는가
        return alert('There are duplicate numbers');
    }
    if (tries.includes(input)) {   // 이미 시도한 값은 아닌가
        return alert('already tried');
    }
    return true;
}

function numberBaseball(input) {
    /* 1. 숫자 o, 자리 x --> ball 세기
     * 2. 숫자 o, 자리 o --> strike 세기
     * 3. ball: 0개, strike: 0개 --> Out
     * 4. strike 가 4개인 경우 --> HOMERUN
     * 5. HomeRun 일 경우 종료한다(그 전까지는 반복)
     * */

    let ball = 0;
    let strike = 0;

    for (let i = 0; i < answer.length; i++) {
        const index = input.indexOf(answer[i]);
        if (index > -1) {    // 일치하는 숫자 발견
            if (index === i) {     
                strike++;
            }
            else {
                ball++;
            }
        }
    }
    $logs.append(`${strike} strike, ${ball} ball`, document.createElement('br'));
    return;
    
}

function OnClickButton(event) {
    event.preventDefault();
    const input = $input.value;
    $input.value = ''; 
    checkInput(input);
    if (checkInput(input)) {      // 입력값 문제 없는 경우
        tries.push(input);
        console.log(answer.join(''));
        console.log(input);

        // 홈런인지 검사 -> 게임 종료
        if (answer.join('') === input ) {
            $logs.append('HOMERUN!');
            return;     // 종료

        } else {   // 홈런이 아니다 -> 몇 볼, 몇 스트라이크인지 화면에 출력한다
            numberBaseball(input);
        }

        if (tries.length >= 10) {
            $logs.append(`You are lost. The answer is ${answer.join('')}`)
            return;
        }
        
    }
   
}


$form.addEventListener('submit', OnClickButton);