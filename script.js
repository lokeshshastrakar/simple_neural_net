let nn;
let trainingIndex = 0
let testingIndex = 0

let training
let testing
let epochs = 0
let input_nodes = 784
let hidden_nodes = 256
let output_nodes = 10

let learning_rate = 0.1

let totalCorrect = 0
let totalGuesses = 0

let statusP 

let user_input
let small
let ux = 16
let uy = 100
let uw = 140

function preload()
{
    training = loadStrings('data/mnist_train.csv')
    testing = loadStrings('data/mnist_test.csv')
}

function setup()
{
    createCanvas(400, 400)
    pixelDensity(1)
    
    nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate, )

    statusP = createP()


    let clearButton = createButton('clear')
    clearButton.mousePressed(() => user_input.background(0))

    user_input = createGraphics(uw, uw);
    user_input.background(0)

    small = createImage(28, 28, RGB)
    let img = user_input.get()
    small.copy(img, 0 , 0, uw, uw, 0, 0, small.width, small.height)

}


function mouseDragged()
{
    if (mouseX > ux && mouseY > uy && mouseX < ux + uw && mouseY < uy + uw) {
        user_input.fill(255);
        user_input.stroke(255);
        user_input.ellipse(mouseX - ux, mouseY - uy, 10, 10);
        var img = user_input.get();
        small.copy(img, 0, 0, uw, uw, 0, 0, small.width, small.height);
      }
}

function draw()
{
    background(200)
    let traindata = train()

    let result = test()

    let testdata = result[0]
    let guess = result[1]
    let correct = result[2]

    drawImage(traindata, ux, 16, 2, 'training')
    drawImage(testdata, 180, 16, 2, 'test')

    fill(0)
    rect(246, 16, 2 * 28, 2 * 28)
    if(correct)
    {
        fill(0,255,0)
    }
    else{
        fill(255,0,0)
    }

    textSize(60);
    // console.log("Guess" , guess)
    text(guess, 258, 64)
    if(correct)
    {
        totalCorrect++
    }
    totalGuesses++

    let status = 'Performance: ' + nf(totalCorrect / totalGuesses, 0 , 2)
    status += '<br>'

    let percent = 100 * trainingIndex / training.length
    status += 'epochs: ' + epochs + '(' + nf(percent, 1 , 2) + '%)'
    statusP.html(status)

    image(user_input, ux, uy)
    fill(0)
    textSize(12)
    text('draw here', ux, uy+uw+16)
    image(small, 180,uy,28*2, 28*2)

    let inputs = []

    small.loadPixels()
    for(let i= 0;i <small.pixels.length; i+=4)
    {
        inputs[i/4] = map(small.pixels[i], 0, 255, 0, 0.99) + 0.01;
    }

    let outputs = nn.Query(inputs)
    let finalguess = findMax(outputs)
    finalguess /= 10 
    fill(0)
    rect(246, uy, 2*28, 2*28)
    fill(255)
    textSize(60)
    text(finalguess, 258, uy + 48)
}

function train()
{
    let values = training[testingIndex].split(',')

    let inputs = []

    for(let i = 1; i<values.length; i++)
    {
        inputs[i-1] = map(Number(values[i]), 0 , 255, 0, 0.99) + 0.01
    }

    targets = []
    for(let i = 0; i < output_nodes; i++)
    {
        targets[i] = 0.01
    }

    let label = Number(values[0])
    targets[label] = 0.99

    nn.train(inputs, targets)

    trainingIndex++
    if(trainingIndex == training.length)
    {
        trainingIndex = 0
        epochs++
    }
    return inputs
}

function test()
{
    let values = training[testingIndex].split(',')

    let inputs = []

    for(let i = 1; i < values.length; i++)
    {
        inputs[i -1] = map(Number(values[i]), 0 , 255, 0, 0.99) + 0.01
    }

    let label = Number(values[0])

    let outputs = nn.Query(inputs)
    let guess = findMax(outputs)
    let correct = false
    guess /= 10;
    if(guess == label)
    {
        correct = true
    }

    if(frameCount % 30 == 0){
        testingIndex++
        if(testingIndex == testing.length){
            testingIndex = 0
        }
    }

    return [inputs, guess, correct]
}


function findMax(list)
{
    let records = 0
    let index = 0
    for(let i = 0; i < list.length; i++)
    {
        if(list[i] > records)
        {
            records = list[i]
            index = i
        }
    }

    return index
}


function drawImage(values, xoff, yoff, w, txt)
{
    let dim = 28
    for(let k =0; k< values.length; k++)
    {
        let brightness = values[k] * 256
        let x = k % dim
        let y = floor(k / dim)
        fill(brightness)
        noStroke()
        rect(xoff + x * w, yoff + y * w, w,w)
    }

    fill(0)
    textSize(12)
    text(txt, xoff, yoff + w*35)
}


