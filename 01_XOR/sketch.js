let data = {
  inputs: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ],
  targets: [
    [0],
    [1],
    [1],
    [0]
  ]
}

let counter = 0;

let training = true;

function train() {
  nn.train(finished);
}

function finished() {
  counter++;
  statusP.html('training pass: ' + counter + '<br>framerate: ' + floor(frameRate()));
  train();
}

let statusP;

function setup() {
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 2, 1);
  nn.setTrainingData(data);
  train();
  statusP = createP('0');
}

function draw() {
  background(0);
  let batch = new Batch();
  let resolution = 50;
  let cols = width / resolution;
  let rows = height / resolution;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      batch.add(inputs);
    }
  }

  let results = nn.predict(batch);
  //console.log(results);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      let y = results[i + j * rows];
      fill(y * 255);
      rect(i * resolution, j * resolution, resolution, resolution);
      fill(255 - y * 255);
      textAlign(CENTER, CENTER);
      text(nf(y, 0, 2), i * resolution + resolution / 2, j * resolution + resolution / 2);
    }
  }
  // }
}