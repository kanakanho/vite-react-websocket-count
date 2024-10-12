import { useEffect } from "react";

type Props = {
  socketRef: React.MutableRefObject<WebSocket | undefined>;
};

const Minus = ({ socketRef }: Props) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Spase") {
        socketRef.current?.send("minus");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [socketRef]);

  return (
    <button
      style={{ width: "100vw", height: "50vh", backgroundColor: "orange" }}
      type="button"
      onClick={() => socketRef.current?.send("minus")}
    >
      <p style={{ color: "white", fontSize: "16rem" }}>マイナス</p>
    </button>
  );
};

export default Minus;
