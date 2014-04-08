#pragma strict

class SelectedCube extends Cube{

	function Start () {
		super.Start();
	}
	
	function getHasMine() : boolean{
		return hasMine;
	}
	
	function getIsSelected(): boolean{
		return isSelected;
	}
	
	function setHasMine(hasMineIn:boolean){
		super.setHasMine(hasMineIn);
	}
	
	function setSelected(isSelectedIn:boolean){
		super.setSelected(isSelectedIn);
	}
	
	function Update () {
		super.Update();
	}
	
}