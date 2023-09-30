import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

const delay = ms => new Promise(res => setTimeout(res,ms))
export default function App() {
  const [notification, setNotification] = react.useState("Player X to start!")
  const [refresh, setRefresh] = react.useState(false)
  const [board, setBoard] = react.useState(
    [
      " ", " "," ",
      " ", " "," ",
      " ", " "," "
    ]
  )
  const[currentPlayer, setCurrentPlayer] = react.useState("X")

  const[winx, setWinx] = react.useState(0)
  const[wino, setWino] = react.useState(0)
  const[total, setTotal] = react.useState(0)
  const pressField = (index) =>{
    let newBoard = board
    if (newBoard[index] != "X" && newBoard[index] != "O"){
      if (currentPlayer == "X") {
        newBoard[index]="X"
        setCurrentPlayer("O")
        setNotification("Player O to move!")
      }
      else {
        newBoard[index]="O"
        setCurrentPlayer("X")
        setNotification("Player X to move!")
      }
    }
      
      setBoard(newBoard)
      setRefresh(!refresh) //set refresh to not refresh(e.g. above sets it as false so ==true)
      checkIfplayerWon()
    }

    const checkIfplayerWon = () =>{
      if (board[0] == board[1] && board[1] == board[2] && board[0] != " "){
        playerWon(board[0]) // this board[0] is the field that won
      }
      else if (board[3] == board[4] && board[4] == board[5] && board[3] != " "){
        playerWon(board[3])
      }
      else if (board[6] == board[7] && board[7] == board[8] && board[6] != " "){
        playerWon(board[6])
      }
      else if (board[0] == board[3] && board[3] == board[6] && board[0] != " "){
        playerWon(board[0])
      }
      else if (board[1] == board[4] && board[4] == board[7] && board[1] != " "){
        playerWon(board[1])
      }
      else if (board[2] == board[5] && board[5] == board[8] && board[2] != " "){
        playerWon(board[2])
      }
      else if (board[0] == board[4] && board[4] == board[8] && board[0] != " "){
        playerWon(board[0])
      }
      else if (board[2] == board[4] && board[4] == board[6] && board[2] != " "){
        playerWon(board[2])
      }
      else {
        if(board[0] != " " && board[1] != " " && board[2] != " " && board[3] != " " && board[4] != " " && board[5] != " " && board[6] != " " && board[7] != " " && board[8] != " ") {
          draw()
        }
      }

    }
    const draw = async () =>{
      setNotification("It was a draw!")
      setTotal(total+1)
      await delay(2000)
      setBoard(
        [
          " ", " "," ",
          " ", " "," ",
          " ", " "," "
        ]
      )
      if (currentPlayer == "O"){
        setNotification("Player X to move")
      }
      else{
        setNotification("Player O to move")
      }
    }
    const playerWon = async (symbol) =>{
      setNotification("Player "+symbol+" won!")
      
      await delay(2000)
      setBoard(
        [
          " ", " "," ",
          " ", " "," ",
          " ", " "," "
        ]
      )
      if (symbol == "O"){
        setWino(wino+1)
        setTotal(total+1)
        setNotification("Player X to move")
      }
      else{
        setWinx(winx+1)
        setTotal(total+1)
        setNotification("Player O to move")
      }
    }
    
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/bg1.png')}
        style ={styles.backgroundImage}
        >
        </Image>
      <StatusBar style="auto" />
      <Text style = {styles.txt1}> TicTacToe </Text>
      <Text style ={styles.txt2} >{notification}</Text>
      <Text style ={styles.txt4}>Player X won {winx} times </Text>
      <Text style ={styles.txt5}>Player O won {wino} times </Text>
      <Text style ={styles.txt6}> Total number of games played: {total}</Text>
      <View style = {styles.flatListContainer}>
        <Image 
        source={require('./assets/bg.png')}
        style ={styles.image}
        >
        </Image>
      
        <FlatList
          style = {styles.list}
          data = {board}
          numColumns = {3}
          refreshing = {true}
          extraData = {refresh}
          renderItem={({item,index}) =>
          <TouchableOpacity style = {styles.square} onPress={()=>pressField(index)}>
            <Text style ={styles.txt3}>{item}</Text>
          </TouchableOpacity>
        }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom:20,
    height:300,
    width:'100%',
  },
  txt1: {
    fontSize:75,
    position:'absolute',
    top:60,
    color:'black',
    fontFamily:'Times New Roman',
    borderWidth:5,
    borderRadius:20,
    backgroundColor:'white',
    overflow:'hidden'
  },
  txt2: {
    fontSize:30,
    position:'absolute',
    top: 200,
    fontFamily:'Trebuchet MS',
  },
  button1: {
    padding:10,
    backgroundColor:'blue',
    borderRadius: 10,
    margin: 10,
  },
  button2: {
    padding:10,
    backgroundColor:'red',
    borderRadius: 10,
    margin: 10,
  },
  list: {
    width:300,
    height:300, 
  },
  square: {
    height:100,
    width:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt3: {
    fontSize:60,
  },
  image: {
    width:300, 
    height:300,
    position:'absolute'
  },
  backgroundImage: {
    position:'absolute',
    zIndex: -1,
    width:'100%',
    height:'100%'
  },
  txt4: {
    fontSize:30,
    position:'absolute',
    bottom: 200,
    fontFamily:'Courier New',
    fontWeight:'bold'
  },
  txt5: {
    fontSize:30,
    position:'absolute',
    bottom: 240,
    fontFamily:'Courier New',
    fontWeight:'bold',
  },
  txt6: {
    fontSize:22,
    position:'absolute',
    top: 170,
  }

});
