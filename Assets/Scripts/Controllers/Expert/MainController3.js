#pragma strict 
#pragma downcast

static var instance:MainController3;

//different cubes
var cube:Cube; // ID = -1
var cube0:Cube; // ID = 0
var cube1:Cube; // ID = 1
var cube2:Cube; // ID = 2
var cube3:Cube; // ID = 3
var cube4:Cube; // ID = 4
var cube5:Cube; // ID = 5
var cube6:Cube; // ID = 6
var mineCube:Cube; // ID = 7
var flagCube:Cube; // ID = 8

var square:Square; // ID = -1
var square0:Square; // ID = 0
var square1:Square; // ID = 1
var square2:Square; // ID = 2
var square3:Square; // ID = 3
var square4:Square; // ID = 4
var square5:Square; // ID = 5
var square6:Square; // ID = 6
var mineSquare:Square; // ID = 7
var flagSquare:Square; // ID = 8

//used to signal winning or losing the game
var winGame:boolean;
var loseGame:boolean;
var pauseGame:boolean;

//used for being able to spin the whole structure with the mouse
var dragCube:GameObject;
var rotationSpeed:int = 50;

//used to keep track of mines and flag
var totalMines:int = 99;
var flagsLeft:int = totalMines;
var mineCounter:int = 0;

//sound effects
var selectSound:AudioClip;
var mineSound:AudioClip;
var flagSound:AudioClip;
var buttonSound:AudioClip;

//GUI texts for displaying number of flags left, time, unknowns, and win or lose text
var mainText:GUIText;
var flagText:GUIText;
var timerText:GUIText;
var unknownText:GUIText;

var unknownNum:int;

//used to keep track of time
var guiTimer:float = 0.0;
var mainTimer:float = 0.0;
var roundedTimer:int;

//used for setting up and navigating through the structure of cubes
var spacing:int = 3;
public static var xGrid:int = 8;
public static var yGrid:int = 8;
public static var zGrid:int = 8;
public static var currentX:int;
public static var currentY:int;
public static var currentZ:int;

//array that holds cubes in the structure
public static var cubeArray:Cube[,,] = new Cube[xGrid, yGrid, zGrid];

//arrays to hold the three cross-sections in the GUI
var guiTopArray:Square[,] = new Square[xGrid, zGrid];
var guiFrontArray:Square[,] = new Square[zGrid, yGrid];
var guiRightArray:Square[,] = new Square[xGrid, yGrid];

//gameObjects to hold each of the GUI cross-sections for easier positioning
var topGUIContainer:GameObject;
var frontGUIContainer:GameObject;
var rightGUIContainer:GameObject;

//used to keep track of whether to play sounds and/or music
var soundsOn:boolean;
var musicOn:boolean;

//GUI textures for volume and music icons
var musicGUI:GUITexture;
var volumeGUI:GUITexture;

//textures for volume and music icons
var musicOnTexture:Texture2D;
var musicOffTexture:Texture2D;
var volumeOnTexture:Texture2D;
var volumeOffTexture:Texture2D;

//used to check if it's the player's first selection
var firstSelection:boolean;

//used when quitting the game
var quitButtonPressed:boolean;
var GUISkin1:GUISkin;

//used when entering name for hi score list
var enteredName:boolean;
var resetGame:boolean;
var winnerName:String;
public static var databaseScores:String = "";

//used to fade back to the main menu
var fadeOutTexture:Texture2D;
var fadeOutBool:boolean;
public static var fadeSpeed = 0.3;
public static var drawDepth = -1000;
public static var alpha = 1.0; 
public static var fadeDir = 0;

//used for the navigation sliders
var xSlider:int;
var zSlider:int;
var ySlider:int;

