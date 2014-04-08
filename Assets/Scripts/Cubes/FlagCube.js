#pragma strict

class FlagCube extends Cube{
	
	function Awake(){
		super.Awake();
		ID = 8;
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
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material =  mineMaterial;
		}
		else {
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material =  basicMaterial;
		}
	}
	
	function setSelected(isSelectedIn:boolean){
		super.setSelected(isSelectedIn);
		if (isSelected){
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = selectedMaterial;
		}
		else {
			if (hasMine){
				transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = mineMaterial;
			}
			else {
				transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
			}
		}
	}
	
	function setHighlighted(color:String){
		if (color == "blue"){
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = highlightBlueMaterial;
		}
		else if (color == "red"){
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = highlightRedMaterial;
		}
		else if (color == "yellow"){
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = highlightYellowMaterial;
		}
		else {
			transform.FindChild("3DMinesweeperCubeFlag").FindChild("pCube1").gameObject.renderer.material = basicMaterial;
		}
	}
	
	function setAlreadyClicked(alreadyClickedIn:boolean){
		super.setAlreadyClicked(alreadyClickedIn);
	}
	
	function Update () {
		super.Update();
	}
	
}