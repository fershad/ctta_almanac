const getMatchStats = (id, matches) => {
    let touchdowns = 0
    let assists = 0
    let periodOfTimes = 0
    let sendOffs = 0
    let stats
  
    matches.forEach(match => {
        match.players.forEach(player => {
           if (player.playerName._ref == id) {
               if (player.touchdowns) {
                touchdowns = touchdowns + parseInt(player.touchdowns)
               }
  
               if (player.assists) {
                assists = assists + parseInt(player.assists)
               }
  
               if (player.periodofTime) {
                   periodOfTimes = periodOfTimes + 1
               }
  
               if (player.sendOff) {
                   sendOffs = sendOffs + 1
               }
           }
        });
    });

    stats = {
        "touchdowns": touchdowns,
        "assists": assists,
        "pot": periodOfTimes,
        "sendoff": sendOffs
    }

    return stats
  }

  module.exports = getMatchStats