var oldXSlider:int;
var oldZSlider:int;
var oldYSlider:int;


 
function OnGUI(){
 	
 	GUI.skin = GUISkin1;
 	
 	//xSlider = GUI.HorizontalSlider(Rect(573,480,200,25),xSlider,0,7);
 	//zSlider = GUI.HorizontalSlider(Rect(572,722,200,25),zSlider,7,0);
 	//ySlider = GUI.VerticalSlider(Rect(555,37,25,200),ySlider,7,0);
 	
 	
 	if ((xSlider != oldXSlider) || (ySlider != oldYSlider) || (zSlider != oldZSlider)){
 		changeSelection(xSlider - currentX, ySlider - currentY, zSlider - currentZ);
 	}
 	
 	oldXSlider = xSlider;
 	oldZSlider = zSlider;
 	oldYSlider = ySlider;
 	
 	if (fadeOutBool){
		alpha += fadeDir * fadeSpeed * Time.deltaTime;	
		alpha = Mathf.Clamp01(alpha);	
	 
		GUI.color.a = alpha;
	 
		GUI.depth = drawDepth;
	 
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), fadeOutTexture);
	}
	
	if (quitButtonPressed){
	
		GUI.Box (Rect (Screen.width / 2 - 350, Screen.height / 2 - 200, 700,430), "Pause Menu");
	
		if (GUI.Button (Rect (Screen.width / 2 - 100, Screen.height / 2  - 140, 200, 25), "Resume")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			quitButtonPressed = false;
			pauseGame = false;
		}
		if (GUI.Button (Rect (Screen.width / 2 - 100, Screen.height / 2  - 105, 200, 25), "Restart")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			Variables.soundsOn = soundsOn;
			Variables.musicOn = musicOn;
			quitButtonPressed = false;
			Application.LoadLevel("MinesweeperExpert");
		}
		if (GUI.Button (Rect (Screen.width / 2 - 100, Screen.height / 2  - 70, 200, 25), "Main Menu")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			quitButtonPressed = false;
			quitGameFunction();
		}
		
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 - 30, 700, 300), "___________________________________________________");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2, 700, 300), "Controls:");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 25, 700, 300), "WASD, Left Shift, Space: Move Selection");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 50, 700, 300), "J: Select cube");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 75, 700, 300), "K: Flag cube");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 100, 700, 300), "Arrows, Right Shift, /: Rotate cube");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 125, 700, 300), "N: Re-orient cube");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 150, 700, 300), "Period: Toggle Skybox");
		GUI.Label (Rect (Screen.width / 2 - 350, Screen.height / 2 + 175, 700, 300), "Escape: Exit to Main Menu");
	}
	
	if (winGame){
		
		GUI.Box (Rect (Screen.width / 2 - 250, Screen.height / 2 - 200, 500,300), "You Won!");
	
		if (enteredName){
			GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300), "Thanks for playing!");
			resetGame = true;
			winGame = false;
		}
		else {
			//check scores in database to see if time is in the top 10
			gameObject.Find("Database").GetComponent(HSControllerGame3).getScores();
			
			if (databaseScores != ""){
				
				var scoresArray:String[] = new String[10];
				scoresArray = databaseScores.Split(" "[0]);
				
				var sortedScores = new Array(scoresArray);
				sortedScores.RemoveAt(sortedScores.length - 1);
				//sortedScores.Sort();
				
				var finalScores:String[] = sortedScores.ToBuiltin(String) as String[];
				
				/*for (var i = 0; i < finalScores.length; i++){
					Debug.Log("finalScores[" + i + "] = " + finalScores[i]);
				}*/
				
				var scoreNum:int = parseInt(finalScores[finalScores.length - 1]);
				
				if (mainTimer < scoreNum){
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 150, 500, 300), "Congratulations!");
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 125, 500, 300), "Your score is in the top 10!");
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 100, 500, 300), "Enter your name below.");
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 75, 500, 300), "(Max 10 characters)");
					winnerName = GUI.TextField (Rect (Screen.width / 2 - 100, Screen.height / 2 - 25, 200, 50), winnerName, 10);
					if (GUI.Button (Rect (Screen.width / 2 - 65, Screen.height / 2 + 25, 130, 30), "Submit")){
						gameObject.Find("Database").GetComponent(HSControllerGame3).postScore(winnerName, mainTimer, "expert");
						enteredName = true;
					}
				}
				else {
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 100, 500, 300), "Sorry, your time wasn't");
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 75, 500, 300), "fast enough to make it");
					GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 50, 500, 300), "into the top 10.");
					if (GUI.Button (Rect (Screen.width / 2 - 100, Screen.height / 2  + 5, 200, 25), "New Game")){
						if(soundsOn){
							audio.PlayOneShot(buttonSound);
						}
						Variables.soundsOn = soundsOn;
						Variables.musicOn = musicOn;
						Application.LoadLevel("MinesweeperExpert");
					}
					if (GUI.Button (Rect (Screen.width / 2 - 100, Screen.height / 2  + 40, 200, 25), "Main Menu")){
						if(soundsOn){
							audio.PlayOneShot(buttonSound);
						}
						winGame = false;
						MainController3.instance.loseGameFunction();
					}
				} 
			}
		}
	}
	
	if (loseGame){
		
		GUI.Box (Rect (Screen.width / 2 - 200, Screen.height / 2 - 200, 400,300), "Game Over");
	
		GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 100, 500, 300), "Sorry, you lost!");
		GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 80, 500, 300), "Want to play again?");

		if (GUI.Button (Rect (Screen.width / 2 - 50, Screen.height / 2  - 40, 100, 25), "YES")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			Variables.soundsOn = soundsOn;
			Variables.musicOn = musicOn;
			Application.LoadLevel("MinesweeperExpert");
		}
		if (GUI.Button (Rect (Screen.width / 2 - 50, Screen.height / 2  - 10, 100, 25), "NO")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			loseGame = false;
			MainController3.instance.loseGameFunction();
		}
	}
	
	if (resetGame){
		
		GUI.Box (Rect (Screen.width / 2 - 200, Screen.height / 2 - 200, 400,300), "You Won!");
		
		GUI.Label (Rect (Screen.width / 2 - 250, Screen.height / 2 - 80, 500, 300), "Want to play again?");

		if (GUI.Button (Rect (Screen.width / 2 - 50, Screen.height / 2  - 55, 100, 25), "YES")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			Variables.soundsOn = soundsOn;
			Variables.musicOn = musicOn;
			Application.LoadLevel("MinesweeperExpert");
		}
		if (GUI.Button (Rect (Screen.width / 2 - 50, Screen.height / 2  - 25, 100, 25), "NO")){
			if(soundsOn){
				audio.PlayOneShot(buttonSound);
			}
			resetGame = false;
			MainController3.instance.loseGameFunction();
		}
	}
}
 
public static function fadeOut(){
	fadeDir = 1;
	MainController3.instance.fadeOutBool = true;
}


function Awake(){

	instance = this;
	
	RenderSettings.skybox = Variables.instance.skyboxArray[Variables.currentSkybox];
	
	winGame = false;
	loseGame = false;
	pauseGame = false;
	
	currentX = 0;
	currentY = yGrid - 1;
	currentZ = 0;
	
	dragCube = new GameObject();
	dragCube.AddComponent("BoxCollider");
	
	topGUIContainer = new GameObject();
	frontGUIContainer = new GameObject();
	rightGUIContainer = new GameObject();
	
	mainText.enabled = false;
	
	unknownNum = xGrid * yGrid * zGrid;
	
	flagText.text = "Flags: " + flagsLeft;
	timerText.text = "Time: 0";
	unknownText.text = "Unknowns: " + unknownNum;
	
	firstSelection = true;
	
	soundsOn = Variables.soundsOn;
	musicOn = Variables.musicOn;
	
	if (musicOn){
		audio.Play();
	}
	else {
		musicGUI.texture = musicOffTexture;
	}
	
	if (!soundsOn){
		volumeGUI.texture = volumeOffTexture;
	}
	
	alpha=0;
	fadeDir = -1;
	fadeOutBool = false;
	
	quitButtonPressed = false;
	enteredName = false;
	resetGame = false;
	
	xSlider = 0;
	zSlider = 0;
	ySlider = yGrid - 1;
	
	oldXSlider = 0;
 	oldZSlider = 0;
 	oldYSlider = yGrid - 1;
}

