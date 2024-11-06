import ChatBox from "./components/ChatBox";

const App = () => {

  return (
    <div className="flex py-5 flex-col h-screen justify-center items-center bg-black">
      <p className="text-3xl font-bold text-white mb-4">ChatBot</p>
     <ChatBox />
    </div>
  );
};

export default App;
