status = "" ;
objects = [] ;

function preload() {
    
}

function setup() {
    canvas = createCanvas(390, 300) ;
    canvas.center() ;

    video = createCapture(VIDEO) ;
    video.size(390, 300) ;
    video.hide() ;

}

function draw() {
    image(video, 0, 0, 390, 300) ;

    if (status != "") {
        for (i = 0; i < objects.length; i++)
        {
        r = random (225); 
        g = random (225); 
        b = random (225) ;
        document.getElementById("statuslbl").innerHTML = "Status: Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected:" + objects.length ;

        fill(r, g, b);
        percent = floor(objects[i].confidence * 100) ;
        text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y) ;
        noFill();
        stroke(r, g, b)
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }   

}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded ) ;
    document.getElementById("statuslbl").innerHTML = "Detecting Object" ;
}

function modelLoaded() {
    console.log("Status true") ;
    status = true ;
    objectDetector.detect(video, gotResult ) ;
}

function gotResult(error, results) {
    if (error) {
        console.log(error) ;
    }
    else {
        console.log(results) ;
        objects = results;
    }

}