function Start() {
	
	//Screen.showCursor = false;
	for (var x = 0; x < xGrid; x++){
		for (var y = 0; y < yGrid; y++){
			for (var z = 0; z < zGrid; z++){
				var newCube:Cube;
				newCube = Instantiate(cube, Vector3(x * 10 + spacing - (xGrid * 5), y * 10 + spacing - (yGrid * 5), z * 10 + spacing - (zGrid * 5)), Quaternion.identity);
				newCube.setHasMine(false);
				cubeArray[x,y,z] = newCube;
				newCube.transform.parent = dragCube.transform;
			}
		}
	}
	
	//randomly places the mines within the cubes
	while (mineCounter < totalMines){
		var xRand:int = Mathf.FloorToInt(Random.value * xGrid);
		var yRand:int = Mathf.FloorToInt(Random.value * yGrid);
		var zRand:int = Mathf.FloorToInt(Random.value * zGrid);
		
		if (cubeArray[xRand, yRand, zRand].hasMine == false){
			cubeArray[xRand, yRand, zRand].setHasMine(true);
			mineCounter++;
		}
	}
	
	for (x = 0; x < xGrid; x++){
		for (y = 0; y < yGrid; y++){
			for (z = 0; z < zGrid; z++){
				if (cubeArray[x,y,z].hasMine == false){
					cubeArray[x,y,z].setHasMine(false);
				}
			}
		}
	}
	
	//top-down cross-section highlighting
	for (x = 0; x < xGrid; x++){
		for (z = 0; z < zGrid; z++){
			cubeArray[x, currentY, z].setHighlighted("blue");
		}
	}
	
	//front-view cross-section highlighting
	for (z = 0; z < zGrid; z++){
		for (y = 0; y < yGrid; y++){
			cubeArray[currentX, y, z].setHighlighted("red");
		}
	}
	
	//right-view cross-section highlighting
	for (x = 0; x < xGrid; x++){
		for (y = 0; y < yGrid; y++){
			cubeArray[x, y, currentZ].setHighlighted("yellow");
		}
	}
	
	cubeArray[currentX, currentY, currentZ].setSelected(true);
	
	createGUI();
	updateGUI();
}

function createGUI(){
	
	var newSquare:Square;
	
	//top-down cross-section
	for (var x = 0; x < xGrid; x++){
		for (var z = 0; z < zGrid; z++){
			newSquare = Instantiate(square, Vector3(x * 2, z * 2, 20), Quaternion.identity);
			newSquare.setHasMine(false);
			guiTopArray[x,z] = newSquare;
			newSquare.transform.parent = topGUIContainer.transform;
		}
	}
	
	topGUIContainer.transform.position.x = Camera.main.transform.position.x + 30;
	topGUIContainer.transform.position.y = Camera.main.transform.position.y - 5;
	topGUIContainer.transform.position.z = Camera.main.transform.position.z + 10.5;
	topGUIContainer.transform.rotation = Camera.main.transform.rotation;
	
	guiTopArray[xGrid - 1, 0].setSelected(true);
	
	//front side cross-section
	for (z = 0; z < zGrid; z++){
		for (var y = 0; y < yGrid; y++){
			newSquare = Instantiate(square, Vector3(z * 2, y * 2, 20), Quaternion.identity);
			newSquare.setHasMine(false);
			guiFrontArray[z,y] = newSquare;
			newSquare.transform.parent = frontGUIContainer.transform;
		}
	}
	
	frontGUIContainer.transform.position.x = Camera.main.transform.position.x + 22.5;
	frontGUIContainer.transform.position.y = Camera.main.transform.position.y - 20;
	frontGUIContainer.transform.position.z = Camera.main.transform.position.z + 6.5;
	frontGUIContainer.transform.rotation = Camera.main.transform.rotation;
	
	guiFrontArray[zGrid - 1, yGrid - 1].setSelected(true);
	
	//right side cross-section
	for (x = 0; x < xGrid; x++){
		for (y = 0; y < yGrid; y++){
			newSquare = Instantiate(square, Vector3(x * 2, y * 2, 20), Quaternion.identity);
			newSquare.setHasMine(false);
			guiRightArray[x,y] = newSquare;
			newSquare.transform.parent = rightGUIContainer.transform;
		}
	}
	
	rightGUIContainer.transform.position.x = Camera.main.transform.position.x + 15;
	rightGUIContainer.transform.position.y = Camera.main.transform.position.y - 36;
	rightGUIContainer.transform.position.z = Camera.main.transform.position.z + 2.5;
	rightGUIContainer.transform.rotation = Camera.main.transform.rotation;
	
	guiRightArray[0, yGrid - 1].setSelected(true);
	
}

