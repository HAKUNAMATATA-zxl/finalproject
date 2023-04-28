let handpose, video, detections, flag = -1;
let img1, kite;
let element = new Array(2)

let points = [];
let keypoint = [];
let elements = [];
let kiteEle;
let score = 0;

let tt = 0;
let potato = [];
let isReady = 0

function preload() {
    img1 = loadImage("./bg.jpg")
    startImg = loadImage("./start.jpg")

    gameImg = loadImage("./gameover.jpg")
    startButtonImg = loadImage("./start.png")
    element[4] = loadImage("./ha.png")
    element[1] = loadImage("./ice.png")
    element[2] = loadImage("./candy.png")
    element[3] = loadImage("./cookie.png")
    element[0] = loadImage("./bubutea.png")
    element[5] = loadImage("./jump.png")
    potato[0] = loadImage("./potato_unhappy.png")
    potato[1] = loadImage("./potato_happy.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    handpose = ml5.handpose(video, modelReady);
    handpose.on("hand", gotResults);
    potatoEle = new Potato(80, height - 200, potato)
}

function draw() {
    image(video, 0, 0, width, height);
    if (flag === -1) {
        rect(0, 0, width, height)
        image(startImg, 0, 0, width, height)
        fill(0)
        if (isReady) {
            noStroke();
            textSize(38);
            text("Start", width - 300, 200)
        } else {
            noStroke();
            textSize(38);
            text("Loading", width - 300, 200)
        }
    } else if (flag === 0) {
        image(img1, 0, 0, width, height);

        noStroke();
        textSize(18);
        fill(0)
        text("Score:" + score, 50, 30)

        text("Time:" + int(30 - tt / 30), width - 110, 30)

        for (let i = 0; i < elements.length; i++) {
            elements[i].update()

            if (elements[i].isCatch(potatoEle)) {
                if (elements[i].isOK > 0) {
                    potatoEle.isHappy = true
                } else {
                    potatoEle.isHappy = false
                }
                score += elements[i].isOK;
                elements.splice(i, 1);
            }
        }

        if (elements.length < 3) {
            elements.push(new Element(random(0, width), random(-height / 2, height / 2), element))
        }
        if (points.length > 2) {
            potatoEle.x -= points[points.length - 1][0] - points[points.length - 2][0]
            if (potatoEle.x > width) {
                potatoEle.x = width - 100
            }

            if (potatoEle.x < 100) {
                potatoEle.x = 100
            }
        }

        potatoEle.show()

        tt++;
        if (tt > 30 * 30) {
            tt = 0;
            flag = 1;
        }
    } else {
        image(gameImg, 0, 0, width, height)
        noStroke();
        textSize(38);
        fill(0)
        text("Again", width - 150, 100)
    }

    if (detections && detections.length) {
        drawKeypoints()
    }
}


function drawKeypoints() {
    noStroke();
   
    for (let i = 0; i < detections.length; i += 1) {
        const prediction = detections[i];
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
          const keypoint = prediction.landmarks[j];
        //   fill(0, 255, 0);
        //   noStroke();
        //   ellipse(keypoint[0], keypoint[1], 10, 10);
        }
      }
      const detection = detections[detections.length - 1];
      keypoint = detection.landmarks[8];
      fill(255, 0,0 )
    //   ellipse(keypoint[0], keypoint[1], 10, 10);
      points.push([keypoint[0], keypoint[1]])
}

function mousePressed() {
    if (flag === -1 && isReady) {
        points.length = 0
        score = 0;
        flag = 0;
        elements.length = 0
    } else if (flag === 1) {
        points.length = 0
        score = 0;
        flag = 0;
        elements.length = 0
    }
console.log(flag)
}

function modelReady() {
    console.log('model ready');
    isReady = 1;
}

function gotResults(results) {
    detections = results;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
