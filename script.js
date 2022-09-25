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

    for(let k=1; k<=5; k++){
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

class KNN_c {

    constructor(k = 1, data, labels) {
        this.k = k;
        this.data = data;
        this.labels = labels;
    }

    generateDistanceMap(point) {

        const map = [];
        let maxDistanceInMap;

        for (let index = 0, len = this.data.length; index < len; index++) {

            const otherPoint = this.data[index];
            const otherPointLabel = this.labels[index];
            const thisDistance = distance(point, otherPoint);

            if (!maxDistanceInMap || thisDistance < maxDistanceInMap) {

                map.push({
                    index,
                    distance: thisDistance,
                    label: otherPointLabel
                });
                map.sort((a, b) => a.distance < b.distance ? -1 : 1);

                if (map.length > this.k) {
                    map.pop();
                }
                maxDistanceInMap = map[map.length - 1].distance;

            }
        }


        return map;
    }

    predict(point) {

        const map = this.generateDistanceMap(point);
        const votes = map.slice(0, this.k);
        const voteCounts = votes
            // Reduces into an object like {label: voteCount}
            .reduce((obj, vote) => Object.assign({}, obj, {[vote.label]: (obj[vote.label] || 0) + 1}), {})
        ;
        const sortedVotes = Object.keys(voteCounts)
            .map(label => ({label, count: voteCounts[label]}))
            .sort((a, b) => a.count > b.count ? -1 : 1)
        ;

        return {
            label: sortedVotes[0].label,
            voteCounts,
            votes
        };

    }

}