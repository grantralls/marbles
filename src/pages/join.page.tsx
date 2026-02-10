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
            <h1 className="text-center">Marbles</h1>
            <div className="flex justify-center">
                <input className="input" value={connectionString} onInput={e => setConnectionString(e.currentTarget.value)} />
                <button
                    className="btn"
                    onClick={() => {
                    }}
                >
                    Connect
                </button>
            </div>
            <p className="text-center">
                Room:
                {id}
            </p>
        </>
    )
}
