import { useEffect, useState } from "preact/hooks"
import { peer } from "../rtc"

export function JoinPage() {
    const [connectionString, setConnectionString] = useState<string>("")
    const [id, setId] = useState<string>()

    useEffect(() => {
        peer.on("open", peerId => setId(peerId))
    }, [])

    return (
        <>
            <h1>Marbles</h1>
            <input value={connectionString} onInput={e => setConnectionString(e.currentTarget.value)} />
            <button onClick={() => {
            }}
            >
                Connect
            </button>
            <p>
                Room:
                {id}
            </p>
        </>
    )
}
