const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
require('dotenv').config();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "*"
    }
})
let rooms = {}
io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.on('join',(roomId)=>{
        socket.join(roomId);
        if(!rooms[roomId]){
            rooms[roomId]={
                board: Array(9).fill(null),
                turn:'X',
                players:[],
            }
        }
        if(!rooms[roomId].players.includes(socket.id)){
            rooms[roomId].players.push(socket.id);
        }
        const symbol = rooms[roomId].players[0]===socket.id?'X':'O';
        socket.emit('init',{symbol});
        io.to(roomId).emit('state',{
            ...rooms[roomId],
            playerCount:rooms[roomId].players.length
        });
    });
    socket.on('reset', (roomId) => {
        const player = rooms[roomId]?.players || [];
      
        rooms[roomId] = {
          board: Array(9).fill(null),
          turn: 'X',
          players: player,
        };
      
        io.to(roomId).emit('state', {
          ...rooms[roomId],
          playerCount: rooms[roomId].players.length,
        });
      });
      
    // socket.on('move',({roomId,index})=>{
    //     const game = rooms[roomId];
    //     if(!game || game.board[index]) return;
    //     game.board[index] = game.turn;
    //     game.turn = game.turn ==='X'?'O':'X';
    //     io.to(roomId).emit('state',{
    //         ...game,
    //         playerCount:game.players.length
    //     })
    // })
    socket.on('move', ({ roomId, index }) => {
        const game = rooms[roomId];
      
        if (!game || game.board[index]) return;
      
        game.board[index] = game.turn;
        game.turn = game.turn === 'X' ? 'O' : 'X';
      
        
        io.to(roomId).emit('state', {
          ...game,
          playerCount: game.players.length
        });
      });
      
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    
        for (const roomId in rooms) {
          const room = rooms[roomId];
          room.players = room.players.filter(id => id !== socket.id);
          if (room.players.length === 0) {
            delete rooms[roomId];
            console.log(`🧹 Room ${roomId} cleaned up`);
          }
        }
      });
});


app.get('/',(req,res)=>{
    res.status(200).json({
        hello:"hello"
    });
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server running on http://localhost:3000');
  });
  