function updateGUI(){

	var newSquare:Square;
	var cubeID:int;
	
	//top-down cross-section
	for (var x = 0; x < xGrid; x++){
		for (var z = 0; z < zGrid; z++){
			cubeID = cubeArray[x,currentY,z].getID();
			if (cubeID == 0){
				newSquare = Instantiate(square0, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 1){
				newSquare = Instantiate(square1, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 2){
				newSquare = Instantiate(square2, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 3){
				newSquare = Instantiate(square3, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 4){
				newSquare = Instantiate(square4, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 5){
				newSquare = Instantiate(square5, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 6){
				newSquare = Instantiate(square6, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 7){
				newSquare = Instantiate(mineSquare, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else if (cubeID == 8){
				newSquare = Instantiate(flagSquare, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			else {
				newSquare = Instantiate(square, guiTopArray[zGrid - z - 1,x].transform.position, guiTopArray[zGrid - z - 1,x].transform.rotation);
			}
			
			if (cubeArray[x,currentY,z].getIsSelected()){
				newSquare.setSelected(true);
			}
			else {
				newSquare.setSelected(false);
			}
			Destroy(guiTopArray[zGrid - z - 1,x].gameObject);
			guiTopArray[zGrid - z - 1,x] = newSquare;
			newSquare.transform.parent = topGUIContainer.transform;
			
		}
	}
	
	//highlight surrounding squares in top cross-section
	
	//reset highlights for all squares
	for (x = 0; x < xGrid; x++){
		for (z = 0; z < zGrid; z++){
			guiTopArray[z,x].setHighlighted(false);
		}
	}
	
	//selection on front edge
	if (currentX == 0){
		if (currentZ == 0){
			guiTopArray[zGrid - 1 - currentZ, currentX + 1].setHighlighted(true);
			guiTopArray[zGrid - 2 - currentZ, currentX].setHighlighted(true);
		}
		else if (currentZ == zGrid - 1){
			guiTopArray[zGrid - 1 - currentZ, currentX + 1].setHighlighted(true);
			guiTopArray[zGrid - currentZ, currentX].setHighlighted(true);
		}
		else {
			guiTopArray[zGrid - 1 - currentZ, currentX + 1].setHighlighted(true);
			guiTopArray[zGrid - 2 - currentZ, currentX].setHighlighted(true);
			guiTopArray[zGrid - currentZ, currentX].setHighlighted(true);
		}
	}
	//selection on back edge
	else if (currentX == xGrid - 1){
		if (currentZ == 0){
			guiTopArray[zGrid - 1 - currentZ, currentX - 1].setHighlighted(true);
			guiTopArray[zGrid - 2 - currentZ, currentX].setHighlighted(true);
		}
		else if (currentZ == zGrid - 1){
			guiTopArray[zGrid - 1 - currentZ, currentX - 1].setHighlighted(true);
			guiTopArray[zGrid - currentZ, currentX].setHighlighted(true);
		}
		else {
			guiTopArray[zGrid - 1 - currentZ, currentX - 1].setHighlighted(true);
			guiTopArray[zGrid - 2 - currentZ, currentX].setHighlighted(true);
			guiTopArray[zGrid - currentZ, currentX].setHighlighted(true);
		}
	}
	//selection in the middle
	else {
		if (currentZ == 0){
			guiTopArray[zGrid - 1 - currentZ, currentX + 1].setHighlighted(true);
			guiTopArray[zGrid - 1 - currentZ, currentX - 1].setHighlighted(true);
			guiTopArray[zGrid - 2 - currentZ, currentX].setHighlighted(true);
		}
		else if (currentZ == zGrid - 1){
			guiTopArray[zGrid - 1 - currentZ, currentX + 1].setHighlighted(true);
			guiTopArray[zGrid - 1 - currentZ, currentX - 1].setHighlighted(true);
			guiTopArray[zGrid - currentZ, currentX].setHighlighted(true);
		}
		else {
			guiTopArray[zGrid - 1 - currentZ, currentX + 1].setHighlighted(true);
			guiTopArray[zGrid - 1 - currentZ, currentX - 1].setHighlighted(true);
			guiTopArray[zGrid - currentZ, currentX].setHighlighted(true);
			guiTopArray[zGrid - 2 - currentZ, currentX].setHighlighted(true);
		}
	}
	
	guiTopArray[zGrid - 1 - currentZ, currentX].setSelected(true);
	
	//front side cross-section
	for (z = 0; z < zGrid; z++){
		for (var y = 0; y < yGrid; y++){
			cubeID = cubeArray[currentX,y,z].getID();
			if (cubeID == 0){
				newSquare = Instantiate(square0, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
				else if (cubeID == 1){
				newSquare = Instantiate(square1, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 2){
				newSquare = Instantiate(square2, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 3){
				newSquare = Instantiate(square3, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 4){
				newSquare = Instantiate(square4, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 5){
				newSquare = Instantiate(square5, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 6){
				newSquare = Instantiate(square6, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 7){
				newSquare = Instantiate(mineSquare, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else if (cubeID == 8){
				newSquare = Instantiate(flagSquare, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			else {
				newSquare = Instantiate(square, guiFrontArray[zGrid - z - 1,y].transform.position, guiFrontArray[zGrid - z - 1,y].transform.rotation);
			}
			
			if (cubeArray[currentX,y,z].getIsSelected()){
				newSquare.setSelected(true);
			}
			else {
				newSquare.setSelected(false);
			}
			Destroy(guiFrontArray[zGrid - z - 1,y].gameObject);
			guiFrontArray[zGrid - z - 1,y] = newSquare;
			newSquare.transform.parent = frontGUIContainer.transform;
		}
	}
	
	//highlight surrounding squares in front cross-section
	
	//reset highlights for all squares
	for (y = 0; y < yGrid; y++){
		for (z = 0; z < zGrid; z++){
			guiFrontArray[z,y].setHighlighted(false);
		}
	}
	
	//selection on bottom edge
	if (currentY == 0){
		if (currentZ == 0){
			guiFrontArray[zGrid - 1 - currentZ, currentY + 1].setHighlighted(true);
			guiFrontArray[zGrid - 2 - currentZ, currentY].setHighlighted(true);
		}
		else if (currentZ == zGrid - 1){
			guiFrontArray[zGrid - 1 - currentZ, currentY + 1].setHighlighted(true);
			guiFrontArray[zGrid - currentZ, currentY].setHighlighted(true);
		}
		else {
			guiFrontArray[zGrid - 1 - currentZ, currentY + 1].setHighlighted(true);
			guiFrontArray[zGrid - 2 - currentZ, currentY].setHighlighted(true);
			guiFrontArray[zGrid - currentZ, currentY].setHighlighted(true);
		}
	}
	//selection on top edge
	else if (currentY == yGrid - 1){
		if (currentZ == 0){
			guiFrontArray[zGrid - 1 - currentZ, currentY - 1].setHighlighted(true);
			guiFrontArray[zGrid - 2 - currentZ, currentY].setHighlighted(true);
		}
		else if (currentZ == zGrid - 1){
			guiFrontArray[zGrid - 1 - currentZ, currentY - 1].setHighlighted(true);
			guiFrontArray[zGrid - currentZ, currentY].setHighlighted(true);
		}
		else {
			guiFrontArray[zGrid - 1 - currentZ, currentY - 1].setHighlighted(true);
			guiFrontArray[zGrid - 2 - currentZ, currentY].setHighlighted(true);
			guiFrontArray[zGrid - currentZ, currentY].setHighlighted(true);
		}
	}
	//selection in the middle
	else {
		if (currentZ == 0){
			guiFrontArray[zGrid - 1 - currentZ, currentY + 1].setHighlighted(true);
			guiFrontArray[zGrid - 1 - currentZ, currentY - 1].setHighlighted(true);
			guiFrontArray[zGrid - 2 - currentZ, currentY].setHighlighted(true);
		}
		else if (currentZ == zGrid - 1){
			guiFrontArray[zGrid - 1 - currentZ, currentY + 1].setHighlighted(true);
			guiFrontArray[zGrid - 1 - currentZ, currentY - 1].setHighlighted(true);
			guiFrontArray[zGrid - currentZ, currentY].setHighlighted(true);
		}
		else {
			guiFrontArray[zGrid - 1 - currentZ, currentY + 1].setHighlighted(true);
			guiFrontArray[zGrid - 1 - currentZ, currentY - 1].setHighlighted(true);
			guiFrontArray[zGrid - currentZ, currentY].setHighlighted(true);
			guiFrontArray[zGrid - 2 - currentZ, currentY].setHighlighted(true);
		}
	}
	
	guiFrontArray[zGrid - 1 - currentZ, currentY].setSelected(true);
	
	//right side cross-section
	for (x = 0; x < xGrid; x++){
		for (y = 0; y < yGrid; y++){
			cubeID = cubeArray[x,y,currentZ].getID();
			if (cubeID == 0){
				newSquare = Instantiate(square0, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 1){
				newSquare = Instantiate(square1, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 2){
				newSquare = Instantiate(square2, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 3){
				newSquare = Instantiate(square3, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 4){
				newSquare = Instantiate(square4, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 5){
				newSquare = Instantiate(square5, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 6){
				newSquare = Instantiate(square6, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 7){
				newSquare = Instantiate(mineSquare, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else if (cubeID == 8){
				newSquare = Instantiate(flagSquare, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			else {
				newSquare = Instantiate(square, guiRightArray[x,y].transform.position, guiRightArray[x,y].transform.rotation);
			}
			
			if (cubeArray[x,y,currentZ].getIsSelected()){
				newSquare.setSelected(true);
			}
			else {
				newSquare.setSelected(false);
			}
			
			Destroy(guiRightArray[x,y].gameObject);
			guiRightArray[x,y] = newSquare;
			newSquare.transform.parent = rightGUIContainer.transform;
		}
	}
	
	//highlight surrounding squares in right cross-section
	
	//reset highlights for all squares
	for (y = 0; y < yGrid; y++){
		for (x = 0; x < xGrid; x++){
			guiRightArray[x,y].setHighlighted(false);
		}
	}
	
	//selection on bottom edge
	if (currentY == 0){
		if (currentX == 0){
			guiRightArray[currentX, currentY + 1].setHighlighted(true);
			guiRightArray[currentX + 1, currentY].setHighlighted(true);
		}
		else if (currentX == xGrid - 1){
			guiRightArray[currentX, currentY + 1].setHighlighted(true);
			guiRightArray[currentX - 1, currentY].setHighlighted(true);
		}
		else {
			guiRightArray[currentX, currentY + 1].setHighlighted(true);
			guiRightArray[currentX + 1, currentY].setHighlighted(true);
			guiRightArray[currentX - 1, currentY].setHighlighted(true);
		}
	}
	//selection on top edge
	else if (currentY == yGrid - 1){
		if (currentX == 0){
			guiRightArray[currentX, currentY - 1].setHighlighted(true);
			guiRightArray[currentX + 1, currentY].setHighlighted(true);
		}
		else if (currentX == xGrid - 1){
			guiRightArray[currentX, currentY - 1].setHighlighted(true);
			guiRightArray[currentX - 1, currentY].setHighlighted(true);
		}
		else {
			guiRightArray[currentX, currentY - 1].setHighlighted(true);
			guiRightArray[currentX + 1, currentY].setHighlighted(true);
			guiRightArray[currentX - 1, currentY].setHighlighted(true);
		}
	}
	//selection in the middle
	else {
		if (currentX == 0){
			guiRightArray[currentX, currentY + 1].setHighlighted(true);
			guiRightArray[currentX, currentY - 1].setHighlighted(true);
			guiRightArray[currentX + 1, currentY].setHighlighted(true);
		}
		else if (currentX == xGrid - 1){
			guiRightArray[currentX, currentY + 1].setHighlighted(true);
			guiRightArray[currentX, currentY - 1].setHighlighted(true);
			guiRightArray[currentX - 1, currentY].setHighlighted(true);
		}
		else {
			guiRightArray[currentX, currentY + 1].setHighlighted(true);
			guiRightArray[currentX, currentY - 1].setHighlighted(true);
			guiRightArray[currentX + 1, currentY].setHighlighted(true);
			guiRightArray[currentX - 1, currentY].setHighlighted(true);
		}
	}
	
	guiRightArray[currentX, currentY].setSelected(true);
}

public static function changeSelection(xIn:int, yIn:int, zIn:int){
	
	//sets all cubes to not selected
	for (var x = 0; x < xGrid; x++){
		for (var y = 0; y < yGrid; y++){
			for (var z = 0; z < zGrid; z++){
				cubeArray[x,y,z].setSelected(false);
			}
		}
	}
	
	//sets all cubes to not highlighted
	for (x = 0; x < xGrid; x++){
		for (y = 0; y < yGrid; y++){
			for (z = 0; z < zGrid; z++){
				cubeArray[x,y,z].setHighlighted("basic");
			}
		}
	}
	
	//deals with edge cases
	currentX += xIn;
	if (currentX >= xGrid){
		currentX = xGrid - 1;
	}
	else if (currentX < 0){
		currentX = 0;
	}
	currentY += yIn;
	if (currentY >= yGrid){
		currentY = yGrid - 1;
	}
	else if (currentY < 0){
		currentY = 0;
	}
	currentZ += zIn;
	if (currentZ >= zGrid){
		currentZ = zGrid - 1;
	}
	else if (currentZ < 0){
		currentZ = 0;
	}
	
	//top-down cross-section highlighting
	for (x = 0; x < xGrid; x++){
		for (z = 0; z < zGrid; z++){
			cubeArray[x, currentY, z].setHighlighted("blue");
		}
	}
	
	//front-view cross-section highlighting
	for (z = 0; z < zGrid; z++){
		for (y = 0; y < yGrid; y++){
			cubeArray[currentX, y, z].setHighlighted("red");
		}
	}
	
	//right-view cross-section highlighting
	for (x = 0; x < xGrid; x++){
		for (y = 0; y < yGrid; y++){
			cubeArray[x, y, currentZ].setHighlighted("yellow");
		}
	}
	
	//sets isSelected property of newly selected cube to true
	cubeArray[currentX, currentY, currentZ].setSelected(true);
	
	MainController3.instance.xSlider = currentX;
	MainController3.instance.ySlider = currentY;
	MainController3.instance.zSlider = currentZ;
	
	MainController3.instance.updateGUI();
}

public static function selectCube(){
	
	var foundX:int;
	var foundY:int;
	var foundZ:int;
	var mineCounter:int = 0;
	var foundCube:boolean = false;
	
	//searches through all cubes to find the one that's selected
	for (var x = 0; x < xGrid; x++){
		for (var y = 0; y < yGrid; y++){
			for (var z = 0; z < zGrid; z++){
				if (cubeArray[x,y,z].getIsSelected()){
					foundCube = true;
					foundX = x;
					foundY = y;
					foundZ = z;
				}
			}
		}
	}
	
	//checks to see if the player has already "clicked on" this cube
	if (cubeArray[foundX, foundY, foundZ].getAlreadyClicked() || cubeArray[foundX, foundY, foundZ].getID() == 8){
		//do nothing
	}
	
	//checks to see if selected cube contains a mine. If it does, lose the game
	else if (cubeArray[foundX, foundY, foundZ].getHasMine() && foundCube){
		
		//checks if it's the first selection of the game and moves the mine if it is
		if (MainController3.instance.firstSelection){
			MainController3.instance.firstSelection = false;
			cubeArray[foundX, foundY, foundZ].setHasMine(false);
			
			//used to check if the mine has been replaced somewhere else
			var placedMine:boolean = false;
			
			//places the removed mine somewhere else in the structure
			while (!placedMine){
				var xRand:int = Mathf.FloorToInt(Random.value * xGrid);
				var yRand:int = Mathf.FloorToInt(Random.value * yGrid);
				var zRand:int = Mathf.FloorToInt(Random.value * zGrid);
		
				if (cubeArray[xRand, yRand, zRand].getHasMine() == false){
					cubeArray[xRand, yRand, zRand].setHasMine(true);
					placedMine = true;
				}
			}
			
			selectCube();
		}
		
		//otherwise if it's not the first selection of the game
		else {
			
			//varaible holds instance of new mine cubes
			var newCube:Cube;
			
			//show text telling player they have lost
			//MainController3.instance.mainText.enabled = false;
			//MainController3.instance.mainText.SendMessage("showHint", "You Lose!!");
			
			//play mine sound
			if (MainController3.instance.soundsOn){
				MainController3.instance.transform.audio.PlayOneShot(MainController3.instance.mineSound);
			}
			
			//find all cubes that contain a mine and replace them with mine cubes
			for (x = 0; x < xGrid; x++){
				for (y = 0; y < yGrid; y++){
					for (z = 0; z < zGrid; z++){
						if (cubeArray[x,y,z].getHasMine()){
							newCube = Instantiate(MainController3.instance.mineCube, cubeArray[x,y,z].transform.position, cubeArray[x,y,z].transform.rotation);
							Destroy(cubeArray[x,y,z].gameObject);
							cubeArray[x,y,z] = newCube;
							cubeArray[x,y,z].setAlreadyClicked(true);
							newCube.transform.parent = MainController3.instance.dragCube.transform;
						}
					}
				}
			}
			
			MainController3.instance.updateGUI();
			
			//yield (2.0);
			
			//set variable to signal game has been lost
			MainController3.instance.loseGame = true;
			
			//MainController3.instance.endGame("lose");
		}
	}
	
	//if no mine is found in the selected cube, check surrounding cubes to count how many
	//mines it's touching and change the selected cube accordingly
	else if (!cubeArray[foundX, foundY, foundZ].getHasMine() && foundCube){
		
		//if it's the first selection of the game, change the variable to false
		if (MainController3.instance.firstSelection){
			MainController3.instance.firstSelection = false;
		}
		
		//cube is along the left edge of the structure 
		if (foundX == 0){
			if (foundY == 0){
				if (foundZ == 0){
					//check x+1, y+1, and z+1 
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x+1, y+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x+1, y+1, z+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
			else if (foundY == yGrid - 1){
				if (foundZ == 0){
					//check x+1, y-1, and z+1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x+1, y-1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x+1, y-1, z+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
			else {
				if (foundZ == 0){
					//check x+1, y+1, y-1, and z+1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x+1, y+1, y-1, and z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x+1, y+1, y-1, z+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
		}
		
		//cube is along the right edge of the structure
		else if (foundX == xGrid - 1){
			if (foundY == 0){
				if (foundZ == 0){
					//check x-1, y+1, and z+1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x-1, y+1, z-1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x-1, y+1, z+1, z-1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
			else if (foundY == yGrid - 1){
				if (foundZ == 0){
					//check x-1, y-1, and z+1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x-1, y-1, z-1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x-1, y-1, z+1, z-1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
			else {
				if (foundZ == 0){
					//check x-1, y+1, y-1, and z+1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x-1, y+1, y-1, and z-1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x-1, y+1, y-1, z+1, z-1
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
		}
		
		//cube is between the left and right sides of the structure
		else {
			if (foundY == 0){
				if (foundZ == 0){
					//check x+1, x-1, y+1, and z+1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x+1, x-1, y+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x+1, x-1, y+1, z+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
			else if (foundY == yGrid - 1){
				if (foundZ == 0){
					//check x+1, x-1, y-1, and z+1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x+1, x-1, y-1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x+1, x-1, y-1, z+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
			else {
				if (foundZ == 0){
					//check x+1, x-1, y+1, y-1, and z+1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
				}
				else if (foundZ == zGrid - 1){
					//check x+1, x-1, y+1, y-1, and z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
				else {
					//check x+1, x-1, y+1, y-1, z+1, z-1
					if (cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
						mineCounter++;
					}
					if (cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
						mineCounter++;
					}
				}
			}
		}
		
		//changes selected cube to new cube with a number inside, according to how many
		//mines it is touching
		
		//cube is touching 1 mine
		if (mineCounter == 1){
			var newCube1:Cube;
			newCube1 = Instantiate(MainController3.instance.cube1, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
			Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
			cubeArray[foundX, foundY, foundZ] = newCube1;
			cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
			newCube1.transform.parent = MainController3.instance.dragCube.transform;
			newCube1.setSelected(true);
			MainController3.instance.unknownNum--;
			MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
		}
		//cube is touching 2 mines
		else if (mineCounter == 2){
			var newCube2:Cube;
			newCube2 = Instantiate(MainController3.instance.cube2, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
			Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
			cubeArray[foundX, foundY, foundZ] = newCube2;
			cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
			newCube2.transform.parent = MainController3.instance.dragCube.transform;
			newCube2.setSelected(true);
			MainController3.instance.unknownNum--;
			MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
		}
		//cube is touching 3 mines
		else if (mineCounter == 3){
			var newCube3:Cube;
			newCube3 = Instantiate(MainController3.instance.cube3, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
			Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
			cubeArray[foundX, foundY, foundZ] = newCube3;
			cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
			newCube3.transform.parent = MainController3.instance.dragCube.transform;
			newCube3.setSelected(true);
			MainController3.instance.unknownNum--;
			MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
		}
		//cube is touching 4 mines
		else if (mineCounter == 4){
			var newCube4:Cube;
			newCube4 = Instantiate(MainController3.instance.cube4, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
			Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
			cubeArray[foundX, foundY, foundZ] = newCube4;
			cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
			newCube4.transform.parent = MainController3.instance.dragCube.transform;
			newCube4.setSelected(true);
			MainController3.instance.unknownNum--;
			MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
		}
		//cube is touching 5 mines
		else if (mineCounter == 5){
			var newCube5:Cube;
			newCube5 = Instantiate(MainController3.instance.cube5, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
			Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
			cubeArray[foundX, foundY, foundZ] = newCube5;
			cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
			newCube5.transform.parent = MainController3.instance.dragCube.transform;
			newCube5.setSelected(true);
		}
		//cube is touching 6 mines
		else if (mineCounter == 6){
			var newCube6:Cube;
			newCube6 = Instantiate(MainController3.instance.cube6, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
			Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
			cubeArray[foundX, foundY, foundZ] = newCube6;
			cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
			newCube6.transform.parent = MainController3.instance.dragCube.transform;
			newCube6.setSelected(true);
			MainController3.instance.unknownNum--;
			MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
		}
		//cube is not touching any mines, sets selected cube and all cubes it's touching that
		//aren't touching any mines to 0
		else {
			//0 mines
			MainController3.instance.checkForZeroCubes(currentX, currentY, currentZ);
			cubeArray[foundX, foundY, foundZ].setSelected(true);
		}
		
		//play sound when cube is selected
		if (MainController3.instance.soundsOn){
			MainController3.instance.transform.audio.PlayOneShot(MainController3.instance.selectSound);
		}
		MainController3.instance.updateGUI();
		
	}
}

public static function flagTheCube(){
	
	var foundX:int;
	var foundY:int;
	var foundZ:int;
	for (var x = 0; x < xGrid; x++){
		for (var y = 0; y < yGrid; y++){
			for (var z = 0; z < zGrid; z++){
				if (cubeArray[x,y,z].getIsSelected()){
					foundX = x;
					foundY = y;
					foundZ = z;
				}
			}
		}
	}
	
	if ((cubeArray[foundX, foundY, foundZ].getID() != -1) && (cubeArray[foundX, foundY, foundZ].getID() != 8)){
		//do nothing
	 } 
	
	//check if cube already has a flag in it. If it doesn't, and the cube is still a basic
	//cube, put a flag there
	else if ((cubeArray[foundX, foundY, foundZ].getID() == -1) && (MainController3.instance.flagsLeft > 0)){
		var newFlag:Cube;
		newFlag = Instantiate(MainController3.instance.flagCube, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		
		//sets hasMine property of new block to be that of the old block so we can tell if
		//a flagged cube is actually flagging a mine or not
		newFlag.setHasMine(cubeArray[foundX, foundY, foundZ].getHasMine());
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newFlag;
		newFlag.transform.parent = MainController3.instance.dragCube.transform;
		newFlag.setSelected(true);
		
		MainController3.instance.flagsLeft--;
		if (MainController3.instance.soundsOn){
			MainController3.instance.transform.audio.PlayOneShot(MainController3.instance.flagSound);
		}
		MainController3.instance.flagText.text = "Flags: " + MainController3.instance.flagsLeft;
		
		MainController3.instance.unknownNum--;
		MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
	}
	
	//if cube already has a flag in it, remove the flag and make it a basic cube again
	else if (cubeArray[foundX, foundY, foundZ].getID() == 8){
		var newCube:Cube;
		newCube = Instantiate(MainController3.instance.cube, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		newCube.setHasMine(cubeArray[foundX, foundY, foundZ].getHasMine());
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube;
		newCube.transform.parent = MainController3.instance.dragCube.transform;
		newCube.setSelected(true);
		
		MainController3.instance.flagsLeft++;
		if (MainController3.instance.soundsOn){
			MainController3.instance.transform.audio.PlayOneShot(MainController3.instance.selectSound);
		}
		MainController3.instance.flagText.text = "Flags: " + MainController3.instance.flagsLeft;
		
		MainController3.instance.unknownNum++;
		MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
	}
	
	
	//check to see if all mines have been flagged
	if (MainController3.instance.flagsLeft == 0){
		
		var mineCount:int = 0;
		
		for (x = 0; x < xGrid; x++){
			for (y = 0; y < yGrid; y++){
				for (z = 0; z < zGrid; z++){
					if ((cubeArray[x,y,z].getHasMine()) && (cubeArray[x,y,z].getID() == 8)){
						mineCount++;
					}
				}
			}
		}
		
		//if player has found all of the mines, they win!
		if (mineCount == MainController3.instance.totalMines){
			MainController3.instance.winGame = true;
			//MainController3.instance.mainText.enabled = false;
			//MainController3.instance.mainText.SendMessage("showHint", "You Win!!");
		}
	}
	MainController3.instance.updateGUI();
}

function Update () {
	
	//while game hasn't been won or lost, i.e. it's still being played
	if (!loseGame && !winGame && !pauseGame){
	
		//updates timer
		mainTimer += Time.deltaTime;
		roundedTimer = Mathf.FloorToInt(mainTimer);
		timerText.text = "Time: " + roundedTimer;
	}
}


function endGame(status:String){
	
	if (status == "win"){
		winGameFunction();
	}
	else {
		loseGameFunction();
	}
}
function loseGameFunction(){
	
	fadeOut();
		
	yield WaitForSeconds(2);
		
	Variables.soundsOn = soundsOn;
	Variables.musicOn = musicOn;
	
	Application.LoadLevel("minesweeperMenu");
}
	
function winGameFunction(){
	
	yield WaitForSeconds(3);
	
	winGame = false;
	
	fadeOut();
		
	yield WaitForSeconds(2);
		
	Variables.soundsOn = soundsOn;
	Variables.musicOn = musicOn;
	
	Application.LoadLevel("minesweeperMenu");
}

function quitGameFunction(){
	
	fadeOut();
		
	yield WaitForSeconds(2);
		
	Variables.soundsOn = soundsOn;
	Variables.musicOn = musicOn;
	
	Application.LoadLevel("minesweeperMenu");
}

function quitGameStart(){
	quitButtonPressed = !quitButtonPressed;
	pauseGame = !pauseGame;
}

function checkForZeroCubes(foundX:int, foundY:int, foundZ:int){
	
	var mineCounter:int = 0;
	
	var left:boolean = false;
	var right:boolean = false;
	var up:boolean = false;
	var down:boolean = false;
	var forward:boolean = false;
	var backward:boolean = false;
	
	//cube is along the left edge of the structure 
	if (foundX == 0){
		if (foundY == 0){
			if (foundZ == 0){
				//check x+1, y+1, and z+1 
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x+1, y+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x+1, y+1, z+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
		else if (foundY == yGrid - 1){
			if (foundZ == 0){
				//check x+1, y-1, and z+1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x+1, y-1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x+1, y-1, z+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
		else {
			if (foundZ == 0){
				//check x+1, y+1, y-1, and z+1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x+1, y+1, y-1, and z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x+1, y+1, y-1, z+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
	}
	
	//cube is along the right edge of the structure
	else if (foundX == xGrid - 1){
		if (foundY == 0){
			if (foundZ == 0){
				//check x-1, y+1, and z+1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x-1, y+1, z-1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x-1, y+1, z+1, z-1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
		else if (foundY == yGrid - 1){
			if (foundZ == 0){
				//check x-1, y-1, and z+1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x-1, y-1, z-1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x-1, y-1, z+1, z-1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
		else {
			if (foundZ == 0){
				//check x-1, y+1, y-1, and z+1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x-1, y+1, y-1, and z-1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x-1, y+1, y-1, z+1, z-1
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
	}
	
	//cube is between the left and right sides of the structure
	else {
		if (foundY == 0){
			if (foundZ == 0){
				//check x+1, x-1, y+1, and z+1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x+1, x-1, y+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x+1, x-1, y+1, z+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
		else if (foundY == yGrid - 1){
			if (foundZ == 0){
				//check x+1, x-1, y-1, and z+1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x+1, x-1, y-1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x+1, x-1, y-1, z+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
		else {
			if (foundZ == 0){
				//check x+1, x-1, y+1, y-1, and z+1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
			}
			else if (foundZ == zGrid - 1){
				//check x+1, x-1, y+1, y-1, and z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
			else {
				//check x+1, x-1, y+1, y-1, z+1, z-1
				if (!cubeArray[foundX + 1, foundY, foundZ].getHasMine()){
					forward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX - 1, foundY, foundZ].getHasMine()){
					backward = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY + 1, foundZ].getHasMine()){
					up = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY - 1, foundZ].getHasMine()){
					down = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ + 1].getHasMine()){
					left = true;
				}
				else {
					mineCounter++;
				}
				if (!cubeArray[foundX, foundY, foundZ - 1].getHasMine()){
					right = true;
				}
				else {
					mineCounter++;
				}
			}
		}
	}
	
	//changes current cube to be a 0 cube if it's not touching any mines
	if (mineCounter == 0){
		
		var newCube0:Cube;
		newCube0 = Instantiate(MainController3.instance.cube0, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube0;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube0.transform.parent = MainController3.instance.dragCube.transform;
	
		//recursive calls
		if (left && (cubeArray[foundX, foundY, foundZ + 1].getID() == -1)){
			checkForZeroCubes(foundX, foundY, foundZ + 1);
		}
		if (right && (cubeArray[foundX, foundY, foundZ - 1].getID() == -1)){
			checkForZeroCubes(foundX, foundY, foundZ - 1);
		}
		if (up && (cubeArray[foundX, foundY + 1, foundZ].getID() == -1)){
			checkForZeroCubes(foundX, foundY + 1, foundZ);
		}
		if (down && (cubeArray[foundX, foundY - 1, foundZ].getID() == -1)){
			checkForZeroCubes(foundX, foundY - 1, foundZ);
		}
		if (forward && (cubeArray[foundX + 1, foundY, foundZ].getID() == -1)){
			checkForZeroCubes(foundX + 1, foundY, foundZ);
		}
		if (backward && (cubeArray[foundX - 1, foundY, foundZ].getID() == -1)){
			checkForZeroCubes(foundX - 1, foundY, foundZ);
		}
	}
	
	//cube is touching 1 mine
	else if (mineCounter == 1){
		var newCube1:Cube;
		newCube1 = Instantiate(MainController3.instance.cube1, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube1;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube1.transform.parent = MainController3.instance.dragCube.transform;
	}
	//cube is touching 2 mines
	else if (mineCounter == 2){
		var newCube2:Cube;
		newCube2 = Instantiate(MainController3.instance.cube2, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube2;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube2.transform.parent = MainController3.instance.dragCube.transform;
	}
	//cube is touching 3 mines
	else if (mineCounter == 3){
		var newCube3:Cube;
		newCube3 = Instantiate(MainController3.instance.cube3, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube3;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube3.transform.parent = MainController3.instance.dragCube.transform;
	}
	//cube is touching 4 mines
	else if (mineCounter == 4){
		var newCube4:Cube;
		newCube4 = Instantiate(MainController3.instance.cube4, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube4;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube4.transform.parent = MainController3.instance.dragCube.transform;
	}
	//cube is touching 5 mines
	else if (mineCounter == 5){
		var newCube5:Cube;
		newCube5 = Instantiate(MainController3.instance.cube5, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube5;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube5.transform.parent = MainController3.instance.dragCube.transform;
	}
	//cube is touching 6 mines
	else if (mineCounter == 6){
		var newCube6:Cube;
		newCube6 = Instantiate(MainController3.instance.cube6, cubeArray[foundX, foundY, foundZ].transform.position, cubeArray[foundX, foundY, foundZ].transform.rotation);
		Destroy(cubeArray[foundX, foundY, foundZ].gameObject);
		cubeArray[foundX, foundY, foundZ] = newCube6;
		cubeArray[foundX, foundY, foundZ].setAlreadyClicked(true);
		newCube6.transform.parent = MainController3.instance.dragCube.transform;
	}
	
	MainController3.instance.unknownNum--;
	MainController3.instance.unknownText.text = "Unknowns: " + MainController3.instance.unknownNum;
}

public static function toggleMusic(){
	if (MainController3.instance.musicOn){
		MainController3.instance.musicOn = false;
		MainController3.instance.audio.Pause();
		MainController3.instance.musicGUI.texture = MainController3.instance.musicOffTexture;
	}
	else {
		MainController3.instance.musicOn = true;
		MainController3.instance.audio.Play();
		MainController3.instance.musicGUI.texture = MainController3.instance.musicOnTexture;
	}
}

public static function toggleSounds(){
	if (MainController3.instance.soundsOn){
		MainController3.instance.soundsOn = false;
		MainController3.instance.volumeGUI.texture = MainController3.instance.volumeOffTexture;
	}
	else {
		MainController3.instance.soundsOn = true;
		MainController3.instance.volumeGUI.texture = MainController3.instance.volumeOnTexture;
	}
}

public static function toggleSkybox(){
	Variables.currentSkybox++;
	if (Variables.currentSkybox == Variables.skyboxNum){
		Variables.currentSkybox = 0;
	}
	RenderSettings.skybox = Variables.instance.skyboxArray[Variables.currentSkybox];
}

public static function quitGame(){
	MainController3.instance.quitGameStart();
}

public static function rotateTheCube() {
	
    MainController3.instance.dragCube.transform.Rotate((Input.GetAxis("RotateZ") * -MainController3.instance.rotationSpeed * Time.deltaTime), (Input.GetAxis("RotateX") * -MainController3.instance.rotationSpeed * Time.deltaTime), 
    												(Input.GetAxis("RotateY") * MainController3.instance.rotationSpeed * Time.deltaTime), Space.World);
}

public static function reorientTheCube() {
	
	MainController3.instance.dragCube.transform.rotation = Quaternion.identity;
}