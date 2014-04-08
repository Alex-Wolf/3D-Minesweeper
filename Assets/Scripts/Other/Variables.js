#pragma strict

static var instance:Variables;
public static var soundsOn:boolean = true;
public static var musicOn:boolean = true;
public static var difficulty:int = 0;
public static var skyboxNum:int = 7;
public static var currentSkybox:int;
public var skyboxArray:Material[] = new Material[skyboxNum];
public static var skyboxNameArray:String[] = new String[skyboxNum];

function Awake(){
	DontDestroyOnLoad(gameObject);
	instance = this;
	skyboxNameArray[0] = "Space 1";
	skyboxNameArray[1] = "Space 2";
	skyboxNameArray[2] = "Space 3";
	skyboxNameArray[3] = "Grid";
	skyboxNameArray[4] = "Lava";
	skyboxNameArray[5] = "Ice";
	skyboxNameArray[6] = "Cave";
}

function Start() {

}

function Update() {

}