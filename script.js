(()=>{
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    function init(){
        cnv.width = innerWidth;
        cnv.height = innerHeight;
    }
    init();

    const numberOfRings = 5;
    const ringRadiusOffset = 15;
    const ringRadius = 250;
    const waveOffset = 30;
    const colors = ['#429e44','#57a959','#6cb46e','#81be82','#96c997']
    let startAngle = 0;


    function updateRings(){
        for(let i=0;i<numberOfRings;i++){
            let radius = i * ringRadiusOffset + ringRadius;
            let offsetAngle = i * waveOffset * Math.PI /180;
            drawRing(radius, colors[i],offsetAngle);
        }
        if(startAngle>=360){
            startAngle = 0;
        }else{
            startAngle++;
        }
    }
    let centerX = cnv.width/2;
    let centerY = cnv.height/2;

    const maxWavesAmplitude = 30;
    const numberOfWaves = 7;

    function drawRing(radius,color,offsetAngle){
        ctx.strokeStyle = color;
        ctx.lineWidth = 9;
        ctx.beginPath();
        
        for(let j = -180;j<180;j++){
            let currentAngle = (j + startAngle) * Math.PI / 180;
            let displacement =0;
            let now = Math.abs(j)

            if(now>70){
                displacement =(now-70) / 70;
            }
            if(displacement>=1){
                displacement = 1;
            }
            let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
            let x = centerX + Math.cos(currentAngle) * waveAmplitude;
            let y = centerY + Math.sin(currentAngle) * waveAmplitude;
            
            if(j > -180){
                ctx.lineTo(x,y);
            }else{
                ctx.moveTo(x,y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    function time_now(){
        ctx.font = "60px Arial";
        let time = new Date();
        ctx.fillStyle = "#429e44";
        ctx.textAlign = "left";
        let millisec = time.getMilliseconds()
        let cur_time = time.getHours()+":"+ time.getMinutes()+":"+ time.getSeconds()+":"+ millisec;
        ctx.fillText(cur_time, (centerX - 160), centerY);
    }
    function loop(){
        cnv.width |=0; //ctx.clearRect(0,0, cnv.width,cnv.height)// clear space
        updateRings();
        time_now();
        requestAnimationFrame(loop);
    }
    loop();
    window.addEventListener('resize',init);

})();