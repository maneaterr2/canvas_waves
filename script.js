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
    const rect_count = 60;
    let rect_arr =[0];
    let rectY_coord = 0;

    function falling_rect(){
        if(rectY_coord>(cnv.height + 25)){
            rectY_coord = rectY_coord - 25;
            // rect_arr.push(random_str());
            rect_arr.shift();
           
        }else{
            if((rectY_coord%25)===0){
                rect_arr.push(random_str());
            }
            rectY_coord +=25;
        }
        draw_rect()
    }

    function draw_rect(){
        let x = cnv.width / (rect_count +1);
        
            for(let index = 0;index<rect_arr.length;index++){

                for(let i=0;i<rect_arr[index].length;i++){
                    ctx.fillStyle = "#429e44";
                    let word = rect_arr[index][i];
                    if(word=="電"){
                        ctx.fillStyle = "#96c997";
                    }
                    ctx.font = "20px Arial";
                    ctx.textAlign = "center";
                    let curX = x*(i+1);
                    let curY = rectY_coord - (index*25);
                    // ctx.fillRect(curX, curY, 5, 5);
                    ctx.fillText(word, curX, curY);
                    // rect_arr.push("1");
                }
                // ctx.fillStyle = "#429e44";
                // ctx.font = "60px Arial";
                // ctx.textAlign = "center";
                // ctx.fillText(rectY_coord+" "+rect_arr.length, centerX, (centerY - 100));
            }
       
        
       
    }
    function random_sign(){
        // var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
        var alphabet ="送 料   無 料       !格 安    オリジナル 秒     針 携    帯 電   話";
        var randomIndex = Math.floor(Math.random() * alphabet.length);

        var randomLetter = alphabet[randomIndex];
        return randomLetter;
    }
    function random_str(){
        let arr = [];
        for(let i=0;i<rect_count;i++){
            arr.push(random_sign());
        }
        return arr;
    }
    function loop(){
        cnv.width |=0; //ctx.clearRect(0,0, cnv.width,cnv.height)// clear space
        falling_rect();
        updateRings();
        time_now();
        requestAnimationFrame(loop);
    }
    loop();
    window.addEventListener('resize',init);

})();
