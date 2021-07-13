
        var p=Math.random();
        p=Math.floor(p*6)+1;
        var p=Math.random();
        p=Math.floor(p*6)+1;
        if(p==1){
            document.querySelector("img.img1").setAttribute("src","images/dice1.png");
        }
        else if(p==2){
            document.querySelector("img.img1").setAttribute("src","images/dice2.png");
        }
        else if(p==3){
            document.querySelector("img.img1").setAttribute("src","images/dice3.png");
        }
        else if(p==4){
            document.querySelector("img.img1").setAttribute("src","images/dice4.png");
        }
        else if(p==5){
            document.querySelector("img.img1").setAttribute("src","images/dice5.png");
        }
        else if(p==6){
            document.querySelector("img.img1").setAttribute("src","images/dice6.png");
        }
        var g=Math.random();
        g=Math.floor(g*6)+1;
        if(g==1){
            document.querySelector("img.img2").setAttribute("src","images/dice1.png")
        }
        if(g==2){
            document.querySelector("img.img2").setAttribute("src","images/dice2.png")
        }
        if(g==3){
            document.querySelector("img.img2").setAttribute("src","images/dice3.png")
        }
        if(g==4){
            document.querySelector("img.img2").setAttribute("src","images/dice4.png")
        }
        if(g==5){
            document.querySelector("img.img2").setAttribute("src","images/dice5.png")
        }
        if(g==6){
            document.querySelector("img.img2").setAttribute("src","images/dice6.png")
        }
        if(p>g){
            document.querySelectorAll("p")[2].innerText="p1 wins";
        }
        else if(p==g){
            document.querySelectorAll("p")[2].innerText="Draw";
        }
        else if(p<g){
            document.querySelectorAll("p")[2].innerText="p2 wins";
        }
