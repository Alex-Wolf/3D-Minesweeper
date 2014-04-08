#pragma strict

var textureOn:Texture2D;
var textureOff:Texture2D;

function Start () {
	if (MainController2.instance.soundsOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}

function Update () {

}

function OnMouseUp(){
	MainController2.instance.soundsOn = !MainController2.instance.soundsOn;
	if (MainController2.instance.soundsOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}