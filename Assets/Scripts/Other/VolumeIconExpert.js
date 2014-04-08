#pragma strict

var textureOn:Texture2D;
var textureOff:Texture2D;

function Start () {
	if (MainController3.instance.soundsOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}

function Update () {

}

function OnMouseUp(){
	MainController3.instance.soundsOn = !MainController3.instance.soundsOn;
	if (MainController3.instance.soundsOn){
		GetComponent(GUITexture).texture = textureOn;
	}
	else {
		GetComponent(GUITexture).texture = textureOff;
	}
}