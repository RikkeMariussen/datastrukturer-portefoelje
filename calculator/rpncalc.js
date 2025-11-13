const expression = "2 3 4 * +";

const inputQueue = [];

const resultStack = [];

// parseExpression læser en expression og putter den i inputQueue
function parseExpression ( expression ) {
    //Splitting expressions and operations - but they are still strings - and we want numbers to be numbers and operations to be string
    const splitted = expression.split(" ");
    
    //Looking through each value
    for(const val of splitted) {
        if(isNaN(val)){
            //val er en operation
            inputQueue.push(val);
        } else {
            inputQueue.push(Number(val));
        }
    }
    console.log(inputQueue);
}

// goThroughQueue går gennem køen og finder tal og operationer
function goThroughQueue () {
    //Så længe der er noget i køen.. så skal vi i gennem loopet
    while(inputQueue.length > 0) {
        //"dequeue" element fra køen (shift fjerner elementet)
        let val = inputQueue.shift();
        //hvis det er et number:
        if(!isNaN(val)) {
            //push det til resultStack
            resultStack.push(val);
        //Ellers er det en operation
        } else { 
            //Så kald performOperation med den
            performOperation(val);
        }

    }
    
}

// performOperation udfører en bestemt operation
function performOperation ( operation ) {
    //pop de sidste to værdier fra resultStack til A og B
    let a = resultStack.pop();
    let b = resultStack.pop();

    // Hvis operation == +
        //læg A og B sammen, push resultatet til resultstack
    if(operation == "+") {
        return resultStack.push(Number(a+b));
    //hvis operation == "*"
        //gang A og B samme og push resultatet til resultStack
    } else if(operation == "*") {
        return resultStack.push(Number(a*b));
    } else if(operation == "-") {
        return resultStack.push(Number(a-b));
    } 

    //osv.
}

function rpncalc ( expression ) {
    parseExpression(expression);
    goThroughQueue();
    console.log(resultStack);
}

rpncalc(expression);

//node rpncalc.js