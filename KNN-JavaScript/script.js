let chart = new Chart(document.querySelector('#chart'), {
    type:'scatter',
    data: chartData(),
    options: chartOptions()
})

document.querySelector('#plot').addEventListener('click',()=>{
    chart.data.datasets[0].data.push({
        x: Number(document.querySelector('#Var1').value),
        y: Number(document.querySelector('#Var2').value)
    })
    chart.update()
})

document.querySelector('#predict').addEventListener('click',()=>{
    const x = chart.data.datasets[0].data[chart.data.datasets[0].data.length-1].x
    const y = chart.data.datasets[0].data[chart.data.datasets[0].data.length-1].y
    let distances = []

    trainingSet().forEach((point)=>{
        distances.push(Math.sqrt(((x-point.Var1)**2)+((y-point.Var2)**2)))
    })

    let redNeighbors = 0
    let blueNeighbors = 0

    for(let k=1; k<=9; k++){
        const minDistance = Math.min.apply(Math, distances)
        const index = distances.indexOf(minDistance)
        chart.data.datasets[0].pointBackgroundColor[index]=='red' ? redNeighbors++ : blueNeighbors++
        distances[index] = +Infinity
    }

    if(redNeighbors > blueNeighbors){
        document.querySelector('#output').innerHTML = 'Correo Spam'
        chart.data.datasets[0].pointBackgroundColor[chart.data.datasets[0].data.length-1]='red'
    }
    else{
        document.querySelector('#output').innerHTML = 'Correo No Spam'
        chart.data.datasets[0].pointBackgroundColor[chart.data.datasets[0].data.length-1]='blue'        
    }
    chart.update()
})