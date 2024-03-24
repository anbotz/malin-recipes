"use client";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const { push } = useRouter();
  return (
    <button className="btn btn-primary btn-lg" onClick={() => push("/")}>
      Accueil
    </button>
  );
};

export default HomeButton;
