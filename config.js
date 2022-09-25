function chartData(){
    return{
        datasets:
        [
            {
                label: "Spam e-mail data chart",
                data: trainingSet().map((point)=>{
                    return {x:point.Var1, y:point.Var2}
                }),
                pointBackgroundColor: trainingSet().map((point)=>{
                    return point.spam ? 'red' : 'blue'
                }),
                pointRadius: 4,
                showLine: false,
                backgroundColor: 'red'
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
                        max:500,
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
                        max:500,
                        min:-500
                    }
                }
            ]
        }
    }
}
