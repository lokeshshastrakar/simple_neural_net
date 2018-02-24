class NeuralNetwork
{
    constructor(inputnodes, hiddennodes, outputnodes, learning_rate, activation)
    {
        if (arguments[0] instanceof NeuralNetwork) {
            var nn = arguments[0];
            this.inodes = nn.inodes;
            this.hnodes = nn.hnodes;
            this.onodes = nn.onodes;
            this.wih = nn.wih.copy();
            this.who = nn.who.copy();
            this.activation = nn.activation;
            this.derivative = nn.derivative;
            this.lr = this.lr;
          }
           else {
            this.inodes = inputnodes;
            this.hnodes = hiddennodes;
            this.onodes = outputnodes;
      
            this.wih = new Matrix(this.hnodes, this.inodes);
            this.who = new Matrix(this.onodes, this.hnodes);
      
            this.wih.Randomize();
            this.who.Randomize();
      
            this.lr = learning_rate || 0.1;
      
            if (activation == 'tanh') {
              this.activation = NeuralNetwork.Tanh;
              this.derivative = NeuralNetwork.dTanh;
            } else {
              this.activation = NeuralNetwork.Sigmoid;
              this.derivative = NeuralNetwork.dSigmoid;
            }
      
          }
    }

    static Sigmoid(x)
    {
        let y = 1 / (1 + pow(Math.E, -x))
        return y
    }

    static dSigmoid(x)
    {
        return x * (1 - x)
    }

    static Tanh(x)
    {
        var y = 1 / (pow(Math.cosh(x), 2))
        return y
    }

    static dTanh(x)
    {
        let y = 1 / (pow(Math.cosh(x), 2));
        return y;  
    }

    copy()
    {
        return new NeuralNetwork(this)
    }

    mutate()
    {
        this.wih = Matrix.map(this.wih, mutate)
        this.wih = Matrix.map(this.who, mutate)
    }

    train(input, target)
    {
        let inputs = Matrix.ArrayToMatrix(input)
        let targets = Matrix.ArrayToMatrix(target)

        let hidden_inputs = Matrix.MultiplyDot(this.wih, inputs)
        let hidden_outputs = Matrix.map(hidden_inputs, this.activation)

        let output_inputs = Matrix.MultiplyDot(this.who, hidden_outputs)
        let outputs = Matrix.map(output_inputs, this.activation)
        let output_errors = Matrix.Subtract(targets, outputs)
        let whoT = this.who.Transpose()
        let hidden_errors = Matrix.MultiplyDot(whoT, output_errors)
        let gradient_output = Matrix.map(outputs, this.derivative)
        gradient_output.Multiply(output_errors)
        gradient_output.Multiply(this.lr)

        let gradient_hidden = Matrix.map(hidden_outputs, this.derivative)
        gradient_hidden.Multiply(hidden_errors)
        gradient_hidden.Multiply(this.lr)

        let hidden_outputs_T = hidden_outputs.Transpose()
        let deltaW_output = Matrix.MultiplyDot(gradient_output, hidden_outputs_T)
        this.who.AddMatrix(deltaW_output)
        let inputs_T = inputs.Transpose()
        let deltaW_hidden = Matrix.MultiplyDot(gradient_hidden, inputs_T)
        this.wih.AddMatrix(deltaW_hidden)

    }

    Query(inputs_array)
    {
        let inputs = Matrix.ArrayToMatrix(inputs_array)
        let hidden_inputs = Matrix.MultiplyDot(this.wih, inputs)
        let hidden_outputs = Matrix.map(hidden_inputs, this.activation)
        let output_inputs = Matrix.MultiplyDot(this.who, hidden_outputs)
        let outputs = Matrix.map(output_inputs, this.activation)
        return outputs.MatrixToArray()
    }

    
}

function mutate(x) {
    if (random(1) < 0.1) {
      var offset = randomGaussian() * 0.5;
      // var offset = random(-0.1, 0.1);
      var newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }