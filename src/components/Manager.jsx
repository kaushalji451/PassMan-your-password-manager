import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:8080/");
    let passwords = await req.json();
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showPassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("icons/closeeye.png")) {
      ref.current.src = "icons/openeye.png";
      passwordref.current.type = "password";
    } else {
      passwordref.current.type = "text";
      ref.current.src = "icons/closeeye.png";
    }
  };

  const savepassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

      // await fetch("http://localhost:8080/", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: form.id }),
      // });

      await fetch("http://localhost:8080/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      setform({ site: "", username: "", password: "" });
      toast("password saved !");
    } else {
      toast("password length must greate then 3");
    }
  };

  const deletepassword = async (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:8080/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Password Deleted!");
    }
  };

  const editpassword = (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0] });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copytext = (text) => {
    toast("copyed to clipboard");
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className=" md:px-20 s sm:px-20 lg:px-40  ">
        {/* input data */}
        <div className="bg-green-100 py-8 px-4 text-center">
          <p className="font-bold  text-3xl py-2">
            <span className="text-green-500">&lt;</span>Pass
            <span className="text-green-500">Man</span>
            <span className="text-green-500">/&gt;</span>
          </p>
          <p className="mb-4">Your Own Password Manager</p>

          {/* input */}
          <input
           value={form.site}
           onChange={handleChange}
           name="site"
            type="text"
            placeholder="site"
            className="border border-green-900 w-full rounded-full p-1 px-4"
          />

          <div className="md:flex gap-6 items-center"> 
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              className="border border-green-900 w-full rounded-full p-2 px-4 mt-6"
            />

            <div className="relative w-full lg:w-1/3">
              <input
               ref={passwordref}
               value={form.password}
               onChange={handleChange}
               name="password"
                type="password"
                placeholder="Password"
                className="border border-green-900 w-full rounded-full p-2 px-4 mt-6 pr-12" 
              />

              <span className="absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer">
                <img
                  ref={ref}
                  className="w-6" 
                  src="icons/closeeye.png"
                  alt="Toggle Password"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-center  py-8">
            <button
              onClick={savepassword}
              className="flex bg-green-500  rounded-full px-3 py-1 hover:bg-green-400"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save Password
            </button>
          </div>
        </div>

        {/* tabel */}
        <h1 className="py-4 font-bold">Your Password</h1>

        {passwordArray.length === 0 && <div>No password found</div>}
        {passwordArray.length != 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden text-center mb-10">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Paaword</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return (
                  <tr className="bg-green-100" key={index}>
                    <td className="py-2 ">
                      <div
                        className=" lordiconcopy flex justify-center cursor-pointer"
                        onClick={() => {
                          copytext(item.site);
                        }}
                      >
                        <a href={item.site}>
                          {item.site}
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "20px",
                              paddingTop: "5px",
                            }}
                          ></lord-icon>
                        </a>
                      </div>
                    </td>
                    <td className="py-2">
                      <div
                        className=" lordiconcopy flex justify-center cursor-pointer"
                        onClick={() => {
                          copytext(item.username);
                        }}
                      >
                        {item.username}
                        <lord-icon
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "20px",
                            paddingTop: "5px",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="py-2">
                      <div
                        className=" lordiconcopy flex justify-center cursor-pointer "
                        onClick={() => {
                          copytext(item.password);
                        }}
                      >
                        {"*".repeat(item.password.length)}
                        <lord-icon
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "20px",
                            paddingTop: "5px",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="">
                        <lord-icon
                          src="https://cdn.lordicon.com/fikcyfpp.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            marginLeft: "10px",
                          }}
                          onClick={() => editpassword(item.id)}
                        ></lord-icon>

                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            marginLeft: "10px",
                          }}
                          onClick={() => deletepassword(item.id)}
                        ></lord-icon>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
