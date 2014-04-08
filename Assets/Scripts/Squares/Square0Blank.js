#pragma strict

class Square0Blank extends Square{
	
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
	
	function getID() : int{
		return ID;
	}
	
	function setHasMine(hasMineIn:boolean){
		super.setHasMine(hasMineIn);
		if (hasMineIn){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = mineMaterial;
		}
		else {
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = basicMaterial;
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
	
	function setHighlighted(isHighlightedIn:boolean){
		super.setHighlighted(isHighlightedIn);
		if (isHighlighted){
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = highlightMaterial;
		}
		else {
			transform.FindChild("Cube").gameObject.GetComponent(MeshRenderer).material = basicMaterial;
		}
	}
	
	function Update () {
		super.Update();
	}
	
}