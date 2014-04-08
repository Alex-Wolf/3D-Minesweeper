#pragma strict

function Start () {

}

function Update () {
}

function showHint(message:String){
	guiText.text = message;
	if(!guiText.enabled){
		guiText.enabled = true;
	}
}