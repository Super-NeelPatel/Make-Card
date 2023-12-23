import React from "react";
import { useState } from "react";

const initialCardList = [
  {
    title: "Beach",
    description:
      "Golden sands, rhythmic waves, warm breeze—a coastal escape. Sun's embrace beckons, horizon whispers endless tales.",
    imgSrc: "./images/img1.jpg",
  },
  {
    title: "Mountains",
    description:
      "Majestic peaks, emerald hues, veiled in mist—stoic grandeur. Pine-scented air, cascading streams, rugged beauty: a mountain sanctuary.",
    imgSrc: "./images/img3.jpg",
  },
  {
    title: "Sunset",
    description:
      "Sun bids adieu, paints warm sky in hues of orange, pink. Tranquil masterpiece casts serene glow, lingers in heart as twilight takes hold.",
    imgSrc: "./images/img2.jpg",
  },
  {
    title: "Hello Neel",
    description:
      "Golden sands, rhythmic waves, warm breeze—a coastal escape. Sun's embrace beckons, horizon whispers endless tales.",
    imgSrc: "./images/img1.jpg",
  },
  {
    title: "Mountains",
    description:
      "Majestic peaks, emerald hues, veiled in mist—stoic grandeur. Pine-scented air, cascading streams, rugged beauty: a mountain sanctuary.",
    imgSrc: "./images/img3.jpg",
  },
];

export default function App() {
  const [list, setCardList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [date, setDate] = useState("");
  const [emoji, setEmoji] = useState("😃");

  function getImgUrl(e) {
    const file = e.target.files[0];
    const path = URL.createObjectURL(file);
    const { lastModifiedDate } = file;
    const pictureDate = `${
      lastModifiedDate.getMonth() + 1
    }/${lastModifiedDate.getDate()}/${lastModifiedDate.getFullYear()}`;
    setDate(pictureDate);
    console.log(pictureDate);
    console.log(lastModifiedDate);
    console.log(file);
    setImgSrc(path);
  }

  const newCard = {
    title,
    description,
    imgSrc,
    date,
    emoji,
  };

  function handleAddItem() {
    console.log(newCard);

    if (title && description && imgSrc) {
      setCardList([...list, newCard]);
      setImgSrc(null);
      setDescription("");
      setTitle("");
      console.log(title, description, imgSrc);
    }
  }

  return (
    <div className="main">
      <div className="left-bar">
        <LeftSide
          setTitle={setTitle}
          title={title}
          description={description}
          setDescription={setDescription}
          setEmoji={setEmoji}
          getImgUrl={getImgUrl}
          handleAddItem={handleAddItem}
        />
      </div>
      <div className="right-side">
        <RightSide
          list={list}
          description={description}
          imgSrc={imgSrc}
          date={date}
          emoji={emoji}
        />
      </div>
    </div>
  );
}

function LeftSide({
  setTitle,
  setDescription,
  setEmoji,
  getImgUrl,
  handleAddItem,
  title,
  description,
}) {
  return (
    <Form
      setTitle={setTitle}
      setDescription={setDescription}
      setEmoji={setEmoji}
      getImgUrl={getImgUrl}
      handleAddItem={handleAddItem}
      title={title}
      description={description}
    />
  );
}

function Form({
  setTitle,
  setDescription,
  setEmoji,
  getImgUrl,
  handleAddItem,
  title,
  description,
}) {
  return (
    <div
      className="form-container"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        className="input-img"
        type="file"
        accept="image/*"
        onChange={getImgUrl}
      />
      <input
        className="input-title"
        type="text"
        placeholder="Title"
        maxLength={10}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          console.log(e.target.value);
        }}
      />
      <textarea
        className="input-description"
        rows={5}
        cols={20}
        placeholder="Description"
        maxLength={100}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          // console.log(e.target.value);
        }}
      />
      <div className="emoji-container">
        <span
          onClick={(e) => {
            setEmoji(e.target.innerText);
          }}
        >
          😃
        </span>
        <span
          onClick={(e) => {
            setEmoji(e.target.innerText);
          }}
        >
          😇
        </span>
        <span
          onClick={(e) => {
            setEmoji(e.target.innerText);
          }}
        >
          😋
        </span>
        <span
          onClick={(e) => {
            setEmoji(e.target.innerText);
          }}
        >
          😫
        </span>
        <span
          onClick={(e) => {
            setEmoji(e.target.innerText);
          }}
        >
          🥺
        </span>
      </div>
      <button onClick={handleAddItem}>Make Card</button>
    </div>
  );
}

function RightSide({ list, title, description, imgSrc, date, emoji }) {
  return (
    <>
      <TitleAndStats list={list} />
      <List
        initialCardList={initialCardList}
        list={list}
        title={title}
        description={description}
        imgSrc={imgSrc}
        date={date}
        emoji={emoji}
      />
    </>
  );
}

function TitleAndStats({ list }) {
  return (
    <div className="title-container">
      <p>Empty</p>
      <p className="title">My Gallary</p>
      <p className="stats">{list.length} cards</p>
    </div>
  );
}

function List({ initialCardList, list }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item
            initialListItem={item}
            key={Math.floor(Math.random() * 10000000000)}
            title={item.title}
            description={item.description}
            imgSrc={item.imgSrc}
            date={item.date}
            emoji={item.emoji}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ initialListItem, title, description, imgSrc, date, emoji }) {
  // console.log(imgSrc);
  // console.log(initialListItem);

  return (
    <>
      <li>
        <div className="card-container">
          <img className="card_img" src={imgSrc} alt="Not" />
          <span className="emoji-space">{emoji}</span>
          <div className="card-details">
            <div className="card_title-date">
              <p className="img-title">
                Title: <span className="span-title"> {title}</span>
              </p>
              <p className="img-date">
                Date: <span className="span-date">{date}</span>
              </p>
            </div>
            <div className="card_description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
