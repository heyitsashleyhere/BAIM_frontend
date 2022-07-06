export default function showPostCategoryButton(Category, display, setDisplay, showCatPosts, setShowCatPosts) {
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
          <div onClick={handleClick} data={Category}
               className={`${Category[0].type} post-btn-container`} >
            {Category[0].type === "artsCraft"
              ? "arts and crafts"
              : Category[0].type}
          </div>
          <p>{Category.length} items</p>
        </div>
      );
    }
}