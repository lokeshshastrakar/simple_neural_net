class Matrix
{
    constructor(rows, cols)
    {
        this.rows = rows
        this.cols = cols
        this.matrix = new Array(this.rows)
        for(let i = 0; i < this.rows; i++)
        {
            this.matrix[i] = new Array(this.cols)
            for(let j = 0 ; j < this.cols; j++)
            {
                this.matrix[i][j] = 0
            }
        }

    }

    Randomize()
    {
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0 ; j < this.cols; j++)
            {
                this.matrix[i][j] = randomGaussian();
            }
        }
    }

    MatrixToArray()
    {
        let newmat = new Array()
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0 ; j < this.cols; j++)
            {
                newmat[i * this.rows + j] = this.matrix[i][j]
            }
        }
        return newmat;
    }

    Transpose()
    {
        let result = new Matrix(this.cols, this.rows)
        for(let i = 0; i < result.rows; i++)
        {
                for(let j = 0 ; j < result.cols; j++)
                {
                        result.matrix[i][j] = this.matrix[j][i]
                    }
                }
                return result
    }

    Copy()
    {
        let result = new Matrix(this.rows, this.cols)
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0 ; j < this.cols; j++)
            {
                result.matrix[i][j] = this.matrix[i][j]
            }
        }
        return result
    }

    AddMatrix(m)
    {
        if(m instanceof Matrix)
        {
            for(let i = 0; i < this.rows; i++)
            {
                for(let j = 0 ; j < this.cols; j++)
                {
                    this.matrix[i][j] = this.matrix[i][j] + m.matrix[i][j]
                }
            }
        }
        else
        {
            this.AddScalar(m)
        }
    }

    AddScalar(s)
    {
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0 ; j < this.cols; j++)
            {
                this.matrix[i][j] = this.matrix[i][j] + s
            }
        }
    }

    static map(m, fn)
    {
        let result = new Matrix(m.rows, m.cols)
        for(let i = 0; i < result.rows; i++)
        {
            for(let j = 0 ; j < result.cols; j++)
            {
                result.matrix[i][j] = fn(m.matrix[i][j])
            }
        }
        return result
    }

    static Subtract(m1,m2)
    {
        let result = new Matrix(m1.rows, m2.cols)
        for(let i = 0; i < m1.rows; i++)
        {
            for(let j = 0 ; j < m1.cols; j++)
            {
                result.matrix[i][j] = m1.matrix[i][j] - m2.matrix[i][j]
            }
        }
        return result
    }

    Multiply(m)
    {
        if(m instanceof Matrix)
        {
            for(let i = 0; i < this.rows; i++)
            {
                for(let j = 0 ; j < this.cols; j++)
                {
                    this.matrix[i][j] = this.matrix[i][j] * m.matrix[i][j]
                }
            }
        }
        else{
            for(let i = 0; i < this.rows; i++)
            {
                for(let j = 0 ; j < this.cols; j++)
                {
                    this.matrix[i][j] = this.matrix[i][j] * m
                }
            }
        }
    }

    static MultiplyDot(m1, m2)
    {
        if(m1.cols != m2.rows)
        {
            console.log("wrong")
            return
        }
        let result = new Matrix(m1.rows , m2.cols)
        for(let i = 0 ;i < m1.rows; i++)
        {
            for(let j = 0; j< m2.cols;j++)
            {
                let sum = 0
                for(let k = 0; k< m1.cols; k++)
                {
                    sum += m1.matrix[i][k] * m2.matrix[k][j]
                }
                result.matrix[i][j] = sum
            }
        }
        return result

    }

   static ArrayToMatrix(arr)
    {
        let result = new Matrix(arr.length, 1);
        for(let i = 0; i< arr.length; i++)
        {
            result.matrix[i][0] = arr[i]
        }
        return result
    }

    PrintMatrix()
    {
        console.table(this.matrix);
    }


}