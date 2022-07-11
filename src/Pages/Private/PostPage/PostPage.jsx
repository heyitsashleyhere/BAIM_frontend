import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { PostHeaderAvatar } from "../../../components/Private/Avatars-Links/Avatars";
import { UserComment } from "../../../components/Private/Buttons/Comment/UserComment";
import { MdOutlineArrowBack } from "react-icons/md";
import { Pin } from "../../../components/Private/Buttons/Pin/Pin.jsx";
import { AddComment } from "../../../components/Private/Buttons/Comment/AddComment.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar.jsx";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar";
import "./postPage.scss";

// ? IVO : Im still working on the usercomments component the one its here its not to stay.

export const PostPage = ({ data }) => {
  const [cookies] = useCookies();
  const { title } = useParams();
  let navigate = useNavigate();

  const selected = data.find((item) => item.title === title);

  // formate date
  const date = (item) => new Date(item).toLocaleDateString("eu");

  return (
    <>
      <ProduceNavbar />
      <DiscoverNavbar />
      <section className="Post-Page" key={selected._id}>
        <section className="Post-Page-Inner">
          <section className="Post-hero">
            <section className="Post-Page-header">
             <Pin post={selected}/>
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
             {/* <Pin/> */}
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
            {selected.tags && selected.tags.map((item) => (
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
                  <UserComment post={item} user={cookies.id} key={'userComment' + index}></UserComment>
                ))
              : null}

            <section className="Leave-Comment">
            <AddComment post={selected}/>
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
