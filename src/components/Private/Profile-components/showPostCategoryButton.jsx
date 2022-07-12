export default function showPostCategoryButton(Category, display, setDisplay, showCatPosts, setShowCatPosts) {
  console.log('Category', Category)  
  if (Category.length > 0) {
      function handleClick() {
        setDisplay(Category[0].type) 
        if(display === Category[0].type){
          setShowCatPosts(!showCatPosts)
        } else {
          setShowCatPosts(true)
        }
      }
      return (
        <div className="posts-btn-wrapper">
          <div onClick={handleClick}
               className={`${Category[0].type} post-btn-container`} >
          </div>
          <p> {Category[0].type === "artsCraft"
              ? "arts"
              : Category[0].type}</p>
          <p>{Category.length} items</p>
        </div>
      );
    }
}