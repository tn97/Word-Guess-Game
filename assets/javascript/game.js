//start audio
function SetVolume(val)
{
    var player = document.getElementById("music");
    console.log("Before: " + player.volume);
    player.volume = val / 100;
    console.log("After: " + player.volume);
}
//end audio