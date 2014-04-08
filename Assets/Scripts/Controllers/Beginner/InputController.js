#pragma strict

var turnSpeed:int = 10;

function Start () {

}

function Update () {
	
	//only allow player input while the game hasn't been won or lost, i.e. it's still being played
	if (!MainController.instance.loseGame && !MainController.instance.winGame && !MainController.instance.pauseGame){
		//move left
		if (Input.GetButtonDown("Left")){
			MainController.changeSelection(0, 0, 1);
		}
		//move right
		if (Input.GetButtonDown("Right")){
			MainController.changeSelection(0, 0, -1);
		}
		//move forward
		if (Input.GetButtonDown("Forward")){
			MainController.changeSelection(1, 0, 0);
		}
		//move backward
		if (Input.GetButtonDown("Backward")){
			MainController.changeSelection(-1, 0, 0);
		}
		//move up
		if (Input.GetButtonDown("Up")){
			MainController.changeSelection(0, 1, 0);
		}
		//move down
		if (Input.GetButtonDown("Down")){
			MainController.changeSelection(0, -1, 0);
		}
		//select cube
		if (Input.GetButtonDown("Select")){
			MainController.selectCube();
		}
		//flag cube
		if (Input.GetButtonDown("Flag")){
			MainController.flagTheCube();
		}
		//toggle background music
		/*if (Input.GetButtonDown("ToggleMusic")){
			MainController.toggleMusic();
		}*/
		//toggle sound effects
		/*if (Input.GetButtonDown("ToggleSounds")){
			MainController.toggleSounds();
		}*/
		//toggle skyboxes
		if (Input.GetButtonDown("ToggleSkybox")){
			MainController.toggleSkybox();
		}
		//rotate the structure
		if (Input.GetButton("RotateX") || Input.GetButton("RotateY") || Input.GetButton("RotateZ")){
			MainController.rotateTheCube();
		}
		//re-orient the structure to original position
		if (Input.GetButtonDown("Reorient")){
			MainController.reorientTheCube();
		}
	}
	
	if (!MainController.instance.loseGame && !MainController.instance.winGame){
		//back to main menu
		if (Input.GetButtonDown("QuitGame")){
			MainController.quitGame();
		}
	}
}