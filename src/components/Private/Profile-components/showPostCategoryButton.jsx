export default function showPostCategoryButton(Category, setDisplay) {
    if (Category.length > 0) {
      return (
        <div className="posts-btn-wrapper">
          <button onClick={(e) => setDisplay(Category[0].type)} data={Category}>
            {Category[0].type === "artsCraft"
              ? "arts and crafts"
              : Category[0].type}
          </button>
          <p>{Category.length} items</p>
        </div>
      );
    }
  }