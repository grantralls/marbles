import { useRef } from "preact/hooks"

export function GamePage() {
    const ref = useRef<HTMLCanvasElement>(null)

    return (
        <>
            <canvas ref={ref}></canvas>
        </>
    )
}
