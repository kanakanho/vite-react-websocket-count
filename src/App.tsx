import { useState, useRef, useEffect } from "react";

function App() {
  const [isPlus, setIsPlus] = useState<boolean | undefined>(undefined);

  const [onlyView, setOnlyView] = useState(false);

  const [isOpened, setIsOpened] = useState(false);
  const [counter, setCounter] = useState(0);

  const socketRef = useRef<WebSocket>();

  const VITE_WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
  const socketServerUrl = `${VITE_WEBSOCKET_URL}/api/ws`;

  useEffect(() => {
    const ws = new WebSocket(socketServerUrl);
    socketRef.current = ws;

    // 接続したかどうかを確認
    ws.onopen = () => {
      setIsOpened(true);
    };

    const onMessage = (event: MessageEvent) => {
      // data が文字列であるか確認
      if (typeof event.data === "string") {
        // data を文字列の配列に変換して state にセット
        setCounter(Number.parseInt(event.data));
      } else {
        console.error("Invalid data type");
      }
    };
    ws.addEventListener("message", onMessage);

    const onClose = () => {
      const ws = new WebSocket(socketServerUrl);
      socketRef.current = ws;
      console.log("Reconnecting to server...");
    };
    ws.addEventListener("close", onClose);

    return () => {
      ws.close();
    };
  }, [socketServerUrl]);

  if (onlyView) {
    return (
      <>
        <h1
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "10rem",
          }}
        >
          現在の待ち組数
        </h1>
        <div
          style={{
            width: "100vw",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          <p
            style={{
              fontSize: "25rem",
              fontWeight: "bold",
            }}
          >
            {counter}
          </p>
        </div>
      </>
    );
  }

  if (isPlus === undefined && !onlyView) {
    return (
      <div>
        <button
          style={{ display: "block", width: "100vw", height: "33vh", backgroundColor: "green" }}
          type="button"
          onClick={() => setOnlyView(true)}
        >
          <p style={{ color: "white", fontSize: "5rem" }}>閲覧用モード</p>
        </button>
        <button
          style={{ display: "block", width: "100vw", height: "33vh", backgroundColor: "red" }}
          type="button"
          onClick={() => setIsPlus(true)}
        >
          <p style={{ color: "white", fontSize: "5rem" }}>プラスモード</p>
        </button>
        <button
          style={{ display: "block", width: "100vw", height: "33vh", backgroundColor: "blue" }}
          type="button"
          onClick={() => setIsPlus(false)}
        >
          <p style={{ color: "white", fontSize: "5rem" }}>マイナスモード</p>
        </button>
      </div>
    );
  }
  return (
    <>
      {isOpened ? <h1>Connected!</h1> : <h1>Connecting to server...</h1>}
      <h2 style={{ fontSize: "25rem", textAlign: "center", color: "black" }}>{counter}</h2>
      {isPlus ? (
        <button
          style={{ width: "100vw", height: "50vh", backgroundColor: "orange" }}
          type="button"
          onClick={() => socketRef.current?.send("plus")}
        >
          <p style={{ color: "white", fontSize: "16rem" }}>プラス</p>
        </button>
      ) : (
        <button
          style={{ width: "100vw", height: "50vh", backgroundColor: "Aquamarine" }}
          type="button"
          onClick={() => socketRef.current?.send("minus")}
        >
          <p style={{ color: "black", fontSize: "16rem" }}>マイナス</p>
        </button>
      )}
    </>
  );
}

export default App;
