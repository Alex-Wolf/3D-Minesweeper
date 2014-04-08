#pragma strict

var turnSpeed:int = 10;

function Start () {

}

function Update () {
	
	//only allow player input while the game hasn't been won or lost, i.e. it's still being played
	if (!MainController2.instance.loseGame && !MainController2.instance.winGame && !MainController2.instance.pauseGame){
		//move left
		if (Input.GetButtonDown("Left")){
			MainController2.changeSelection(0, 0, 1);
		}
		//move right
		if (Input.GetButtonDown("Right")){
			MainController2.changeSelection(0, 0, -1);
		}
		//move forward
		if (Input.GetButtonDown("Forward")){
			MainController2.changeSelection(1, 0, 0);
		}
		//move backward
		if (Input.GetButtonDown("Backward")){
			MainController2.changeSelection(-1, 0, 0);
		}
		//move up
		if (Input.GetButtonDown("Up")){
			MainController2.changeSelection(0, 1, 0);
		}
		//move down
		if (Input.GetButtonDown("Down")){
			MainController2.changeSelection(0, -1, 0);
		}
		//select cube
		if (Input.GetButtonDown("Select")){
			MainController2.selectCube();
		}
		//flag cube
		if (Input.GetButtonDown("Flag")){
			MainController2.flagTheCube();
		}
		//toggle background music
		/*if (Input.GetButtonDown("ToggleMusic")){
			MainController2.toggleMusic();
		}*/
		//toggle sound effects
		/*if (Input.GetButtonDown("ToggleSounds")){
			MainController2.toggleSounds();
		}*/
		//toggle skyboxes
		if (Input.GetButtonDown("ToggleSkybox")){
			MainController2.toggleSkybox();
		}
		//rotate the structure
		if (Input.GetButton("RotateX") || Input.GetButton("RotateY") || Input.GetButton("RotateZ")){
			MainController2.rotateTheCube();
		}
		//re-orient the structure to original position
		if (Input.GetButtonDown("Reorient")){
			MainController2.reorientTheCube();
		}
	}
	
	if (!MainController2.instance.loseGame && !MainController2.instance.winGame){
		//back to main menu
		if (Input.GetButtonDown("QuitGame")){
			MainController2.quitGame();
		}
	}
}