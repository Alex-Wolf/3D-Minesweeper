#pragma strict

var textureOn:Texture2D;
var textureOff:Texture2D;

function Start () {
	if (MainController2.instance.musicOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}

function Update () {

}

function OnMouseUp(){
	MainController2.instance.musicOn = !MainController2.instance.musicOn;
	if (MainController2.instance.musicOn){
		GetComponent(GUITexture).texture = textureOn;
		MainController2.instance.audio.Play();
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
		MainController2.instance.audio.Pause();
	}
}