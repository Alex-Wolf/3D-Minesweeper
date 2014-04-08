#pragma strict

var textureOn:Texture2D;
var textureOff:Texture2D;

function Start () {
	if (MainController3.instance.musicOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}

function Update () {

}

function OnMouseUp(){
	MainController3.instance.musicOn = !MainController3.instance.musicOn;
	if (MainController3.instance.musicOn){
		GetComponent(GUITexture).texture = textureOn;
		MainController3.instance.audio.Play();
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
		MainController3.instance.audio.Pause();
	}
}