#pragma strict


class Cube extends MonoBehaviour{
 	
 	//unique ID for each type of cube
 	public var ID:int;
	
	//properties used when selecting and setting materials of cube
	public var hasMine:boolean;
	public var isSelected:boolean;
	public var alreadyClicked:boolean;
	
	//materials to show status of cube
	public var basicMaterial:Material;
	public var selectedMaterial:Material;
	public var mineMaterial:Material;
	
	//highlight materials
	public var highlightBlueMaterial:Material;
	public var highlightRedMaterial:Material;
	public var highlightYellowMaterial:Material;
	
	function Awake(){
		isSelected = false;
		alreadyClicked = false;
	}
	
	function Start () {
		
	}
	
	function getHasMine() : boolean{
		return hasMine;
	}
	
	function getIsSelected() : boolean{
		return isSelected;
	}
	
	function getAlreadyClicked() : boolean{
		return alreadyClicked;
	}
	
	function getID() : int{
		return ID;
	}
	
	function setHasMine(hasMineIn:boolean){
		hasMine = hasMineIn;
	}
	
	function setSelected(isSelectedIn:boolean){
		isSelected = isSelectedIn;
	}
	
	function setHighlighted(color:String){
		
	}
	
	function setAlreadyClicked(alreadyClickedIn:boolean){
		alreadyClicked = alreadyClickedIn;
	}
	
	function Update () {
		
	}
}