import React, { useRef, useState } from 'react'
import "../css styles/Itemlist.css"

function Itemlist() {
  let [item, setitem] = useState("");
  let [items, setitems] = useState([]);
  let [toggle, settoggle] = useState({ show: false, id: "" })
  let editRef = useRef(null);

  let changeItem = ({ target: { value } }) => {
    setitem(value);
  }

  let addItems = () => {
    setitems([...items, item]);
    console.log(items);
    setitem("");
  }

  let clearAll = () => {
    setitems([]);
  };

  let editItem = (id) => {
    editRef.current.focus();
    settoggle({ show: true, id });
    setitem(items[id])
  }

  let updateItem = (id) => {
    items[toggle.id] = item;
    setitems([...items]);
    setitem("");
    settoggle({ show: false });
  }

  // let deleteItem = (index) => {
  //   let updatedList = [];
  //   for (let i = 0; i < items.length; i++) {
  //     if (i !== index) {
  //       updatedList.push(items[i]);
  //     }
  //   }
  //   setitems(updatedList);
  // };

  // let deleteItem = (index) => {
  //   let newItems = new Array(items.length - 1);
  //   let j = 0;
  //   for (let i = 0; i < items.length; i++) {
  //     if (i !== index) {
  //       newItems[j] = items[i];
  //       j++;
  //     }
  //   }
  //   setitems(newItems);
  // };

  let deleteItem = (id) => {
    let filtereditems = items.filter((_, index) => id !== index)
    setitems(filtereditems);
  }

  // return (
  //   <div className="container">
  //     <h1>ToDo - List</h1>
  //     <input
  //       type="text"
  //       placeholder='Enter Items'
  //       value={item}
  //       onChange={changeItem}
  //     />
  //     <br />
  //     <button className="addbtn" onClick={addItems}>Add</button>
  //     <hr />
  //     <ol>
  //       {items.map((i, index) => (
  //         <div key={index}>
  //           <li>{i}</li>
  //           <button className='dltbtn' onClick={() => deleteItem(index)}>Delete</button>
  //         </div>
  //       ))}
  //     </ol>
  //   </div>
  // );

  return (
    <div className="container">
      <h1>ToDo - List</h1>
      <input
        type="text"
        placeholder="Enter Items"
        ref={editRef}
        value={item}
        onChange={changeItem}
      />
      <br />
      <button 
      className="addbtn" 
      onClick={addItems}
      disabled={item.trim() === "" || toggle.show}>
        Add
      </button>
      {toggle.show && <button className="updtbtn" onClick={updateItem} disabled={item.trim() === ""}>Update</button>}
      <hr />
      {items.length === 0 ? (
        <p>No items are there in the list</p>
      ) : (
        <ol>
          {items.map((i, index) => (
            <li key={index} className="item-container">
              {i}
              <div className='btndiv'>
                <button className="dltbtn" onClick={() => deleteItem(index)}>Delete</button>
                <button className="edtbtn" onClick={() => { editItem(index) }}>Edit</button>
              </div>
            </li>
            // <div key={index} className="item-container">
            //   <li>{i}</li>
            //   <button className='dltbtn' onClick={() => deleteItem(index)}>Delete</button>
            // </div>
          ))}
        </ol>
      )}
      {items.length > 0 && (
        <button className="clearbtn" onClick={clearAll}>Clear All</button>
      )}
    </div>
  );

}

export default Itemlist