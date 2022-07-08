import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { PostHeaderAvatar } from "../../../components/Private/Avatars-Links/Avatars";
import { UserComment } from "../../../components/Private/Buttons/Comment/UserComment";
import { MdOutlineArrowBack } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { ProduceNav } from "../../../components/Private/section-header/ProduceNav.jsx";
import "./postPage.scss";

// ? IVO : Im still working on the usercomments component the one its here its not to stay.

export const PostPage = ({ data }) => {
  console.log('data', data)
	const { user } = useContext(UserContext);
  const { title } = useParams();
  let navigate = useNavigate();

  const selected = data.find((item) => item.title === title);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // formate date
  const date = (item) => new Date(item).toLocaleDateString("eu");


  return (
    <>
      <ProduceNav />
      <section className="Post-Page" key={selected._id}>
        <section className="Post-Page-Inner">
          {/* <section className="Post-Page-header">
    <BsHeart className="Post-Page-Header-icons"/>
    <MdOutlineArrowBack onClick={() => backHandler(selected.type)} className="Post-Page-Header-icons"/>
    </section> */}
          <section className="Post-hero">
            <section className="Post-Page-header">
              <BsHeart className="Post-Page-Header-icons" />
              <MdOutlineArrowBack onClick={() => navigate(-1)} className="Post-Page-Header-icons" />
            </section>
            <img src={selected.image}></img>
            <h1>{selected.title}</h1>
          </section>

          <section className="Post-header">
            <PostHeaderAvatar
              name={selected.authorProfileName}
              image={selected.authorAvatar}
            ></PostHeaderAvatar>
            <button className="Like-button">Likes</button>
          </section>

          <section className="Post-title">
            <p>{selected.category.map((item) => item.toUpperCase())}</p>
            <p className="Post-date">{date(selected.createdAt)}</p>
          </section>

          <section className="Post-description">
            {selected.description.split(/\r?\n/).map((item, i) => (
              <p key={'PostPage-description' + i}>{item}</p>
            ))}
          </section>
          <section className="Post-tags">
            {selected.tags.map((item) => (
              <p key={'PostPage-tags' + item}>{item}</p>
            ))}
          </section>

          <section className="Post-video">
            {selected.video ? (
              <video src={selected.video} controls width="100%"></video>
            ) : null}
          </section>

          <section className="Post-comments">
            <p>Comments</p>
            {selected.comments
              ? selected.comments.map((item, index) => (
                  <UserComment data={item} user={currentUser._id} key={'userComment' + index}></UserComment>
                ))
              : null}

            <section className="Leave-Comment">
              <textarea placeholder="leave a comment"></textarea>
              <button>leave a comment</button>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

{
  /* <section className="Comments-inner" key={item.author}>
          <p className="commentDate">{date(item.createdAt)}</p>
          <section className="comment">
            <PostCommentsAvatar name={item.authorProfileName} image={item.authorAvatar}></PostCommentsAvatar>
            <p className="comment-text">{item.message}</p>
          </section>
      </section> */
}
