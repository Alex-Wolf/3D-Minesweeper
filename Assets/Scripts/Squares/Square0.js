#pragma strict

class Square0 extends Square{
	
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
			transform.FindChild("Square0Maya").FindChild("pCube1").gameObject.renderer.material =  mineMaterial;
		}
		else {
			transform.FindChild("Square0Maya").FindChild("pCube1").gameObject.renderer.material =  basicMaterial;
		}
	}
	
	function setSelected(isSelectedIn:boolean){
		super.setSelected(isSelectedIn);
		if (isSelected){
			transform.FindChild("Square0Maya").FindChild("pCube1").gameObject.renderer.material = selectedMaterial;
		}
		else {
			if (hasMine){
				transform.FindChild("Square0Maya").FindChild("pCube1").gameObject.renderer.material = mineMaterial;
			}
			else {
				transform.FindChild("Square0Maya").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
			}
		}
	}
	
	function Update () {
		super.Update();
	}
	
}