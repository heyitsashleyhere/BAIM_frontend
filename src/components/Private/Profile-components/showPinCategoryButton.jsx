export default function showPinCategoryButton(pins, display, setDisplay, showCatPins, setShowCatPins) {
  
  if (pins.length > 0) {
      function handleClick() {
        setDisplay(pins[0].postType) 
        if(display === pins[0].postType){
          setShowCatPins(!showCatPins)
        } else {
          setShowCatPins(true)
        }
      }
      return (
        <div className="posts-btn-wrapper">
          <div onClick={handleClick}
               className={`${pins[0].postType} post-btn-container`} >
          </div>
          
          <p>{pins[0].postType === "artsCraft"
              ? "arts"
              : pins[0].postType}</p>
          <p>{pins.length} items</p>
          
        </div>
      );
    }
}