#pragma strict

static var instance:HSController2;
private var secretKey:String="mySecretKey"; // Edit this value and make sure it's the same as the one stored on the server
var addScoreUrl="http://jimi.ithaca.edu/~awolf1/addscore.php?"; //be sure to add a ? to your url
var highscoreUrlBeginner="http://jimi.ithaca.edu/~awolf1/displayBeginnerName.php";
var highscoreUrlIntermediate="http://jimi.ithaca.edu/~awolf1/displayIntermediateName.php"; 
var highscoreUrlExpert="http://jimi.ithaca.edu/~awolf1/displayExpertName.php";    
 
function Awake() {
	instance = this;
} 

function Start() {
	//getScores();
}
 
public static function postScore(name:String, score:int, level:String) {
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.
    var hash=md5functions.Md5Sum(name + score + HSController2.instance.secretKey); 
 
    var highscore_url = HSController2.instance.addScoreUrl + "name=" + WWW.EscapeURL(name) + "&score=" + score + "&level=" + WWW.EscapeURL(level) + "&hash=" + hash;
 
    // Post the URL to the site and create a download object to get the result.
    var hs_post = WWW(highscore_url);
    yield hs_post; // Wait until the download is done
    if(hs_post.error) {
        print("There was an error posting the high score: " + hs_post.error);
    }
}
 
// Get the scores from the MySQL DB to display in a GUIText.
public static function getScores(level:String) {
    
    //HSController2.instance.GetComponent(TextMesh).text = "Loading Scores";
    
    if (level == "beginner"){
    	var hs_get = WWW(HSController2.instance.highscoreUrlBeginner);
    	
    	yield hs_get;
	 
	    if(hs_get.error) {
	    	Debug.Log("There was an error getting the high score: " + hs_get.error);
	    } else {
	        HSController2.instance.GetComponent(TextMesh).text = hs_get.text; // this is a GUIText that will display the scores in game.
	    }
    }
    else if (level == "intermediate"){
    	var hs_get2 = WWW(HSController2.instance.highscoreUrlIntermediate);
    	
    	yield hs_get2;
	 
	    if(hs_get2.error) {
	    	Debug.Log("There was an error getting the high score: " + hs_get2.error);
	    } else {
	        HSController2.instance.GetComponent(TextMesh).text = hs_get2.text; // this is a GUIText that will display the scores in game.
	    }
    }
    else {
    	var hs_get3 = WWW(HSController2.instance.highscoreUrlExpert);
    	
    	yield hs_get3;
	 
	    if(hs_get3.error) {
	    	Debug.Log("There was an error getting the high score: " + hs_get3.error);
	    } else {
	        HSController2.instance.GetComponent(TextMesh).text = hs_get3.text; // this is a GUIText that will display the scores in game.
	    }
    }
    

}