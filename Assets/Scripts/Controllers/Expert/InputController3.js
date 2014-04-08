#pragma strict

var turnSpeed:int = 10;

function Start () {

}

function Update () {
	
	//only allow player input while the game hasn't been won or lost, i.e. it's still being played
	if (!MainController3.instance.loseGame && !MainController3.instance.winGame && !MainController3.instance.pauseGame){
		//move left
		if (Input.GetButtonDown("Left")){
			MainController3.changeSelection(0, 0, 1);
		}
		//move right
		if (Input.GetButtonDown("Right")){
			MainController3.changeSelection(0, 0, -1);
		}
		//move forward
		if (Input.GetButtonDown("Forward")){
			MainController3.changeSelection(1, 0, 0);
		}
		//move backward
		if (Input.GetButtonDown("Backward")){
			MainController3.changeSelection(-1, 0, 0);
		}
		//move up
		if (Input.GetButtonDown("Up")){
			MainController3.changeSelection(0, 1, 0);
		}
		//move down
		if (Input.GetButtonDown("Down")){
			MainController3.changeSelection(0, -1, 0);
		}
		//select cube
		if (Input.GetButtonDown("Select")){
			MainController3.selectCube();
		}
		//flag cube
		if (Input.GetButtonDown("Flag")){
			MainController3.flagTheCube();
		}
		//toggle background music
		/*if (Input.GetButtonDown("ToggleMusic")){
			MainController3.toggleMusic();
		}*/
		//toggle sound effects
		/*if (Input.GetButtonDown("ToggleSounds")){
			MainController3.toggleSounds();
		}*/
		//toggle skyboxes
		if (Input.GetButtonDown("ToggleSkybox")){
			MainController3.toggleSkybox();
		}
		//rotate the structure
		if (Input.GetButton("RotateX") || Input.GetButton("RotateY") || Input.GetButton("RotateZ")){
			MainController3.rotateTheCube();
		}
		//re-orient the structure to original position
		if (Input.GetButtonDown("Reorient")){
			MainController3.reorientTheCube();
		}
	}
	
	if (!MainController3.instance.loseGame && !MainController3.instance.winGame){
		//back to main menu
		if (Input.GetButtonDown("QuitGame")){
			MainController3.quitGame();
		}
	}
}