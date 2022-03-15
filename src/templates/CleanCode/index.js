import React, { useState, useEffect } from 'react';

const INITIAL_SECONDS = 25 * 60; // 25 minutes

export default function CleanCode() {
  const [secondsAmount, setSecondsAmount] = useState(INITIAL_SECONDS);
  const [init, setInit] = useState(false);

  const minutes = Math.floor(secondsAmount / 60);

  // O resto é o que falta para completar 60
  const seconds = secondsAmount % 60;

  useEffect(() => {
    if (secondsAmount === 0) {
      alert('Fim do tempo');
      return;
    } else if (init) {
      setTimeout(() => {
        setSecondsAmount((prev) => prev - 1);
      }, 1000);
    }
  }, [secondsAmount, init]);

  // String().padStart(numero de casas que espero, 'numero a esquerda caso o numero de casa seja menor que o esperado')

  function initPause() {
    setInit((prev) => !prev);
  }

  return (
    <>
      <div>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <button onClick={() => initPause()}>{init ? 'Pausar' : 'Começar'}</button>
    </>
  );
}
