import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleDialogDemo from "../components/Dialog";

export default function OrderPage(props) {
  const location = useLocation();
  const [posts, setPosts] = useState(location.state.ingredientslist);
  const [usermessage, setMessage] = useState("");
  const [username, setName] = useState("");
  const [isPosts, setIsPosts] = useState(false); // isPosts can be true or false
  const navigate = useNavigate();

   useEffect(() => {
    async function getPosts() {
      if (location.state.ingredientslist.length > 0) {
        setIsPosts(true);
        setPosts(location.state.ingredientslist);
        sessionStorage.setItem("ingredientslist",JSON.stringify(location.state.ingredientslist)
        );
      }
    }

    getPosts();
  }, [location.state.ingredientslist]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name: username,
      message: usermessage,
      ingredientslist: JSON.stringify(location.state.ingredientslist),
    };

    const url =
      "https://dishes-c89c9-default-rtdb.europe-west1.firebasedatabase.app/savedlists.json";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    navigate("/");
  }

  return (
    <form className="page" onSubmit={handleSubmit}>
      <h1>Ingredients</h1>
      {isPosts ? (
        <div className="flexbox">
          {posts.map((post, index) => (
            <div className="card_container" key={index}>
              <span className="ident">afadsf</span>
              <section className="card">
                <div className="danish">
                  <p>[Ingredients]</p>
                  <p>{post}</p>
                </div>
              </section>
            </div>
          ))}
          <textarea
            placeholder="Write message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="type in your name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
      ) : (
        <p>Nothing to show</p>
      )}
      <button>Save list</button>
      <SimpleDialogDemo></SimpleDialogDemo>
    </form>
  );
}
