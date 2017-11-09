'use strict'

var gNum1 = '';
var gNum2 = null;
var gOper;
var gResult;
var gElScreen = document.querySelector('.screen');
var gMemoryNum;


function addDigit(digit) {  
    if (gNum2 === null) {
        gNum1 += digit      // use the num as string so twice 5 will be 55 and not 10;
        gElScreen.innerHTML = gNum1;
    } else {
       gNum2 += digit; 
       gElScreen.innerHTML = gNum2;
    }
    // console.log('num1:', gNum1)
    // console.log('num2:', gNum2)
}


function arithmetic(oper) {
    switch (oper) {
        case '+':
        case '-':
        case '*':
        case '/':
            gNum2 = '';
            gOper = oper;
            gElScreen.innerHTML = gOper;
            break;
        
        case '=':
            if (gOper === '+') { 
                gResult = (+gNum1) + (+gNum2);      // easier to read with ();
            } else if (gOper === '-') {
                gResult = (+gNum1) - (+gNum2);
            } else if (gOper === '*') {
                gResult = (+gNum1) * (+gNum2);
            } else if (gOper === '/') {
                gResult = (+gNum1) / (+gNum2);
            }
            // console.log('result:', gResult);
            gElScreen.innerHTML = gResult; 
            gNum1 = gResult;        // one can continue calc after equal op;          
    }
}


function del() {
    // console.log('delete')
    if (gNum2 === null) {
        gNum1 = gNum1.slice(0, -1);
        gElScreen.innerHTML = gNum1;
    } else if (gResult) {       // can't delete the last char of result;
        return;
    } else {
        gNum2 = gNum2.slice(0, -1);
        gElScreen.innerHTML = gNum2;
    }
}

// clear the screen. DOES NOT WORK WITH FUNCTION NAME 'CLEAR';
function clearNum() {
    // console.log('clear')
    if (gNum2 === null) {
        gNum1 = '';
        gElScreen.innerHTML = gNum1;
    } else if (gResult) {
        gNum1 = '';
        gNum2 = null;
        gResult = '';
        gElScreen.innerHTML = gResult;
    } else {
        gNum2 = '';
        gElScreen.innerHTML = gNum2;
    }
}

function addToMemory(action) {
    switch (action) {
        case 'mc':
            // console.log('mc')
            gMemoryNum = 0;
            break;
        
        case 'mr':
            // console.log('mr')
            if (gNum2 === null) {
                gNum1 = +gMemoryNum;
                gElScreen.innerHTML = gNum1;
            } else {
                gNum2 = +gMemoryNum;;
                gElScreen.innerHTML = gNum2;                
            }
            break;
        
        case 'ms':
            // console.log('ms')
            gMemoryNum = +gElScreen.innerHTML;
            break;                      
        
        case 'mp':
            // console.log('m+')
            gMemoryNum = ((+gElScreen.innerHTML) + (+gMemoryNum));
            // gElScreen.innerHTML = gMemoryNum;
            break;
        
        case 'mm':
            // console.log('m-')
            gMemoryNum = ((+gMemoryNum) - (+gElScreen.innerHTML));
            // gElScreen.innerHTML = gMemoryNum;
            break;
    }
}


function getBase(base) {
    switch (base) {
        case 'dec':
            gElScreen.innerHTML = gResult;
            break;

        case 'bin':
            gElScreen.innerHTML = (+gResult).toString(2);
            break;

        case 'oct':
            gElScreen.innerHTML = (+gResult).toString(8);
            break;

        case 'hex':
            gElScreen.innerHTML = (+gResult).toString(16);
            break;
    }
}


function goBack() {
    window.history.back();
}