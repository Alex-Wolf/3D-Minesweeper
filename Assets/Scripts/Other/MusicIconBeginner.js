#pragma strict

var textureOn:Texture2D;
var textureOff:Texture2D;

function Start () {
	if (MainController.instance.musicOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}

function Update () {

}

function OnMouseUp(){
	MainController.instance.musicOn = !MainController.instance.musicOn;
	if (MainController.instance.musicOn){
		GetComponent(GUITexture).texture = textureOn;
		MainController.instance.audio.Play();
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
		MainController.instance.audio.Pause();
	}
}