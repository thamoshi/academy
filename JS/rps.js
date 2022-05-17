function rpsGameWinner(game) {  

  if (game.length != 2) {    
    throw 'WrongNumberOfPlayers';  
  };

  const p1play = game[0][1].toLowerCase()
  const p2play = game[1][1].toLowerCase()

  const plays = ['pe','pa','te']

  if (!plays.includes(p1play) && !plays.includes(p2play)) {
    throw 'NoSuchStrategyError';
  }

  switch(p1play+p2play) {
    case ('pepa'):
    case ('pate'):
    case ('tepe'):
      return game[1]

    default:
      return game[0]
  }
  
}

function rpsTournamentWinner(tournament) {

  if (typeof tournament[0][0] !== 'object') {
    return rpsGameWinner(tournament)
  }

  let game1Winner = rpsTournamentWinner(tournament[0])
  let game2Winner = rpsTournamentWinner(tournament[1])

  return rpsGameWinner([game1Winner,game2Winner])
}

(()=>{
  // let game = [['Thomas','te'],['Bruno','PA']];
  // console.log(typeof game[0] == 'object')
  // console.log(rpsGameWinner(game))
  let tournament = [
    [    
      [      
        ['Armando', 'PE'], ['Dave', 'TE']    
      ],    
      [      
        ['Richard', 'PA'], ['Michael', 'TE']    
      ],  
    ],  
    [    
      [    
        ['Allen', 'TE'], ['Arthur', 'TE']   
      ],   
      [    
        ['David', 'PA'], ['Omer', 'PE']  
      ], 
    ],
  ];
  console.log(rpsTournamentWinner(tournament))
})();