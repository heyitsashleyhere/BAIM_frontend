import { SquareAvatar } from "../Avatars-Links/Avatars.jsx";

export default function displayAvatars(type, beauties, artsCrafts, gardens, recipes, events) {
    switch (type) {
      case "beauty":
        return beauties.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "artsCraft":
        return artsCrafts.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "garden":
        return gardens.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "recipe":
        return recipes.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
      case "event":
        return events.map((data, i) => (
          <SquareAvatar key={"profilePage-avatar" + i} data={data} />
        ));
    }
  }