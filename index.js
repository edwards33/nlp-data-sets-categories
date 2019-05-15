var natural = require('natural')
var fs = require('fs')
var classifier = new natural.LogisticRegressionClassifier()

var testClassifier = (testData) => {
    console.log("Testing of classifier")
    var numCorrect = 0
    testData.forEach(function(item){
        var labelGuess = classifier.classify(item.text)
        if (labelGuess === item.label){
            numCorrect++
        }
    })
    console.log("Correct %:", numCorrect/testData.length)
}

var loadTestData = () => {
    console.log("Test data are loading...")
    fs.readFile('test.json', 'utf-8', function(err, data){
        if (err){
            console.log(err)
        } else {
            var testData = JSON.parse(data)
            testClassifier(testData)
        }
    })
}

var train = (trainingData) => {
    console.log("Training")
    trainingData.forEach(function(item){
        classifier.addDocument(item.text, item.label)
    })
    var startTime = new Date()
    classifier.train()
    var endTime = new Date()
    var trainingTime = (endTime-startTime)/1000
    console.log("Time of training:", trainingTime, "sec.")
    loadTestData()
}


fs.readFile('training.json', 'utf-8', function(err, data){
    if (err){
        console.log(err)
    } else {
        var trainingData = JSON.parse(data)
        train(trainingData)
    }
})

