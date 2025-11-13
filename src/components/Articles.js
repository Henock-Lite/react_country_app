import axios from "axios";
import React, { useState } from "react";

const Articles = ({ article }) => {
  const [isEditing, setEditing] = useState(false);
  const [Editcontent, setEditcontent] = useState("");

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const sendEditing = async () => {
    try {
      const data = {
        author: article.author,
        content: Editcontent ? Editcontent : article.content,
        date: article.date,
        updateDate: Date.now(),
      };
      await axios
        .put("http://localhost:3004/articles/" + article.id, data)
        .then(() => {
          setEditing(false);
        });
    } catch (error) {
      console.error("Faild connection : ".error);
    }
  };
  const handleEdit = () => {
    sendEditing();
  };

  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
    window.location.reload();
  };
  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormater(article.date)}</em>
      </div>

      {isEditing ? (
        <textarea
          defaultValue={Editcontent ? Editcontent : article.content}
          onChange={(e) => setEditcontent(e.target.value)}
          autoFocus
        ></textarea>
      ) : (
        <p>{Editcontent ? Editcontent : article.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}> Valider</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button
          onClick={() => {
            if (
              window.confirm("Voulez-vous vraiment supprimer cet article ?")
            ) {
              handleDelete();
            }
          }}
        >
          supprimer
        </button>
      </div>
    </div>
  );
};

export default Articles;
