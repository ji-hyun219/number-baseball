// JavaScript source code
const $input = document.querySelector('input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');


const numbers = [];
for (let n = 1; n <= 9; n++) {
    numbers.push(n);
}

const answer = [];
for (let n = 0; n < 4; n++) {   // �� �� �ݺ�
    const index = Math.floor(Math.random() * numbers.length);    // 0 ~ 8
    answer.push(numbers[index]);  
    numbers.splice(index, 1);
}


let tries = [];
function checkInput(input) {   
    /* < �Է°� �����ϱ� >
     * 1. 4�ڸ� ���ΰ�
     * 2. �ߺ��� ���ڰ� �ִ°�
     * 3. �̹� �õ��� ���ΰ�(!)
    */

    if (input.length !== 4) {    // ���̴� 4�� �ƴѰ�
        return alert('please typing 4 number');
    }
    if (new Set(input).size !== 4) {   // �ߺ��� ���ڰ� �ִ°�
        return alert('There are duplicate numbers');
    }
    if (tries.includes(input)) {   // �̹� �õ��� ���� �ƴѰ�
        return alert('already tried');
    }
    return true;
}

function numberBaseball(input) {
    /* 1. ���� o, �ڸ� x --> ball ����
     * 2. ���� o, �ڸ� o --> strike ����
     * 3. ball: 0��, strike: 0�� --> Out
     * 4. strike �� 4���� ��� --> HOMERUN
     * 5. HomeRun �� ��� �����Ѵ�(�� �������� �ݺ�)
     * */

    let ball = 0;
    let strike = 0;

    for (let i = 0; i < answer.length; i++) {
        const index = input.indexOf(answer[i]);
        if (index > -1) {    // ��ġ�ϴ� ���� �߰�
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
    if (checkInput(input)) {      // �Է°� ���� ���� ���
        tries.push(input);
        console.log(answer.join(''));
        console.log(input);

        // Ȩ������ �˻� -> ���� ����
        if (answer.join('') === input ) {
            $logs.append('HOMERUN!');
            return;     // ����

        } else {   // Ȩ���� �ƴϴ� -> �� ��, �� ��Ʈ����ũ���� ȭ�鿡 ����Ѵ�
            numberBaseball(input);
        }

        if (tries.length >= 10) {
            $logs.append(`You are lost. The answer is ${answer.join('')}`)
            return;
        }
        
    }
   
}


$form.addEventListener('submit', OnClickButton);