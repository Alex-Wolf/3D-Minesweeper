#pragma strict

class Square extends MonoBehaviour{
 	
 	//unique ID for each type of square
 	public var ID:int;
	
	//properties used when selecting and setting materials of square
	public var hasMine:boolean;
	public var isSelected:boolean;
	public var isHighlighted:boolean;
	
	//materials to show status of square
	public var basicMaterial:Material;
	public var selectedMaterial:Material;
	public var mineMaterial:Material;
	public var highlightMaterial:Material;
	
	function Awake(){
		isSelected = false;
		isHighlighted = false;
	}
	
	function Start () {
		
	}
	
	function getHasMine() : boolean{
		return hasMine;
	}
	
	function getIsSelected() : boolean{
		return isSelected;
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
	
	function setHighlighted(isHighlightedIn:boolean){
		isHighlighted = isHighlightedIn;
	}
	
	function Update () {
		
	}
}