import { useState } from 'react'
import './App.css'

function App() {

  const [records, setRecords] = useState(JSON.parse(localStorage.getItem("cruddata")) || []);

  const [isEdit, setIsEdit] = useState(-1);

  const [searchdata, setSearchData] = useState("");

  const [selectfield, setSelectField] = useState("");

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);



  const [all, setAll] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    setAll({ ...all, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (isEdit !== -1) {
      const update = records.map((item, index) => {
        if (isEdit === index) {
          return all;
        }
        else return item;
      })
      setRecords(update);
      localStorage.setItem("cruddata", JSON.stringify(update));
      setIsEdit(-1);
    }
    else {
      setRecords([...records, all]);
      localStorage.setItem("cruddata", JSON.stringify([...records, all]));
      setAll({ fname: "", sname: "", email: "", password: "", address: "" });
    }
  };

  const delete1 = (indexx) => {
    const deleted = records.filter((item, index) => { return (index !== indexx); });
    setRecords(deleted);
    localStorage.setItem("cruddata", JSON.stringify(deleted));
  }

  const edite1 = (indexs) => {
    const editdata = records.find((item, index) => {
      return index === indexs;
    })
    setAll(editdata);
    setIsEdit(indexs);
    localStorage.setItem("cruddata", JSON.stringify(editdata));
  }



  const trearch = () => {
    const searching = records.filter((item, index) => {
      return item.fname.toLowerCase().includes(searchdata.toLowerCase());
    })
    setRecords(searching);
  }

  const search = (field) => {
    let searched = [];

    switch (field) {
      case "fname":
        searched = records.filter((item) =>
          item.fname.toLowerCase().includes(searchdata.toLowerCase())
        );
        break;
      case "sname":
        searched = records.filter((item) =>
          item.sname.toLowerCase().includes(searchdata.toLowerCase())
        );
        break;
      case "email":
        searched = records.filter((item) =>
          item.email.toLowerCase().includes(searchdata.toLowerCase())
        );
        break;
      case "password":
        searched = records.filter((item) =>
          item.password.toLowerCase().includes(searchdata.toLowerCase())
        );
        break;
      case "address":
        searched = records.filter((item) =>
          item.address.toLowerCase().includes(searchdata.toLowerCase())
        );
        break;
      default:
        searched = records;
    }

    setRecords(searched);
  };


  const select = (selectfield) => {
    // const selected = e.target.value;
    // setSortField(selected);

    let sorted = [...records];

    switch (selectfield) {
      case "fname":
        sorted.sort((a, b) => a.fname.localeCompare(b.fname));
        break;
      case "sname":
        sorted.sort((a, b) => a.sname.localeCompare(b.sname));
        break;
      case "email":
        sorted.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "password":
        sorted.sort((a, b) => a.password.localeCompare(b.password));
        break;
      case "address":
        sorted.sort((a, b) => a.address.localeCompare(b.address));
        break;
      default:
        return;
    }

    setRecords(sorted);
    localStorage.setItem("cruddata", JSON.stringify(sorted));
  };

  const handleCheckboxChange = (index) => {
    if (selectedCheckboxes.includes(index)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((i) => i !== index));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, index]);
    }
  };

  const handleMainCheckboxChange = () => {
    if (selectedCheckboxes.length === records.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(records.map((_, index) => index));
    }
  };



  const deleteSelected = () => {
    const updated = records.filter((_, index) => !selectedCheckboxes.includes(index));
    setRecords(updated);
    setSelectedCheckboxes([]);
    localStorage.setItem("cruddata", JSON.stringify(updated));
  };





  return (
    <>
      <div className='main-div'>
        <div className='container-md bg-light'>
          <div className='names'>
            <div>
              <label htmlFor='fname'>FIRST NAME:</label><br></br>
              <input type='text' id='fname' name='fname' placeholder='FIRST NAME...' value={all.fname} onChange={change} />
            </div>
            <div>
              <label htmlFor='sname'>SECOND NAME:</label><br></br>
              <input type='text' id='sname' name='sname' placeholder='SECOND NAME...' value={all.sname} onChange={change} />
            </div>
          </div>
          <div className='mail-pass'>
            <div>
              <label htmlFor="email">EMAIL:</label><br></br>
              <input type='email' id='email' name='email' placeholder='EMAIL...' value={all.email} onChange={change} />
            </div>
            <div>
              <label htmlFor='password'>PASSWORD:</label><br></br>
              <input type='password' id='password' name='password' placeholder='PASSWORD...' value={all.password} onChange={change} />
            </div>
          </div>
          <div className='address'>
            <div>
              <p>ADDRESS:</p><br></br>
              <textarea className='textarea' placeholder='ADDRESS...' name='address' value={all.address} onChange={change}></textarea>
            </div>
          </div>
          <div className='submit-btn'>
            <button className='btn btn-success text-light' type='submit' onClick={submit} >SUBMIT</button>
          </div>
          <br></br>
        </div>
      </div>

      <input type='text' id='searchinput' name='searchinput' placeholder='SEARCH HERE...' value={searchdata} onChange={(e) => setSearchData(e.target.value)} />
      <button className='btn btn-success text-light' type='button' onClick={() => search(selectfield)}>SEARCH</button><br></br>

      <button
        className='btn btn-success text-light'
        type='button'
        onClick={() => select(selectfield)}
      >
        SORT
      </button><br></br><br></br>
      <select
        value={selectfield}
        onChange={(e) => {
          setSelectField(e.target.value);
          select(e.target.value);
        }}
        className='btn btn-success text-light'
      >
        <option value="fname">FIRST NAME</option>
        <option value="sname">SECOND NAME</option>
        <option value="email">EMAIL</option>
        <option value="password">PASSWORD</option>
        <option value="address">ADDRESS</option>
      </select>

      <button
        className='btn btn-danger text-light'
        type='button'
        onClick={deleteSelected}
        disabled={selectedCheckboxes.length === 0}
      >
        DELETE SELECTED
      </button>
      <br></br><br></br>
      <div className='table'>
        <table className='table-md table-bordered bg-warning' >
          <thead>
            <tr>
              <td>
                <input
                  type='checkbox'
                  checked={records.length > 0 && selectedCheckboxes.length === records.length}
                  onChange={handleMainCheckboxChange}
                />
              </td>

              <th>FIRST NAME:</th>
              <th>SECOND NAME:</th>
              <th>EMAIL:</th>
              <th>PASSWORD:</th>
              <th>ADDRESS:</th>
              <th>DELETE:</th>
              <td>EDIT</td>
            </tr>
          </thead>
          <tbody>
            {
              records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type='checkbox'
                        checked={selectedCheckboxes.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>

                    <td>{item.fname}</td>
                    <td>{item.sname}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.address}</td>
                    <td><button className='btn bg-success text-light' type='button' onClick={() => delete1(index)}>DELETE</button></td>
                    <td><button className='btn bg-success text-light' type='button' onClick={() => edite1(index)}>EDIT</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
};

export default App
