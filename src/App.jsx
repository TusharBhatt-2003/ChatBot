import ChatBox from "./Components/ChatBox";

const App = () => {

  return (
    <div className="flex py-5 flex-col h-screen justify-center items-center bg-black">
      <p className="fixed top-0 text-3xl font-bold text-white">ChatBot</p>
     <ChatBox />
    </div>
  );
};

export default App;
