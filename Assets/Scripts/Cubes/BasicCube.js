#pragma strict

class BasicCube extends Cube{
	
	function Awake(){
		super.Awake();
		ID = -1;
	}
	
	function Start() {
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
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material =  mineMaterial;
		}
		else {
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material =  basicMaterial;
		}
	}
	
	function setSelected(isSelectedIn:boolean){
		super.setSelected(isSelectedIn);
		if (isSelected){
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = selectedMaterial;
		}
		else {
			if (hasMine){
				transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = mineMaterial;
			}
			else {
				transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
			}
		}
	}
	
	function setHighlighted(color:String){
		if (color == "blue"){
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = highlightBlueMaterial;
		}
		else if (color == "red"){
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = highlightRedMaterial;
		}
		else if (color == "yellow"){
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = highlightYellowMaterial;
		}
		else {
			transform.FindChild("BasicCube").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
		}
	}
	
	function setAlreadyClicked(alreadyClickedIn:boolean){
		super.setAlreadyClicked(alreadyClickedIn);
	}
	
	function Update () {
		super.Update();
	}
	
}