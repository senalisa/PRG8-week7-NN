import { createChart, updateChart } from "./scatterplot.js"

// create neural network 
const nn = ml5.neuralNetwork({ task: 'regression', debug: true })

let testData = []

// load Papa Parse
function loadData(){
    Papa.parse("./data/mobilephones.csv", {
        download:true,
        header:true, 
        dynamicTyping:true,
        complete: results => checkData(results.data)
    })
}
loadData()

function checkData(data) {
    // console.log to check if papa parse is loaded correctly
    console.table(data)

     // preparing data 
     data.sort(() => (Math.random() - 0.5))
     let trainData = data.slice(0, Math.floor(data.length * 0.8))
     testData = data.slice(Math.floor(data.length * 0.8) + 1)
 
     // add data to neural network
     for(let mobilephones of trainData){
         nn.addData({ resoloution: mobilephones.resoloution, ppi: mobilephones.ppi, storage: mobilephones.storage, cores: mobilephones.cores, cpu: mobilephones.cpu, memory: mobilephones.memory, battery: mobilephones.battery }, { price: mobilephones.price })
     }

     // normalize the data
     nn.normalizeData()  

     // train the data with epochs, then call the finishedTraining function
     nn.train({ epochs: 30 }, () => finishedTraining()) 
}

async function finishedTraining(){
    console.log("Finished training!")
    makePrediction()
}

async function makePrediction() {
    const testMobilePhones = { resoloution: testData[0].resoloution, ppi: testData[0].ppi, storage:testData[0].storage, cores:testData[0].cores, cpu:testData[0].cpu, memory:testData[0].memory, battery:testData[0].battery }
    const pred = await nn.predict(testMobilePhones)
    console.log(pred[0].price)
}

// Add event listener to the save button
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  nn.save();
  console.log("Model saved!");
});