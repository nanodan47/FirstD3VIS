

const _url_datos = "https://www.datos.gov.co/resource/gt2j-8ykr.json"

let margin2 = { top: 30, right: 30, bottom: 150, left: 30 },
        width2 = 960 - margin2.right - margin2.left,
        height2 = 500 - margin2.top - margin2.bottom;

let x = d3.scaleBand()
        .range([0,width2])
        .padding(0.1);

let y = d3.scaleLinear()
        .range([height2,0]);



var getData = (url)=>{
    axios.get(url).then(response=>{
        let data = response.data
        console.log(data);

        var categorias = d3.group(data, d => d.ciudad_municipio_nom);
        console.log(categorias);

        
        // define count object that holds count for each city
        var countObj = {};

        // count how much each city occurs in list and store in countObj
        data.forEach(function(d) {
            var city = d.ciudad_municipio_nom;
            if(countObj[city] === undefined) {
                countObj[city] = 0;
            } else {
                countObj[city] = countObj[city] + 1;
            }
        });
        // now store the count in each data member
        data.forEach(function(d) {
            var city = d.ciudad_municipio_nom;
            d.count = countObj[city];
        });

        
        
        var max_cat = Object.keys(countObj).map((key) => [String(key), countObj[key]]);
        var maximo = 0;
        for (let index = 0; index < max_cat.length; index++) {
            if (maximo < max_cat[index][1]) {
                maximo = max_cat[index][1];
            }
            else {
                maximo = maximo;
            }
        }


        x.domain(data.map(d=>url.ciudad_municipio_nom));
        y.domain([0,maximo]);


        svg = d3.select("svg");

        


        svg.append('h')
            .call(d3.axisLeft(y));
    
        svg.append('h')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('x', x.bandwidth() / 2)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('transform', 'rotate(90)')
            .attr('text-anchor', 'start');

    })
} 

datos = getData(_url_datos)