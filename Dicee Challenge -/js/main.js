
function math()
{
    var p = Math.random();
    var player1 = [];
    var player2 = [];
    p = Math.floor(p * 6) + 1;
    document.querySelector("img.img1").setAttribute("src", "images/dice" + p + ".png");

    var q = Math.random();
    q = Math.floor(q * 6) + 1;
    document.querySelector("img.img2").setAttribute("src", "images/dice" + q + ".png");

    if (p > q) {
        player1.push(++player1);
        document.querySelectorAll("h4")[2].innerText = player1;
        document.querySelector("h1").innerText = "🤛player 1 wins";

    } else if (p == q) {
        document.querySelector("h1").innerText = "Draw 😢😢";
    } else if (p < q) {

        player2.push(++player2);
        document.querySelectorAll("h4")[3].innerText = player2;
        document.querySelector("h1").style.textAlign = "left";
        document.querySelector("h1").innerText = "player 2 wins🤜";
    }
}
    math();

