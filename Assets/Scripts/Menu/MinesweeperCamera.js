#pragma strict

static var instance:MinesweeperCamera;
public static var changeSelection:boolean;
public static var soundsOn:boolean;
public static var musicOn:boolean;
public static var difficulty:int; // 0=beginner, 1=intermediate, 2=expert
 
var fadeOutTexture:Texture2D;
public static var fadeSpeed = 0.4;
public static var drawDepth = -1000;
public static var alpha = 1.0; 
public static var fadeDir:int;

 
function OnGUI(){
 
	alpha += fadeDir * fadeSpeed * Time.deltaTime;	
	alpha = Mathf.Clamp01(alpha);	
 
	GUI.color.a = alpha;
 
	GUI.depth = drawDepth;
 
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), fadeOutTexture);
}
 
public static function fadeOut(){
	fadeDir = 1;	
}

function Awake() {
	instance = this;
	if (Variables.musicOn){
		audio.Play();
	}
}

function Start () {
	RenderSettings.skybox = Variables.instance.skyboxArray[Variables.currentSkybox];
	fadeDir = 0;
	alpha=0;
	changeSelection = false;
	soundsOn = Variables.soundsOn;
	musicOn = Variables.musicOn;
	difficulty = Variables.difficulty;
	//GameObject.Find("txtDifficultyBeginner").renderer.material.color = Color.blue;
	//GameObject.Find("txtSettingsSoundsOn").renderer.material.color = Color.blue;
	//GameObject.Find("txtSettingsMusicOn").renderer.material.color = Color.blue;
}

function Update () {
	
	if (changeSelection){
	
		changeSelection = false;
	
		if (difficulty == 0){
			GameObject.Find("txtDifficultyBeginner").renderer.material.color = Color.blue;
			GameObject.Find("txtDifficultyIntermediate").renderer.material.color = Color.white;
			GameObject.Find("txtDifficultyExpert").renderer.material.color = Color.white;
		}
		else if (difficulty == 1){
			GameObject.Find("txtDifficultyBeginner").renderer.material.color = Color.white;
			GameObject.Find("txtDifficultyIntermediate").renderer.material.color = Color.blue;
			GameObject.Find("txtDifficultyExpert").renderer.material.color = Color.white;
		}
		else if (difficulty == 2){
			GameObject.Find("txtDifficultyBeginner").renderer.material.color = Color.white;
			GameObject.Find("txtDifficultyIntermediate").renderer.material.color = Color.white;
			GameObject.Find("txtDifficultyExpert").renderer.material.color = Color.blue;
		}
		
		if (soundsOn){
			GameObject.Find("txtSettingsSoundsOn").renderer.material.color = Color.blue;
			GameObject.Find("txtSettingsSoundsOff").renderer.material.color = Color.white;
		}
		else {
			GameObject.Find("txtSettingsSoundsOff").renderer.material.color = Color.blue;
			GameObject.Find("txtSettingsSoundsOn").renderer.material.color = Color.white;
		}
		
		if (musicOn){
			GameObject.Find("txtSettingsMusicOn").renderer.material.color = Color.blue;
			GameObject.Find("txtSettingsMusicOff").renderer.material.color = Color.white;
		}
		else {
			GameObject.Find("txtSettingsMusicOff").renderer.material.color = Color.blue;
			GameObject.Find("txtSettingsMusicOn").renderer.material.color = Color.white;
		}
	}
}

