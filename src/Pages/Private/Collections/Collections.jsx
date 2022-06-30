import React, { useState, useEffect, useRef, useContext } from "react";
// context
import { AnimationContext } from "../../../contexts/AnimationContext";
// components
import { SquareAvatar } from "../../../components/Private/Avatars-Links/Avatars";
import { SectionNav } from "../../../components/Private/section-header/SectionNav";
// styles
import "./collections.scss";
//(userLibrary[category]).find(post => post._id === id)

export const Collections = (props) => {
  const { data, type } = props;

  //to handle window.width and render the produce navbar only for desktop
  const { windowWidth } = useContext(AnimationContext);
  const [isMobile, setIsMobile] = useState(false);

  console.log(windowWidth);
  useEffect(() => {
    setIsMobile(windowWidth > 1024 ? true : false);
  }, [windowWidth]);

  // animation
  const [index, setIndex] = useState(0);
  const delay = 5500;
  const timeoutRef = useRef(null);

  const images = {
    recipe: [
      {
        url: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1406&q=80",
        title: "Fierce morning",
        sub: "Start Fresh",
      },
      {
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80",
        title: "YummY",
        sub: "dinner or lunch ?",
      },
      {
        url: "https://images.unsplash.com/photo-1604634077373-a279cadc62c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Sweet Tooth?",
        sub: "Get inspired",
      },
      {
        url: "https://images.unsplash.com/photo-1563282396-c299392870cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Always fresh",
        sub: " for the 4 seasons",
      },
    ],
    garden: [
      {
        url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Cool for school",
        sub: "Volunteers reach out",
      },
      {
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "sweet Home",
        sub: " grow everywhere",
      },
      {
        url: "https://images.unsplash.com/photo-1598129982257-bede1760b4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "city farmers",
        sub: "no limits",
      },
      {
        url: "https://images.unsplash.com/photo-1527863280617-15596f92e5c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "share",
        sub: "teach your journey",
      },
    ],
    beauty: [
      {
        url: "https://images.unsplash.com/photo-1626006864202-946131e379dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "avocado?",
        sub: "home-made cream",
      },
      {
        url: "https://images.unsplash.com/photo-1586784645620-37527450c441?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Sunday Citrus",
        sub: "Bath for a better skin",
      },
      {
        url: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Lavanda power",
        sub: "home-made oils",
      },
      {
        url: "https://images.unsplash.com/photo-1599451897608-ad6eb8676edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "COCO-LOCO",
        sub: "Coco must know",
      },
    ],
    arts: [
      {
        url: "https://images.unsplash.com/photo-1506806770414-b0e5db562f56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
        title: "EASY",
        sub: "Ready to start?",
      },
      {
        url: "https://images.unsplash.com/photo-1534769549239-a38ef6ace900?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Meditate",
        sub: "create",
      },
      {
        url: "https://images.unsplash.com/photo-1547071676-291b6dda51a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
        title: "street-art",
        sub: "making walls fun",
      },
      {
        url: "https://images.unsplash.com/photo-1615870728187-3efca163c649?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        title: "Luxury?",
        sub: "make it as you want",
      },
    ],
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images[type].length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      {isMobile && <SectionNav />}
      <section className="Collections">
        <section className="Slideshow">
          <section
            className="Hero slideShowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {images[type].map((item, index) => (
              <section className="slide">
                <img src={item.url}></img>
                <section className="Hero-text">
                  <h1>{item.title}</h1>
                  <p>{item.sub}</p>
                </section>
              </section>
            ))}
          </section>
        </section>

        <section className="Library-wrapper">
          <section className="lib-wrapper-header">
            <h2>Our {type} collections</h2>
            <p>{data.length}items</p>
          </section>
          <section className="Library-container">
            {data.map((item) => (
              <SquareAvatar data={item} isOnProfile={false} />
            ))}
          </section>
        </section>
      </section>
    </>
  );
};
