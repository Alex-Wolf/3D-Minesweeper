#pragma strict

class MineSquare extends Square{
	
	function Awake(){
		super.Awake();
		ID = 7;
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
			transform.FindChild("SquareMineMaya").FindChild("pCube").gameObject.renderer.material =  mineMaterial;
		}
		else {
			transform.FindChild("SquareMineMaya").FindChild("pCube1").gameObject.renderer.material =  basicMaterial;
		}
	}
	
	function setSelected(isSelectedIn:boolean){
		super.setSelected(isSelectedIn);
		if (isSelected){
			transform.FindChild("SquareMineMaya").FindChild("pCube1").gameObject.renderer.material = selectedMaterial;
		}
		else {
			if (hasMine){
				transform.FindChild("SquareMineMaya").FindChild("pCube1").gameObject.renderer.material = mineMaterial;
			}
			else {
				transform.FindChild("SquareMineMaya").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
			}
		}
	}
	
	function setHighlighted(isHighlightedIn:boolean){
		super.setHighlighted(isHighlightedIn);
		if (isHighlighted){
			transform.FindChild("SquareMineMaya").FindChild("pCube1").gameObject.renderer.material = highlightMaterial;
		}
		else {
			transform.FindChild("SquareMineMaya").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
		}
	}
	
	function Update () {
		super.Update();
	}
	
}