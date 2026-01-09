export const playSound = (type: "income" | "expense") => {
  const audio = new Audio(
    type === "income"
      ? "/sounds/money-in.wav"
      : "/sounds/money-out.wav"
  );

  audio.volume = 0.6;
  audio.play();
};

export const trashSound = () =>{
 const audio = new Audio("sounds/trash.wav")
 audio.volume = 0.6;
 audio.play();    
}