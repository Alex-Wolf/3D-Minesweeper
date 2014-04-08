#pragma strict

static var instance:HSControllerGame;
private var secretKey:String="mySecretKey"; // Edit this value and make sure it's the same as the one stored on the server
var addScoreUrl="http://jimi.ithaca.edu/~awolf1/addscore.php?"; //be sure to add a ? to your url
var highscoreUrlBeginner="http://jimi.ithaca.edu/~awolf1/displayBeginnerGame.php";
var highscoreUrlIntermediate="http://jimi.ithaca.edu/~awolf1/displayIntermediateGame.php"; 
var highscoreUrlExpert="http://jimi.ithaca.edu/~awolf1/displayExpertGame.php";    
 
function Awake() {
	instance = this;
} 

function Start() {
	//getScores();
}
 
function postScore(name:String, score:int, level:String) {
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.
    var hash=md5functions.Md5Sum(name + score + HSControllerGame.instance.secretKey); 
 
    var highscore_url = HSControllerGame.instance.addScoreUrl + "name=" + WWW.EscapeURL(name) + "&score=" + score + "&level=" + WWW.EscapeURL(level) + "&hash=" + hash;
 
    // Post the URL to the site and create a download object to get the result.
    var hs_post = WWW(highscore_url);
    yield hs_post; // Wait until the download is done
    if(hs_post.error) {
        print("There was an error posting the high score: " + hs_post.error);
    }
}
 
// Get the scores from the MySQL DB to display in a GUIText.
function getScores(){
    
    //HSController.instance.GetComponent(TextMesh).text = "Loading Scores";
	var hs_get = WWW(HSControllerGame.instance.highscoreUrlBeginner);
	
	yield hs_get;
 
    if(hs_get.error) {
    	Debug.Log("There was an error getting the high score: " + hs_get.error);
    } else {
        MainController.instance.databaseScores = hs_get.text;
    }
}