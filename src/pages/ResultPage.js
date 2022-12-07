import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResultPage(props) {
      const [posts, setPosts] = useState([]);
      const [isPosts, setIsPosts] = useState(true); // isPosts can be true or false
      const [checked, setChecked] = useState([]);
      const navigate = useNavigate();
      const location = useLocation();
      
      // Add/Remove checked item from list  
      const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
  };
  

  async function getData(dish) {
    const url = `https://dishes-c89c9-default-rtdb.europe-west1.firebasedatabase.app/dishes/${dish}/ingredients.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
        
      useEffect(() => {
          async function getPosts() {
            // let postsArray = [];
            let database = [];
            let data;

            for (const dish of location.state.dishlist) {
              data = await getData(dish);
              database.push(...data);
            }

            if (data !== null) {
              /*postsArray = Object.keys(database).map((key) => ({
                id: key,
                ...data[key],
              })); */
              setPosts(database); // Update "posts" object array list. Set posts equal to postsArray
              } else {
              setIsPosts(false); // If no data is found, set isPosts to "false". "Noting to show" message is shown.
              }
            }
        
        getPosts();
      }, []);
    
     function handleSubmit(e) {
        e.preventDefault();
        navigate('/order', {
            state: {
                ingredientslist: checked
            }
        })
     }
    
      return (
        <form className="page" onSubmit={handleSubmit}>
          <h1>Ingredients</h1>
          {isPosts ? (
            <div className="flexbox">
              {posts.map((post, index) => (
                <div className="card_container" key={index}> 
                  <span className="ident">{index}</span>
                <section className="card">
                  <div className="english">
                    <p>[Id]</p>
                    <p>{post.id}</p>
                  </div>
                  <div>&rarr;</div>
                  <div className="danish">
                    <p>[Ingredients]</p>
                    <p>{post.name}</p>
                  </div>
                  <div>
                      <input type="checkbox" value={post.name} onChange={handleCheck} ></input>
                  </div>
                  </section>
              </div>
              ))}
            </div>
          ) : (
            <p>Nothing to show</p>
          )}
          <button>Next</button>
        </form>
      );
    }
