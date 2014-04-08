#pragma strict
	
//var levelToLoad;
var beep:AudioClip;
var clickBeep:AudioClip;
var objectName="";
var TipsMenu:GameObject;

function Start() {
	objectName=this.gameObject.name;
	
	
	if(this.gameObject.name=="txtSettingsSoundsOn"){
		if (Variables.soundsOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	else if(this.gameObject.name=="txtSettingsSoundsOff"){
		if (!Variables.soundsOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	//music settings
	else if(this.gameObject.name=="txtSettingsMusicOn"){
		if (Variables.musicOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	else if(this.gameObject.name=="txtSettingsMusicOff"){
		if (!Variables.musicOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	//difficulty settings
	else if(this.gameObject.name=="txtDifficultyBeginner"){
		if (Variables.difficulty == 0){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	else if(this.gameObject.name=="txtDifficultyIntermediate"){
		if (Variables.difficulty == 1){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	else if(this.gameObject.name=="txtDifficultyExpert"){
		if (Variables.difficulty == 2){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	else if (this.gameObject.name=="txtSettingsSkyboxText"){
		GetComponent(TextMesh).text = Variables.skyboxNameArray[Variables.currentSkybox];
	}
	
	if (Application.platform == RuntimePlatform.OSXWebPlayer && 
		Application.platform == RuntimePlatform.WindowsWebPlayer){
		if (this.gameObject.name == "txtMainMenuExit"){
			this.enabled = false;
			this.renderer.enabled = false;
		}
	}
}

function Update(){
	
}

function OnMouseEnter(){

	if(MinesweeperCamera.soundsOn){
		audio.PlayOneShot(beep);
	}
	
	renderer.material.color=Color.green;
}

function OnMouseExit(){
	//sound settings
	if(this.gameObject.name=="txtSettingsSoundsOn"){
		if (MinesweeperCamera.soundsOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	else if(this.gameObject.name=="txtSettingsSoundsOff"){
		if (!MinesweeperCamera.soundsOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	//music settings
	else if(this.gameObject.name=="txtSettingsMusicOn"){
		if (MinesweeperCamera.musicOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	else if(this.gameObject.name=="txtSettingsMusicOff"){
		if (!MinesweeperCamera.musicOn){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	//difficulty settings
	else if(this.gameObject.name=="txtDifficultyBeginner"){
		if (MinesweeperCamera.difficulty == 0){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}

	else if(this.gameObject.name=="txtDifficultyIntermediate"){
		if (MinesweeperCamera.difficulty == 1){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}

	else if(this.gameObject.name=="txtDifficultyExpert"){
		if (MinesweeperCamera.difficulty == 2){
			renderer.material.color = Color.blue;
		}
		else {
			renderer.material.color = Color.white;
		}
	}
	
	//hi score buttons
	else if (this.gameObject.name=="txtHiScoresBeginner"){
		renderer.material.color = Color.white;
	}
	
	else if (this.gameObject.name=="txtHiScoresIntermediate"){
		renderer.material.color = Color.white;
	}
	
	else if (this.gameObject.name=="txtHiScoresExpert"){
		renderer.material.color = Color.white;
	}
	
	else {
		renderer.material.color = Color.white;
	}
}

function OnMouseUp(){
	
	if(MinesweeperCamera.soundsOn){
		audio.PlayOneShot(clickBeep);
	}
	//quits application
	if(this.gameObject.name=="txtMainMenuExit"){
		Application.Quit();
	}
	
	//rotates camera up from main menu and switches to main
	//game scene, depending on difficulty
	if(this.gameObject.name=="txtMainMenuPlayGame"){
		
		TipsMenu.transform.position=Vector3(0,0,-20);
		
		Camera.mainCamera.animation.Play("MainToPlay");
		
		yield WaitForSeconds(0.75);
		MinesweeperCamera.fadeOut();
		
		yield WaitForSeconds(1.25);
		
		Variables.soundsOn = MinesweeperCamera.soundsOn;
		Variables.musicOn = MinesweeperCamera.musicOn;
		Variables.difficulty = MinesweeperCamera.difficulty;
		
		//loads appropriate scene, depending on difficulty selected
		if (Variables.difficulty == 0){
			Application.LoadLevel("MinesweeperBeginner");
		}
		else if (Variables.difficulty == 1){
			Application.LoadLevel("MinesweeperIntermediate");
		}
		else if (Variables.difficulty == 2){
			Application.LoadLevel("MinesweeperExpert");
		}
	}
	
	//rotates camera to face settings menu
	if(this.gameObject.name=="txtMainMenuSettings"){
		Camera.mainCamera.animation.Play("MainToSettings");
	}
	
	//rotates camera from settings menu to main menu
	if(this.gameObject.name=="txtSettingsBack"){
		Camera.mainCamera.animation.Play("SettingsToMain");
	}
	
	//rotates camera from main menu to hi scores menu
	if(this.gameObject.name=="txtMainMenuHiScores"){
		Camera.mainCamera.animation.Play("MainToDifficulty");
	}
	
	//rotates camera from hi scores menu to main menu
	if(this.gameObject.name=="txtHiScoresBack"){
		Camera.mainCamera.animation.Play("DifficultyToMain");
	}
	
	//rotates camera from main menu to controls menu
	if(this.gameObject.name=="txtMainMenuControls"){
		Camera.mainCamera.animation.Play("MainToControls");
	}
	
	//rotates camera from controls menu to main menu
	if(this.gameObject.name=="txtControlBack"){
		Camera.mainCamera.animation.Play("ControlsToMain");
	}
	
	//rotates camera from main menu to instructions menu
	if(this.gameObject.name=="txtMainMenuInstructions"){
		Camera.mainCamera.animation.Play("MainToInstructions");
	}
	
	//rotates camera from instructions menu to main menu
	if(this.gameObject.name=="txtInstructionsBack"){
		Camera.mainCamera.animation.Play("InstructionsToMain");
	}

	if(this.gameObject.name=="txtTipsBack"){
		Camera.mainCamera.animation.Play("TipsToMain");
	}

	if(this.gameObject.name=="txtMainMenuTips"){
		Camera.mainCamera.animation.Play("MainToTips");
	}
	
	//sound settings
	if(this.gameObject.name=="txtSettingsSoundsOn"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.soundsOn = true;
	}
	
	if(this.gameObject.name=="txtSettingsSoundsOff"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.soundsOn = false;
	}
	
	//music settings
	if(this.gameObject.name=="txtSettingsMusicOn"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.musicOn = true;
		Variables.musicOn = true;
		MinesweeperCamera.instance.audio.Play();
	}
	
	if(this.gameObject.name=="txtSettingsMusicOff"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.musicOn = false;
		Variables.musicOn = false;
		MinesweeperCamera.instance.audio.Pause();
	}
	
	//difficulty settings
	if(this.gameObject.name=="txtDifficultyBeginner"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.difficulty = 0;
	}

	if(this.gameObject.name=="txtDifficultyIntermediate"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.difficulty = 1;
	}

	if(this.gameObject.name=="txtDifficultyExpert"){
		MinesweeperCamera.changeSelection = true;
		MinesweeperCamera.difficulty = 2;
	}
	
	//skybox settings
	if(this.gameObject.name=="txtSettingsSkyboxText"){
		Variables.currentSkybox++;
		if (Variables.currentSkybox == Variables.skyboxNum){
			Variables.currentSkybox = 0;
		}
		GetComponent(TextMesh).text = Variables.skyboxNameArray[Variables.currentSkybox];
		RenderSettings.skybox = Variables.instance.skyboxArray[Variables.currentSkybox];
		
	}
	
	//hi score displays
	if(this.gameObject.name=="txtHiScoresBeginner"){
		gameObject.Find("txtHiScoresRankData").GetComponent(HSController).getScores("beginner");
		gameObject.Find("txtHiScoresNameData").GetComponent(HSController2).getScores("beginner");
		gameObject.Find("txtHiScoresTimeData").GetComponent(HSController3).getScores("beginner");
	}
	if(this.gameObject.name=="txtHiScoresIntermediate"){
		gameObject.Find("txtHiScoresRankData").GetComponent(HSController).getScores("intermediate");
		gameObject.Find("txtHiScoresNameData").GetComponent(HSController2).getScores("intermediate");
		gameObject.Find("txtHiScoresTimeData").GetComponent(HSController3).getScores("intermediate");
	}
	if(this.gameObject.name=="txtHiScoresExpert"){
		gameObject.Find("txtHiScoresRankData").GetComponent(HSController).getScores("expert");
		gameObject.Find("txtHiScoresNameData").GetComponent(HSController2).getScores("expert");
		gameObject.Find("txtHiScoresTimeData").GetComponent(HSController3).getScores("expert");
	}
}

@script RequireComponent(AudioSource)