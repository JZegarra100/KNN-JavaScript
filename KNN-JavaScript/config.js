function chartData(){
    return{
        datasets:
        [
            {
                label: "Spam data chart",
                data: trainingSet().map((point)=>{
                    return {x:point.Var1, y:point.Var2}
                }),
                pointBackgroundColor: trainingSet().map((point)=>{
                    return point.rain ? 'red' : 'blue'
                }),
                pointRadius: 5.5,
                showLine: false,
                backgroundColor: 'purple'

            }
        ]
    }
}
function chartOptions(){
    return{
        maintainAspectRatio: false,
        legend:
        {
            labels:
            {
                fontSize:20
            }
        },
        Responsive: true,
        scales:
        {
            xAxes:
            [
                {
                    display: true,
                    scaleLabel:
                    {
                        display:true,
                        labelString: 'Var1',
                        fontSize:20
                    },
                    ticks:
                    {
                        fontSize:20,
                        max:10,
                        min:0
                    }
                }
            ],
            yAxes:
            [
                {
                    display: true,
                    scaleLabel:
                    {
                        display:true,
                        labelString: 'Var2',
                        fontSize:20
                    },
                    ticks:
                    {
                        fontSize:20,
                        max:10,
                        min:0
                    }
                }
            ]
        }
    }
}