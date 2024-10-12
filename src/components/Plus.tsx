import { useEffect } from "react";

type Props = {
  socketRef: React.MutableRefObject<WebSocket | undefined>;
};

const Plus = ({ socketRef }: Props) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Spase") {
        socketRef.current?.send("plus");
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
      onClick={() => socketRef.current?.send("plus")}
    >
      <p style={{ color: "white", fontSize: "16rem" }}>プラス</p>
    </button>
  );
};

export default Plus;
