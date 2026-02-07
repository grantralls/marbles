import { useEffect, useRef } from "preact/hooks"
import { Game } from "../../game"

export function GamePage() {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!ref.current)
            return

        const game = new Game(ref.current)
        game.example()
    }, [])

    return (
        <>
            <canvas ref={ref}></canvas>
        </>
    )
}
