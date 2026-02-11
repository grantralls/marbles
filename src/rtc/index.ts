import Peer from "peerjs"

export const peer = new Peer()

peer.on("connection", (conn) => {
    conn.on("data", () => {
        conn.send("pong")
    })
})
