  var ronda = 1;
  var tiro = 3;
  var duplica = 0;
  var puntajeronda = 0;
  var banronda = false;
  var puntaje1 = 0;
  var puntaje2 = 0;
  var puntajetemp = 0;

  function empezarjuego(){
    //habilita a jugador1 llamando a la función, desabilita al boton Empezar juego
    habilitarjugador1();
    document.getElementById("boton4").disabled = true;
  }

  function iniciarcontadores(){
    tiro = 3;
    duplica = 0;
    puntajeronda = 0;
    puntajetemp = 0;
  }

  function habilitarjugador1(){
    //habilita el jugador1, desabilita al jugador2 y pone en 1 el valor de la ronda del jugador1
    document.getElementById("boton1").disabled = false;
    document.getElementById("boton2").disabled = true;
    document.getElementById("numeros2").value = ronda;
    //llama a la función iniciar contadores para que todos los valores vuelvan a 0 por ronda
    iniciarcontadores();
    //puntaje de la ronda queda guardado, para que no cambie al final del turno del jugador
    puntajetemp = puntaje1;
  }

  function habilitarjugador2(){
    //hace exactamente lo mismo que la función habilitarjugador1, pero con el jugador contrario
    document.getElementById("boton1").disabled = true;
    document.getElementById("boton2").disabled = false;
    document.getElementById("numeros5").value = ronda;
    iniciarcontadores();
    puntajetemp = puntaje2;
  }

  function rondas(jugador){
    //esta función se ejecuta cada vez que el los jugadores oprimen el boton de tirar sus dados
    //este if hace que
    if ((banronda == 1) && (jugador == 1)) {
      ronda++;
      banronda = false;
      //cuando la ronda es 5, el juego se termina, pero si es un empate, hace una ronda extra
      if (ronda == 5) {
        if (document.getElementById("numeros3").value == document.getElementById("numeros6").value){
          ronda--;
          document.getElementById("boton1").disabled = true;
          document.getElementById("boton2").disabled = true;
          document.getElementById("boton3").disabled = false;
          alert("¡Es un empate! Por favor oprima el botón para desempatar");
          return(false);
        }else {
          document.getElementById("boton1").disabled = true;
          document.getElementById("boton2").disabled = true;
          document.getElementById("boton3").disabled = true;
          document.getElementById("boton5").disabled = false;
          alert("Se terminó el juego, oprima el botón para conocer al ganador");
          return(false);
        }
      }
      document.getElementById("numeros2").value = Number(ronda);
      document.getElementById("numeros5").value = Number(ronda);
    }
    //llama a la función tiros para saber el puntaje de cada jugador
    tiros(jugador);
    //si es el jugador1 escribe los valores del jugador 1, y suma el puntaje de las rondas
    if (jugador == 1) {
      document.getElementById("numeros1").value = Number(tiro);
      puntaje1 = puntajeronda + puntajetemp;
      document.getElementById("numeros3").value = Number(puntaje1);
      //hace lo mismo pero con el jugador2
    }else {
      document.getElementById("numeros4").value = Number(tiro);
      puntaje2 = puntajeronda + puntajetemp;
      document.getElementById("numeros6").value = Number(puntaje2);
    }
    //si los tiros del jugador se acabaron...
    if (tiro == 0) {
      //si es el jugador1...
      if (jugador == 1) {
        document.getElementById("numeros2").value = Number(ronda);
        //y si obtuvo un tiro premiado lo multiplica
        if (duplica == 1) {
          alert("¡Como sacó un tiro premiado, su puntaje de la ronda " + puntajeronda + " se duplica y se suma a su puntaje de la ronda anterior: " + puntajetemp +"!");
          puntaje1 = puntajeronda * 2 + puntajetemp;
          document.getElementById("numeros3").value = Number(puntaje1);
          //sino, el puntaje de la ronda no cuenta, y como puntaje temporal está en 0, directamente escribe eso. Hace esto cuando duplica es más de 2
        }else {
          if (duplica != 0) {
            alert("¡Oops, como sacó más de un tiro premiado, su puntaje de la ronda es 0!");
            puntaje1 = puntajetemp;
            document.getElementById("numeros3").value = Number(puntaje1);
          }
        }
        //habilita a que juegue eljugador 2 cuando llega a 0 tiros
        habilitarjugador2();
      }else {
        //hace lo mismo con el jugador 2
        banronda = true;
        document.getElementById("numeros5").value = Number(ronda);
        if (duplica == 1) {
          alert("¡Como sacó un tiro premiado, su puntaje de la ronda " + puntajeronda + " se duplica y se suma a su puntaje de la ronda anterior: " + puntajetemp +"!");
          puntaje2 = puntajeronda * 2 + puntajetemp;
          document.getElementById("numeros6").value = Number(puntaje2);
        }else {
          if (duplica != 0) {
            alert("¡Oops, como sacó más de un tiro premiado, su puntaje de la ronda es 0!");
            puntaje2 = puntajetemp;
            document.getElementById("numeros6").value = Number(puntaje2);
          }
        }
        habilitarjugador1();
      }
    }
  }

  function tiros(jugador){
    //guarda la cantidad de tiros en un array
    var numero = new Array(3);
    for (var i = 0; i < numero.length; i++) {
      //le asigna a cada número un dado dependiendo del jugador
      numero[i] = dados(i + 1, jugador);
    }
    //si los tres son iguales le da un tiro de premio y duplica de aumenta
    if ((numero[0] == numero[1]) && (numero[0] == numero[2]) && ((numero[0] % 2) == 0)) {
      duplica++;
      alert("¡Felicidades! Como los tres dados son iguales y pares tiene otro tiro de premio");
    }else {
      //sino, va sumando los dados que tienen un valor impar
      for (var i = 0; i < numero.length; i++) {
        if ((numero[i] % 2) !=0) {
          puntajeronda += numero[i];
        }
      }
      //al final el tiro se va descontando
      tiro--;
    }
  }

  function dados(dado, jugador){
    //esta función le asigna la imagen de un dado dependiendo del jugador y devuelve el valor del dado
      valordado = Math.floor((Math.random() * 6) + 1);
      document.getElementById('img' + jugador + dado).src = "img/dado" + valordado + ".png";
      return(valordado);
  }

  function desempate(){
    //Habilita el botón de desempate y al jugador 1 para que realice los tiros
    document.getElementById("boton3").disabled = true;
    habilitarjugador1();
  }

  function ganador(){
    //muestra el ganador
    if (document.getElementById("numeros3").value > document.getElementById("numeros6").value){
      document.getElementById("numeros7").value = "Jugador 1";
    }else {
      document.getElementById("numeros7").value = "Jugador 2";
    }
  }
