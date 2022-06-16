import React from 'react';
import Typewriter from 'typewriter-effect';

interface PropsType {
  setSubTitleTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

function Typewriters({ setSubTitleTimer }: PropsType) {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .changeDelay(90)
          .typeString('CodeStates 39th Community')
          .start()
          .callFunction(function (state) {
            state.elements.cursor.style.display = 'none';
            setSubTitleTimer(true);
          });
      }}
    />
  );
}

export default Typewriters;
