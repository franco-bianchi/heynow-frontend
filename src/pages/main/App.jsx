import { useEffect, useState } from "react";
import control from "../../assets/control.png";
// import Chart_fill from "./assets/Chart_fill.png";
// import Chat from "./assets/Chat.png";
// import User from "./assets/User.png";
// import Calendar from "./assets/Calendar.png";
// import Search from "./assets/Search.png";
// import Analytics from "./assets/Chart.png";
// import Files from "./assets/Folder.png";
import Setting from "../../assets/Setting.png";
import Logo from "../../assets/logo.png";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useMessages } from "../../hooks/useMessages";

const App = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);
  const { startLogout } = useAuthStore();
  const { allMessages, startAddingIntent, reset } = useMessages();

  const handleLogout = () => {
    reset();
    startLogout();
  };
  const Menus = [
    // { title: "Dashboard", src: "Chart_fill", img: Chart_fill },
    // { title: "Inbox", src: "Chat", img: Chat },
    // { title: "Accounts", src: "User", gap: true, img: User },
    // { title: "Schedule ", src: "Calendar", img: Calendar },
    // { title: "Search", src: "Search", img: Search },
    // { title: "Analytics", src: "Chart", img: Analytics },
    // { title: "Files ", src: "Folder", gap: true, img: Files },
    // { title: "Setting", src: "Setting", img: Setting },
    {
      title: "Sign Out",
      src: "Setting",
      gap: false,
      img: Setting,
      onClick: handleLogout,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    startAddingIntent(input);
    setInput("");
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-indigo-700 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="control"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt="logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-12" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
              onClick={Menu.onClick}
            >
              <img src={Menu.img} alt={`img${index}`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 py-0 bg-slate-100">
        <div>
          <div className="min-w-full border rounded ">
            <div className="lg:col-span-2 lg:block">
              <div className="w-full">
                <div
                  className="relative w-full p-6 overflow-y-auto"
                  style={{ height: "90vh" }}
                >
                  <ul className="space-y-2 overflow-y-auto">
                    {allMessages.map((message) => {
                      return (
                        <>
                          <li className="flex justify-end" key={message.intent}>
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                              <span className="block">{message.intent}</span>
                            </div>
                          </li>
                          {message.answer && (
                            <li className="flex justify-start" key={message.answer}>
                              <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                <span className="block">{message.answer}</span>
                              </div>
                            </li>
                          )}
                        </>
                      );
                    })}

                    {/* {messages.map((message) => {
                      return message % 2 === 0 ? (
                        <li className="flex justify-start" key={message}>
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <span className="block">Hi</span>
                          </div>
                        </li>
                      ) : (
                        <li className="flex justify-end" key={message}>
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span className="block">Hiiii</span>
                          </div>
                        </li>
                      );
                    })} */}
                  </ul>
                </div>
                <form
                  className="flex items-center justify-between w-full p-3 border-t border-gray-300"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    placeholder="Message"
                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message"
                    required
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </button>
                  <button type="submit">
                    <svg
                      className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
