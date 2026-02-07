import Peer from "peerjs"

export const peer = new Peer()

// peer.on("open", id => console.log(id))
peer.on("connection", (conn) => {
    conn.on("data", (data) => {
        console.log(data)
        conn.send("pong")
    })
})

