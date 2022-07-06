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
            {pins[0].postType === "artsCraft"
              ? "arts and crafts"
              : pins[0].postType}
          </div>
          <p>{pins.length} items</p>
        </div>
      );
    }
}