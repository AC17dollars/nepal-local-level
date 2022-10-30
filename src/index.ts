import localLevel from './data';

import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/', (req, res) => {
    res.json({
        "message" : "Nepal Local Level API",
        "author" : "AC17dollars",
        "github" : "https://github.com/ac17dollars/nepal-local-level-api"
    });
});

app.get('/list', (req, res) => {
    let result: Array<string> = [];
    localLevel.forEach((item) => {
        result.push(item["Local Level Name"]);
    }
    );
    result.sort();
    res.json(result);
});


app.get('/list/urban', (req, res) => {
    let result: Array<string> = [];
    localLevel.forEach((item) => {
        if(item['Type'] === 'Municipality' || item['Type'] === 'Metropolitan City' || item['Type'] === 'Sub-Metropolitan City') {
            result.push(item["Local Level Name"]);
        }
    }
    );
    result.sort();
    res.json(result);
});

app.get('/list/rural', (req, res) => {
    let result: Array<string> = [];
    localLevel.forEach((item) => {
        if(item['Type'] === 'Rural Municipality') {
            result.push(item["Local Level Name"]);
        }
    }
    );
    result.sort();
    res.json(result);
});

app.get('/list/urban/byprovince/:province', (req, res) => {
    let result: Array<string> = [];
    localLevel.forEach((item) => {
        if((item['Type'] === 'Municipality' || item['Type'] === 'Metropolitan City' || item['Type'] === 'Sub-Metropolitan City') && item['Province'].toLowerCase() === req.params.province.toLowerCase()) {
            result.push(item["Local Level Name"]);
        }
    }
    );
    result.sort();
    res.json(result);
});

app.get('/list/rural/byprovince/:province', (req, res) => {
    let result: Array<string> = [];
    localLevel.forEach((item) => {
        if((item['Type'] === 'Rural Municipality') && item['Province'].toLowerCase() === req.params.province.toLowerCase()) {
            result.push(item["Local Level Name"]);
        }
    }
    );
    result.sort();
    res.json(result);
});




app.get('/urban', (req, res) => {
    const urban = localLevel.filter((item) => (item.Type === 'Municipality' || item.Type ==='Sub-Metropolitian City' || item.Type ==='Metropolitian City'));
    if(req.query.sortby === 'name'){
        urban.sort((a, b) => (a["Local Level Name"] > b["Local Level Name"]) ? 1 : -1);
    }
    else if(req.query.sortby === 'province'){
        urban.sort((a, b) => (a["Province"] > b["Province"]) ? 1 : -1);
    }
    else if(req.query.sortby === 'district'){
        urban.sort((a, b) => (a["District"] > b["District"]) ? 1 : -1);
    }
    else {
        urban.sort((a, b) => (a["Local Level Name"] > b["Local Level Name"]) ? 1 : -1);
    }
    res.json(urban);
    });
app.get('/rural', (req, res) => {
    const rural = localLevel.filter((item) => item.Type === 'Rural Municipality');
    if(req.query.sortby === 'name'){
        rural.sort((a, b) => (a["Local Level Name"] > b["Local Level Name"]) ? 1 : -1);
    }
    else if(req.query.sortby === 'province'){
        rural.sort((a, b) => (a["Province"] > b["Province"]) ? 1 : -1);
    }
    else if(req.query.sortby === 'district'){
        rural.sort((a, b) => (a["District"] > b["District"]) ? 1 : -1);
    }
    else {
        rural.sort((a, b) => (a["Local Level Name"] > b["Local Level Name"]) ? 1 : -1);
    }
    res.json(rural);
    });
app.get('/urban/:district', (req, res) => {
    const urban = localLevel.filter((item) => (item.Type === 'Municipality' || item.Type ==='Sub-Metropolitian City' || item.Type ==='Metropolitian City') && item.District === req.params.district);
    let result = [];
    for(let item in urban){
      result.push(urban[item]["Local Level Name"]); 
    }
    res.json(result);
    });

    app.listen(3000, () => {
    console.log('Server started on port 3000');
    } );