const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

function modelLoaded() {
 // get references to the input fields, button, and result div
 const resoloutionField = document.getElementById("resoloution")
 const ppiField = document.getElementById("ppi")
 const storageField = document.getElementById("storage")
 const coresField = document.getElementById("cores")
 const cpuField = document.getElementById("cpu")
 const memoryField = document.getElementById("memory")
 const batteryField = document.getElementById("battery")

 const predictButton = document.getElementById("btn")
 const result = document.getElementById("result")

 // add event listener to the button to call makePrediction when clicked
 predictButton.addEventListener("click", makePrediction)

 async function makePrediction() {
     // get the value of the input field and convert it to a number
     const resoloution = Number(resoloutionField.value)
     const ppi = Number(ppiField.value)
     const storage = Number(storageField.value)
     const cores = Number(coresField.value)
     const cpu = Number(cpuField.value)
     const memory = Number(memoryField.value)
     const battery = Number(batteryField.value)

     console.log('Input values:', { resoloution, ppi, storage, cores, cpu, memory, battery })

     // make the prediction using the neural network
     const results = await nn.predict({ resoloution, ppi, storage, cores, cpu, memory, battery })

     console.log(results);

     // display the result in the result div
     const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
     const estimatedPrice = fmt.format(results[0].price)

     result.innerText = `Predicted Price: ${estimatedPrice}`
     console.log(estimatedPrice)
 }
}