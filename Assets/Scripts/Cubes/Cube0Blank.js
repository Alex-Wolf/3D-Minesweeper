#pragma strict

class Cube0Blank extends Cube{
	
	function Awake(){
		super.Awake();
		ID = 0;
	}
	
	function Start () {
		super.Start();
	}
	
	function getHasMine() : boolean{
		return hasMine;
	}
	
	function getIsSelected(): boolean{
		return isSelected;
	}
	
	function getAlreadyClicked() : boolean{
		return alreadyClicked;
	}
	
	function getID() : int{
		return ID;
	}
	
	function setHasMine(hasMineIn:boolean){
		super.setHasMine(hasMineIn);
		if (hasMineIn){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material =  mineMaterial;
		}
		else {
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material =  basicMaterial;
		}
	}
	
	function setSelected(isSelectedIn:boolean){
		super.setSelected(isSelectedIn);
		if (isSelected){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = selectedMaterial;
		}
		else {
			if (hasMine){
				transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = mineMaterial;
			}
			else {
				transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = basicMaterial;
			}
		}
	}
	
	function setHighlighted(color:String){
		if (color == "blue"){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = highlightBlueMaterial;
		}
		else if (color == "red"){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = highlightRedMaterial;
		}
		else if (color == "yellow"){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = highlightYellowMaterial;
		}
		else {
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = basicMaterial;
		}
	}
	
	function setAlreadyClicked(alreadyClickedIn:boolean){
		super.setAlreadyClicked(alreadyClickedIn);
	}
	
	function Update () {
		super.Update();
	}
	
}