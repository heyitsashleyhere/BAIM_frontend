import { useEffect } from "react";

export default function showPinCategoryButton(myPins, display, setDisplay, showCatPosts, setShowCatPosts) {
  // useEffect(() => {
  //   const config = {
  //     method: "GET",
  //     credentials: "include", // specify this if you need cookies
  //     headers: { "Content-Type": "application/json" },
  //   }

  //   fetch(`http://localhost:7000/user/${profileName}`, config)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.errors) {
  //         console.log("errors from Profile GET user :>> ", result.errors);
  //       } else {
  //         if (result['beauty'].length == 0 && result['artsCraft'].length == 0 && result['garden'].length == 0 && result['recipe'].length == 0 && result['event'].length == 0) {
  //           currentUser.profileName === profileName
  //           ? setPostMessage("You have not posted anything yet")
  //           : setPostMessage("This person has not posted anything yet");
  //         }
  //         setProfileData(result)
  //         setPinsId(result.pin)
  //         setFollowers(result.followers);
  //         setFollowing(result.following);
  //       }
  //     })
  //     .catch((error) => console.log(`error from profileName request in Profile`, error));
  // }, [])
  
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